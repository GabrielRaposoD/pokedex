import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import cs from 'clsx';
import { usePagination } from 'hooks/usePagination';

interface PaginationProps {
  total: number;
  currentPage: number;
  setCurrentPage: (v: number) => void;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  total,
  itemsPerPage,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 2,
    pageSize: itemsPerPage,
  });

  const PAGE_TOTAL = Math.ceil(total / itemsPerPage);

  return (
    <div className='sm:px-6 flex items-center justify-between px-4 py-3 bg-white'>
      <div className='sm:hidden flex justify-between flex-1'>
        <button
          type='button'
          className='hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
          onClick={() =>
            currentPage > 1 ? setCurrentPage(currentPage - 1) : null
          }
        >
          Previous
        </button>
        <button
          type='button'
          className='hover:bg-gray-50 relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
          onClick={() => {
            currentPage < PAGE_TOTAL ? setCurrentPage(currentPage + 1) : null;
          }}
        >
          Next
        </button>
      </div>
      <div className='sm:flex-1 sm:flex sm:items-center sm:justify-between hidden'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className='font-medium'>
              {currentPage * itemsPerPage <= total
                ? currentPage * itemsPerPage
                : total}
            </span>{' '}
            of <span className='font-medium'>{total}</span> results
          </p>
        </div>
        <div>
          <ol
            className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <button
              type='button'
              className='rounded-l-md hover:bg-gray-50 relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300'
              onClick={() =>
                currentPage > 1 ? setCurrentPage(currentPage - 1) : null
              }
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='w-5 h-5' aria-hidden='true' />
            </button>
            {paginationRange?.map((page, i) => {
              return (
                <li
                  onClick={() => {
                    setCurrentPage(page as number);
                  }}
                  key={i}
                  aria-current='page'
                  className={cs({
                    'hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer':
                      page !== currentPage,
                    'bg-indigo-50 relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500 pointer-events-none':
                      page === currentPage,
                    'pointer-events-none': page === '...',
                  })}
                >
                  {page}
                </li>
              );
            })}
            <button
              type='button'
              className='rounded-r-md hover:bg-gray-50 relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300'
              onClick={() => {
                currentPage < PAGE_TOTAL
                  ? setCurrentPage(currentPage + 1)
                  : null;
              }}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='w-5 h-5' aria-hidden='true' />
            </button>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
