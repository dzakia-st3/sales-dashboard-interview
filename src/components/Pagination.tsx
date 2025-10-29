import React from 'react'

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void
    maxPageButtons?: number
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange ,maxPageButtons = 2}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    if (totalPages === 1) return null

    const pages: (number | "...")[] = []
    const half = Math.floor(maxPageButtons / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, currentPage + half)

    if (end-start + 1 < maxPageButtons) {
        if (start === 1) end = Math.min(totalPages, start + maxPageButtons - 1)
            else if (end === totalPages) start = Math.max(1, end - maxPageButtons + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (start > 1) {
        if (start > 2) pages.unshift("...")
            pages.unshift(1)
    }

    if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...")
            pages.push(totalPages)
    }

    return (
        <div className="flex justify-center mt-4 space-x-1">
            {/* Prev */}
            <button onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50'
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {/* {pages.map((page, idx) => (
               page === '...' ? (
                <span key={idx} className='px-2 py-1'>
                    ...
                </span>
               ) : (
                 <button
                    key={page}
                    onClick={() => onPageChange(page as number)}
                    className={`px-3 py-1 rounded hover:bg-gray-300 ${page === currentPage ? "bg-amber-400 text-white" : 'bg-gray-100'}`}
                >
                    {page}
                </button>
               )
            ))} */}

            {/* Next */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50'
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination