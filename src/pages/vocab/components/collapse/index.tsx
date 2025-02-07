import { Badge } from '@/components/badge'
import Button from '@/components/button'
import { cn } from '@/lib/utils'
import { Row } from '@tanstack/react-table'
import { ReactNode, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Voice from '../../../../components/voice'
import { setItemsShowState } from '../../../../redux/reducer/vocab'
import { RootState } from '../../../../redux/store'
import { TTextTarget } from '../../types'
import styles from './styles.module.scss'

type TCollapseVocab<T extends TExtend> = { row: Row<T> }
export type TExtend = {
  _id: string
  textTarget: TTextTarget[]
  sourceLanguage: string
  targetLanguage: string
}

const Collapse = <T extends TExtend>({ row }: TCollapseVocab<T>) => {
  const { textTarget, sourceLanguage, targetLanguage } = row.original
  const dispatch = useDispatch()
  const { idsState, itemsShow } = useSelector(
    (state: RootState) => state.vocabReducer
  )

  const checkShow = (idx: number) =>
    itemsShow.find(
      (item) => item.idRow === row.original._id && item.idxExample === idx
    )

  return (
    idsState.includes(row.original._id) && (
      <tr className={styles.container}>
        <td
          className="break-all bg-background px-6 py-4"
          colSpan={row.getVisibleCells().length}
        >
          <ol className="list-decimal">
            {textTarget.map(
              (
                {
                  text,
                  wordType,
                  explanationSource,
                  explanationTarget,
                  examples,
                  grammar,
                  subject
                },
                idx
              ) => {
                return (
                  <li
                    className={cn(idx === textTarget.length - 1 ? '' : 'mb-4')}
                    key={text}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="text-sky-500">{wordType}</div>
                        <div className="flex items-center">
                          <span className="font-semibold">{text}</span>
                          <Voice lang={targetLanguage} text={text} />
                        </div>
                      </div>
                      <div>
                        {subject.map((item) => (
                          <Badge
                            key={item.label}
                            variant="outline"
                            className="mr-1 border-gray-300 text-xs"
                          >
                            {item.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {explanationSource && (
                      <div className="mb-2 flex items-center">
                        <span>{explanationSource}</span>
                        <Voice lang={sourceLanguage} text={explanationSource} />
                      </div>
                    )}
                    {explanationTarget && (
                      <div className="mb-2 flex items-center">
                        <span>{explanationTarget}</span>
                        <Voice lang={targetLanguage} text={explanationTarget} />
                      </div>
                    )}

                    {examples
                      .slice(0, !checkShow(idx) ? 1 : examples.length)
                      .map(({ source, target }) => (
                        <div
                          key={source}
                          className="flex items-end justify-start gap-3"
                        >
                          <div className="mb-2 border-l-4 border-gray-400 pl-2">
                            <div className="flex items-center">
                              <div>{source}</div>
                              <Voice lang={sourceLanguage} text={source} />
                            </div>
                            <div className="flex items-center">
                              <div>{target}</div>
                              <Voice lang={targetLanguage} text={target} />
                            </div>
                          </div>
                        </div>
                      ))}

                    {examples.length > 1 && (
                      <Button
                        type="button"
                        variant="link"
                        className="mb-2 block text-xs text-blue-400"
                        onClick={() => {
                          dispatch(
                            setItemsShowState({
                              idRow: row.original._id,
                              idxExample: idx
                            })
                          )
                        }}
                        title={!checkShow(idx) ? 'More' : 'Less'}
                      />
                    )}

                    {grammar && (
                      <Badge variant="outline" className="bg-gray-200">
                        <span className="mr-2">Grammar structure:</span>{' '}
                        {grammar}
                      </Badge>
                      // <div className="badge bg-zinc-200 text-xs">
                      //   <span className="mr-2">Grammar structure:</span>{" "}
                      //   {grammar}
                      // </div>
                    )}
                  </li>
                )
              }
            )}
          </ol>
        </td>
      </tr>
    )
  )
}
const CollapseVocab = memo(Collapse) as <T extends TExtend>({
  row
}: TCollapseVocab<T>) => false | ReactNode

export default CollapseVocab
