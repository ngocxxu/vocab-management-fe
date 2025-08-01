import { toast } from '@/components/ui/use-toast'
import { TVocabSubject } from '@/pages/settings/types'
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
    item.textTargets.map((target) => ({
      SourceLanguage: item.sourceLanguageCode,
      TargetLanguage: item.targetLanguageCode,
      TextSource: item.textSource,
      TextTarget_Text: target.textTarget,
      TextTarget_WordType: target.wordType,
      TextTarget_ExplanationSource: target.explanationSource,
      TextTarget_ExplanationTarget: target.explanationTarget,
      TextTarget_Examples: target.vocabExamples
        .map((ex) => `${ex.source}: ${ex.target}`)
        .join('; '),
      TextTarget_Grammar: target.grammar,
      TextTarget_Subjects: target.textTargetSubjects.map((sub) => sub.label).join(', ')
    }))
  )

  const ws = XLSX.utils.json_to_sheet(worksheetData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  const dateString = format(new Date(), 'yyyyMMdd')
  const defaultFileName = `export_vocab_${dateString}.xlsx`

  XLSX.writeFile(wb, fileName ?? defaultFileName)
}

export const importFile = (
  file: File,
  listSubject: TVocabSubject[]
): Promise<{ data?: TVocab[]; error?: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (!event.target) {
        return resolve({ error: 'Failed to read file: event target is null' })
      }
      const workbook = XLSX.read(event.target.result, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet) as Record<
        string,
        unknown
      >[]

      // Define required and optional fields
      const requiredFields = {
        SourceLanguage: 'string',
        TargetLanguage: 'string',
        TextSource: 'string',
        TextTarget_Text: 'string'
      }
      const optionalFields = [
        'TextTarget_WordType',
        'TextTarget_ExplanationSource',
        'TextTarget_ExplanationTarget',
        'TextTarget_Examples',
        'TextTarget_Grammar',
        'TextTarget_Subjects'
      ]

      // Validate each row
      for (const [index, row] of jsonData.entries()) {
        for (const [field, type] of Object.entries(requiredFields)) {
          if (
            !(field in row) ||
            row[field] === undefined ||
            row[field] === null ||
            row[field] === ''
          ) {
            return resolve({
              error: `Row ${index + 2}: Missing or empty required field '${field}'`
            })
          }
          if (typeof row[field] !== type) {
            return resolve({
              error: `Row ${index + 2}: Field '${field}' must be a ${type}, got '${typeof row[field]}'`
            })
          }
        }
        for (const field of optionalFields) {
          if (row[field] === undefined || row[field] === null) {
            row[field] = ''
          }
        }
        if (row.TextTarget_Examples) {
          const examples = String(row.TextTarget_Examples).split('; ')
          for (const ex of examples) {
            if (!ex.includes(': ')) {
              return resolve({
                error: `Row ${index + 2}: Invalid example format in 'TextTarget_Examples': '${ex}'`
              })
            }
          }
        }
        if (row.TextTarget_Subjects) {
          const subjects = String(row.TextTarget_Subjects).split(', ')
          if (subjects.some((s: string) => !s.trim())) {
            return resolve({
              error: `Row ${index + 2}: Invalid subjects format in 'TextTarget_Subjects'`
            })
          }
        }
      }

      // Process data
      const reconstructedData = jsonData.reduce((acc: TVocab[], row) => {
        const textTarget: TTextTarget = {
          textTarget: String(row.TextTarget_Text),
          wordType:
            row.TextTarget_WordType ? String(row.TextTarget_WordType) : '',
          explanationSource:
            row.TextTarget_ExplanationSource ?
              String(row.TextTarget_ExplanationSource)
            : '',
          explanationTarget:
            row.TextTarget_ExplanationTarget ?
              String(row.TextTarget_ExplanationTarget)
            : '',
          vocabExamples:
            row.TextTarget_Examples ?
              String(row.TextTarget_Examples)
                .split('; ')
                .map((ex: string) => {
                  const [source, target] = ex.split(': ')
                  return { source, target }
                })
            : [],
          grammar: row.TextTarget_Grammar ? String(row.TextTarget_Grammar) : '',
          textTargetSubjects:
            row.TextTarget_Subjects ?
              String(row.TextTarget_Subjects)
                .split(', ')
                .map((label: string) => ({
                  label,
                  value:
                    listSubject.find((sub) => sub.name === label)?._id || ''
                }))
            : []
        }

        const existing = acc.find((item) => item.textSource === row.TextSource)
        if (existing) {
          existing.textTargets.push(textTarget)
        } else {
          acc.push({
            _id: '',
            sourceLanguageCode: String(row.SourceLanguage),
            targetLanguageCode: String(row.TargetLanguage),
            textSource: String(row.TextSource),
            textTargets: [textTarget]
          })
        }
        return acc
      }, [])

      resolve({ data: reconstructedData })
    }
    reader.onerror = () => resolve({ error: 'Failed to read file' })
    reader.readAsArrayBuffer(file)
  })
}
