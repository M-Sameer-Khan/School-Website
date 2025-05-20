import React from 'react';

/**
 * Reusable pagination component with page number display and navigation
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers

    if (totalPages <= maxPagesToShow) {
      // If we have 5 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of page numbers to show
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust to show 3 pages
      if (start === 2) end = Math.min(end + 1, totalPages - 1);
      if (end === totalPages - 1) start = Math.max(start - 1, 2);

      // Add ellipsis if needed
      if (start > 2) pageNumbers.push('...');

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) pageNumbers.push('...');

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className={`flex justify-center items-center mt-8 ${className}`}>
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-3 py-1 mr-2 rounded-md border border-gray-300 bg-white text-gray-700 
                  hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &laquo; Previous
      </button>

      {/* Page numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page - 1)}
            disabled={page === '...' || page === currentPage + 1}
            className={`
              w-8 h-8 flex items-center justify-center rounded-md
              ${page === currentPage + 1
                ? 'bg-primary-600 text-white'
                : page === '...'
                  ? 'text-gray-500 cursor-default'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-3 py-1 ml-2 rounded-md border border-gray-300 bg-white text-gray-700 
                  hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
