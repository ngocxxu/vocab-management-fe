import { Row } from "@tanstack/react-table";
import { ReactNode, memo } from "react";
import { useSelector } from "react-redux";
import { TExtend } from "../../../../components/table";
import { RootState } from "../../../../redux/store";

type TCollapseVocab<T extends TExtend> = { row: Row<T> };

const Collapse = <T extends TExtend>({ row }: TCollapseVocab<T>) => {
  const { idsState } = useSelector((state: RootState) => state.vocabReducer);

  {
    return (
      idsState.includes(row.original._id) && (
        <tr className="bg-slate-100">
          <td
            className="px-6 py-4 break-all"
            colSpan={row.getVisibleCells().length}
          >
            <ol className="list-decimal">
              {row.original.textTarget.map((item) => {
                console.log({ row });

                return (
                  <li className="mb-4" key={item.text}>
                    <p>{item.text}</p>
                    <p>{item.text}</p>
                  </li>
                );
              })}
            </ol>
          </td>
        </tr>
      )
    );
  }
};
const CollapseVocab = memo(Collapse) as <T extends TExtend>({
  row,
}: TCollapseVocab<T>) => false | ReactNode;

export default CollapseVocab;
