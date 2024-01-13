import { Row } from "@tanstack/react-table";
import { ReactNode, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TExtend } from "../../../../components/table";
import { setItemsShowState } from "../../../../redux/reducer/vocab";
import { RootState } from "../../../../redux/store";
import styles from "./styles.module.scss";

type TCollapseVocab<T extends TExtend> = { row: Row<T> };

const Collapse = <T extends TExtend>({ row }: TCollapseVocab<T>) => {
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
            {row.original.textTarget.map(
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
                console.log({ itemsShow });

                return (
                  <li
                    className={
                      idx === row.original.textTarget.length - 1 ? "" : "mb-4"
                    }
                    key={text}
                  >
                    <p>
                      <span className="text-sky-500">{wordType} </span>
                      <span className="font-semibold">{text} - </span>
                      <span className="badge badge-outline text-xs">
                        {subject}
                      </span>
                    </p>
                    <p>{explanationSource}</p>
                    <p>{explanationTarget}</p>

                    {examples
                      .slice(0, !checkShow(idx) ? 1 : examples.length)
                      .map(({ source, target }) => (
                        <div
                          key={source}
                          className="flex justify-start items-end gap-3"
                        >
                          <p
                            key={source}
                            className="border-l-4 border-gray-400 pl-2 mb-2"
                          >
                            {source} <br />
                            {target}
                          </p>
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
