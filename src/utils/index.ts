import { toast } from '@/components/ui/use-toast'
import { TTextTarget, TVocab } from '@/pages/vocab/types'
import { SortingState } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import * as XLSX from 'xlsx'

export const removeOpenAttribute = (
  ref: React.MutableRefObject<HTMLDetailsElement>
) => {
  if (!ref.current) return
  ref.current.removeAttribute('open')
}

export const showModal = (id: string) => {
  return (document.getElementById(id) as HTMLDialogElement).showModal()
}

export const convertOrderBy = (sorting: SortingState) => {
  if (sorting[0]?.id) {
    return sorting[0]?.desc ? 'desc' : 'asc'
  } else {
    return undefined
  }
}

const customMinutes = (time: number) => {
  return time < 10 ? '0' + time : time
}

export const convertTime = (duration: number) => {
  return {
    hours: customMinutes(Math.floor(duration / 3600)),
    minutes: customMinutes(Math.floor(duration / 60)),
    seconds: duration % 60
  }
}

export const helperError = (error: AxiosError) => {
  return (error.response?.data as { error: string })?.error
}

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast({
      title: 'Error',
      description: error.response?.data?.message || 'An unknown error occurred'
    })
  }
  return Promise.reject(
    error instanceof Error ? error : new Error(String(error))
  )
}

export const redirectToLogin = () => {
  window.location.href = '/login'
}

export const exportFile = (data: TVocab[], fileName?: string) => {
  const worksheetData = data.flatMap((item) =>
    item.textTarget.map((target) => ({
      SourceLanguage: item.sourceLanguage,
      TargetLanguage: item.targetLanguage,
      TextSource: item.textSource,
      TextTarget_Text: target.text,
      TextTarget_WordType: target.wordType,
      TextTarget_ExplanationSource: target.explanationSource,
      TextTarget_ExplanationTarget: target.explanationTarget,
      TextTarget_Examples: target.examples
        .map((ex) => `${ex.source}: ${ex.target}`)
        .join('; '),
      TextTarget_Grammar: target.grammar,
      TextTarget_Subjects: target.subject.map((sub) => sub.label).join(', ')
    }))
  )

  const ws = XLSX.utils.json_to_sheet(worksheetData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  const dateString = format(new Date(), 'yyyyMMdd')
  const defaultFileName = `export_vocab_${dateString}.xlsx`

  XLSX.writeFile(wb, fileName ?? defaultFileName)
}

export const importFile = (file: File): Promise<TVocab[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        if (!event.target) {
          throw new Error('Failed to read file: event target is null')
        }
        const workbook = XLSX.read(event.target.result, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(sheet)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const reconstructedData = jsonData.reduce((acc: TVocab[], row: any) => {
          const textTarget: TTextTarget = {
            text: row.TextTarget_Text,
            wordType: row.TextTarget_WordType,
            explanationSource: row.TextTarget_ExplanationSource ?? '',
            explanationTarget: row.TextTarget_ExplanationTarget ?? '',
            examples:
              row.TextTarget_Examples ?
                row.TextTarget_Examples.split('; ').map((ex: string) => {
                  const [source, target] = ex.split(': ')
                  return { source, target }
                })
              : [],
            grammar: row.TextTarget_Grammar ?? '',
            subject:
              row.TextTarget_Subjects ?
                row.TextTarget_Subjects.split(', ').map((label: string) => ({
                  label,
                  value: ''
                }))
              : []
          }

          const existing = acc.find(
            (item) => item.textSource === row.TextSource
          )
          if (existing) {
            existing.textTarget.push(textTarget)
          } else {
            acc.push({
              _id: '',
              sourceLanguage: row.SourceLanguage,
              targetLanguage: row.TargetLanguage,
              textSource: row.TextSource,
              textTarget: [textTarget]
            })
          }
          return acc
        }, [])

        resolve(reconstructedData)
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}
