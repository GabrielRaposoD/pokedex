import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import cs from 'clsx';

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
  const PAGE_TOTAL = Math.ceil(total / itemsPerPage);
  const pages = [...new Array(PAGE_TOTAL)].map((_, i) => i + 1);
  console.log(currentPage);
  return (
    <div className='sm:px-6 flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200'>
      <div className='sm:hidden flex justify-between flex-1'>
        <button
          type='button'
          className='hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
        >
          Previous
        </button>
        <button
          type='button'
          className='hover:bg-gray-50 relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
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
            {pages
              .slice(
                currentPage - 1 <= PAGE_TOTAL - 9
                  ? currentPage > 5
                    ? currentPage - 1
                    : 0
                  : PAGE_TOTAL - 9,
                currentPage > 5 ? currentPage + 8 : 9
              )
              .map((v, i) => {
                const page =
                  i === 0
                    ? pages[i]
                    : i === 1
                    ? currentPage <= 5
                      ? 2
                      : '...'
                    : i === 7
                    ? currentPage >= PAGE_TOTAL - 5
                      ? PAGE_TOTAL - 1
                      : '...'
                    : i === 8
                    ? pages[PAGE_TOTAL - 1]
                    : pages[v - i];
                return (
                  <li
                    onClick={() => {
                      setCurrentPage(page as number);
                    }}
                    key={i}
                    aria-current='page'
                    className={cs({
                      'hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300':
                        page !== currentPage,
                      'bg-indigo-50 relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500':
                        page === currentPage,
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
