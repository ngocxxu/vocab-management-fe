import { cn } from '@/lib/utils'
import { setPaginationVocabState } from '@/redux/reducer/vocab'
import { RootState } from '@/redux/store'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import {
  LIMIT_PAGE_10,
  ROUTER_VOCAB_TRAINER,
  limitData
} from '../../utils/constants'
import { TPagination } from '../../utils/types'
import Select from '../select'
import { ButtonLib } from '../ui/button'

type TPaginationProps = { paginations: TPagination }

const Pagination = ({ paginations }: TPaginationProps) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { currentPage, totalPages, totalItems } = paginations
  const [searchParams, setSearchParams] = useSearchParams()
  const { paginationVocabState } = useSelector(
    (state: RootState) => state.vocabReducer
  )
  const { isOpenModalState } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  )
  const isURLVocabTrainer =
    pathname === ROUTER_VOCAB_TRAINER && isOpenModalState
  const limitValue =
    isURLVocabTrainer ? paginationVocabState.limit : searchParams.get('limit')!

  const onPageChange = (newPageNumber: number) => {
    isURLVocabTrainer ?
      dispatch(
        setPaginationVocabState({
          ...paginationVocabState,
          page: String(newPageNumber)
        })
      )
    : setSearchParams({
        page: String(newPageNumber),
        limit: searchParams.get('limit') ?? LIMIT_PAGE_10
      })
  }

  const onLimitChange = (newLimit: string) => {
    isURLVocabTrainer ?
      dispatch(
        setPaginationVocabState({
          ...paginationVocabState,
          limit: newLimit
        })
      )
    : setSearchParams({
        page: '1',
        limit: newLimit
      })
  }

  const getPagesToShow = () => {
    const adjacentPageCount = 2
    const pagesToShow: (number | null)[] = []

    const addPage = (pageNumber: number) => {
      if (
        pagesToShow.length > 0 &&
        pageNumber - pagesToShow[pagesToShow.length - 1]! > 1
      ) {
        pagesToShow.push(null)
      }
      pagesToShow.push(pageNumber)
    }

    addPage(1)

    for (
      let i = currentPage - adjacentPageCount;
      i <= currentPage + adjacentPageCount;
      i++
    ) {
      if (i > 1 && i < totalPages) {
        addPage(i)
      }
    }

    totalPages > 1 && addPage(totalPages)

    return pagesToShow
  }

  return (
    <div className="mt-4 flex items-center justify-between gap-1">
      <div className="flex items-center gap-2 text-xs">
        <p className="whitespace-nowrap">Items per page</p>
        <Select
          options={limitData}
          onChange={(e: string) => {
            return onLimitChange(e)
          }}
          value={limitValue}
          isSearchable={false}
        />
        <p className="whitespace-nowrap">
          1-{limitValue} of {totalItems} items
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ButtonLib
          variant="outline"
          className="h-7 px-2.5"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          «
        </ButtonLib>
        <ButtonLib
          variant="outline"
          className="h-7 px-2.5"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </ButtonLib>

        {getPagesToShow().map((pageNumber, index) => (
          <Fragment key={index}>
            {pageNumber === null ?
              <ButtonLib variant="outline" className="h-7 px-2.5">
                ...
              </ButtonLib>
            : <ButtonLib
                variant="outline"
                onClick={() => onPageChange(pageNumber)}
                className={cn(
                  'h-7 px-2.5',
                  (
                    pageNumber ===
                      parseInt(
                        isURLVocabTrainer ?
                          paginationVocabState.page
                        : searchParams.get('page')!
                      )
                  ) ?
                    'bg-primary text-background'
                  : ''
                )}
              >
                {pageNumber}
              </ButtonLib>
            }
          </Fragment>
        ))}

        <ButtonLib
          variant="outline"
          className="h-7 px-2.5"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </ButtonLib>
        <ButtonLib
          variant="outline"
          className="h-7 px-2.5"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </ButtonLib>
      </div>
    </div>
  )
}

export default Pagination
