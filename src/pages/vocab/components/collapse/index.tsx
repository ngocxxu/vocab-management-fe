import { Row } from "@tanstack/react-table";
import { ReactNode, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TExtend } from "../../../../components/table";
import Voice from "../../../../components/voice";
import { setItemsShowState } from "../../../../redux/reducer/vocab";
import { RootState } from "../../../../redux/store";
import styles from "./styles.module.scss";

type TCollapseVocab<T extends TExtend> = { row: Row<T> };

const Collapse = <T extends TExtend>({ row }: TCollapseVocab<T>) => {
  const { textTarget, sourceLanguage, targetLanguage } = row.original;
  const dispatch = useDispatch();
  const { idsState, itemsShow } = useSelector(
    (state: RootState) => state.vocabReducer
  );

  const checkShow = (idx: number) =>
    itemsShow.find(
      (item) => item.idRow === row.original._id && item.idxExample === idx
    );

  return (
    idsState.includes(row.original._id) && (
      <tr className={styles.container}>
        <td
          className="px-6 py-4 break-all"
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
                  subject,
                },
                idx
              ) => {
                return (
                  <li
                    className={idx === textTarget.length - 1 ? "" : "mb-4"}
                    key={text}
                  >
                    <div className="flex items-center mb-2 gap-3">
                      <div className="flex items-center gap-1">
                        <div className="text-sky-500">{wordType}</div>
                        <div className="flex items-center">
                          <span className="font-semibold">{text}</span>
                          <Voice lang={targetLanguage} text={text} />
                        </div>
                      </div>
                      <div>
                        {subject.map((item) => (
                          <span
                            key={item.label}
                            className="badge badge-outline text-xs mr-1"
                          >
                            {item.value}
                          </span>
                        ))}
                      </div>
                    </div>

                    {explanationSource && (
                      <div className="flex items-center mb-2">
                        <span>{explanationSource}</span>
                        <Voice lang={sourceLanguage} text={explanationSource} />
                      </div>
                    )}
                    {explanationTarget && (
                      <div className="flex items-center mb-2">
                        <span>{explanationTarget}</span>
                        <Voice lang={targetLanguage} text={explanationTarget} />
                      </div>
                    )}

                    {examples
                      .slice(0, !checkShow(idx) ? 1 : examples.length)
                      .map(({ source, target }) => (
                        <div
                          key={source}
                          className="flex justify-start items-end gap-3"
                        >
                          <div className="border-l-4 border-gray-400 pl-2 mb-2">
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
                      <button
                        className="text-xs text-blue-400 mb-2 block"
                        onClick={() => {
                          dispatch(
                            setItemsShowState({
                              idRow: row.original._id,
                              idxExample: idx,
                            })
                          );
                        }}
                      >
                        {!checkShow(idx) ? "More" : "Less"}
                      </button>
                    )}

                    {grammar && (
                      <div className="badge bg-zinc-200 text-xs">
                        <span className="mr-2">Grammar structure:</span>{" "}
                        {grammar}
                      </div>
                    )}
                  </li>
                );
              }
            )}
          </ol>
        </td>
      </tr>
    )
  );
};
const CollapseVocab = memo(Collapse) as <T extends TExtend>({
  row,
}: TCollapseVocab<T>) => false | ReactNode;

export default CollapseVocab;
