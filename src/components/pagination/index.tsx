import { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { LIMIT_PAGE_10 } from "../../utils/constants";
import { TPagination } from "../../utils/types";
import clsx from "clsx";
import { ButtonLib } from "../ui/button";

type TPaginationProps = { paginations: TPagination };

const Pagination = ({ paginations }: TPaginationProps) => {
  const { currentPage, totalPages } = paginations;
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (newPageNumber: number) => {
    setSearchParams({
      page: String(newPageNumber),
      limit: LIMIT_PAGE_10,
    });
  };

  const getPagesToShow = () => {
    const adjacentPageCount = 2; // Số trang xung quanh trang hiện tại
    const pagesToShow: (number | null)[] = [];

    const addPage = (pageNumber: number) => {
      if (
        pagesToShow.length > 0 &&
        pageNumber - pagesToShow[pagesToShow.length - 1]! > 1
      ) {
        pagesToShow.push(null);
      }
      pagesToShow.push(pageNumber);
    };

    // Thêm trang đầu tiên
    addPage(1);

    // Thêm trang hiện tại và các trang xung quanh nó
    for (
      let i = currentPage - adjacentPageCount;
      i <= currentPage + adjacentPageCount;
      i++
    ) {
      if (i > 1 && i < totalPages) {
        addPage(i);
      }
    }

    // Thêm trang cuối cùng
    totalPages > 1 && addPage(totalPages);

    return pagesToShow;
  };

  return (
    <div className="flex items-center justify-end gap-1 mt-4">
      <ButtonLib
        variant="outline"
        className="h-7 px-2.5"
        onClick={() =>
          setSearchParams({ page: String(1), limit: LIMIT_PAGE_10 })
        }
        disabled={currentPage === 1}
      >
        «
      </ButtonLib>
      <ButtonLib
        variant="outline"
        className="h-7 px-2.5"
        onClick={() =>
          setSearchParams({
            page: String(currentPage - 1),
            limit: LIMIT_PAGE_10,
          })
        }
        disabled={currentPage === 1}
      >
        ‹
      </ButtonLib>

      {getPagesToShow().map((pageNumber, index) => (
        <Fragment key={index}>
          {pageNumber === null ? (
            <ButtonLib variant="outline" className="h-7 px-2.5">
              ...
            </ButtonLib>
          ) : (
            <ButtonLib
              variant="outline"
              onClick={() => onPageChange(pageNumber)}
              className={clsx(
                "h-7 px-2.5",
                pageNumber === parseInt(searchParams.get("page")!)
                  ? "active bg-customBlue text-white"
                  : ""
              )}
            >
              {pageNumber}
            </ButtonLib>
          )}
        </Fragment>
      ))}

      <ButtonLib
        variant="outline"
        className="h-7 px-2.5"
        onClick={() =>
          setSearchParams({
            page: String(currentPage + 1),
            limit: LIMIT_PAGE_10,
          })
        }
        disabled={currentPage === totalPages}
      >
        ›
      </ButtonLib>
      <ButtonLib
        variant="outline"
        className="h-7 px-2.5"
        onClick={() =>
          setSearchParams({
            page: String(totalPages),
            limit: LIMIT_PAGE_10,
          })
        }
        disabled={currentPage === totalPages}
      >
        »
      </ButtonLib>
    </div>
  );
};

export default Pagination;
