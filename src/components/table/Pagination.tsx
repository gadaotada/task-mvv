import './Pagination.css';

interface PaginationProps {
    page: number;
    total: number;
    pageSize: number;
    onPageChange: (pageNumber: number) => Promise<void>;
    loading: boolean;
};

const generatePageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  const delta = 2; // number of pages before and after the current page
  const range = [];

  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    if (i === currentPage - delta && i > 2) {
      range.push('...'); // leading ellipses
    } else if (i === currentPage + delta && i < totalPages - 1) {
      range.push('...'); // trailing ellipses
    } else {
      range.push(i);
    }
  }

  if (currentPage - delta > 2) {
    range.unshift(2); // second page number
  }

  if (currentPage + delta < totalPages - 1) {
    range.push(totalPages - 1); // second to last page number
  }

  range.unshift(1); // always include the first page
  range.push(totalPages); // always include the last page

  return range;
};


const Pagination: React.FC<PaginationProps> = ({ page, total, pageSize, onPageChange, loading }) => {
  const pageCount = Math.ceil(total / pageSize);

  const pageNumbers = generatePageNumbers(page, pageCount);

  const firstItemIndex = (page - 1) * pageSize + 1;
  const lastItemIndex = Math.min(page * pageSize, total);
    
  if (pageCount <= 1) {
    return (
      <>
        <div className="pagination-container">
          <div className='pagination-info'>
              <span>
                Showing {firstItemIndex}-{lastItemIndex} out of {total} results
              </span>
            </div>
          <div className="pagination-controls">
            <span className="text-gray-600"> Page: 1</span>
          </div>
        </div>
      </>
    )
  }

  const goToPage = async (pageNumber: number) => {
    await onPageChange(pageNumber);
  };

  return (
    <div className="pagination-container">
        <div className='pagination-info'>
            <span>
                Showing {firstItemIndex}-{lastItemIndex} out of {total} results
            </span>
        </div>
        <div className="pagination-controls">
            <span> Page: </span>
            {pageNumbers.map((pageNumber, index) => {
                const isCurrent = pageNumber === page;
                const isEllipsis = pageNumber === '...';

                return (
                    <button
                        key={index}
                        disabled={loading}
                        className={`page-button ${
                            isCurrent ? 'current-page-button' : 'default-page-button'
                        } ${isEllipsis ? 'ellipsis-button' : ''} ${loading ? "disabled-pb" : ""}
                        `}
                        onClick={() => !isEllipsis && goToPage(Number(pageNumber))}
                        aria-current={isCurrent ? 'page' : undefined}
                    >
                        {pageNumber}
                    </button>
                );
            })}
        </div>
    </div>
);
};

export default Pagination;
