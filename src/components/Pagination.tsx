import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void
    maxPageButtons?: number
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange, maxPageButtons = 2 }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    if (totalPages === 1) return null

    const pages: (number | "...")[] = []
    const half = Math.floor(maxPageButtons / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, currentPage + half)

    if (end - start + 1 < maxPageButtons) {
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
        <div className="flex mt-4 space-x-1 items-center">
            {/* Prev */}
            <button onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className='px-2 py-1 text-white bg-linear-to-r from-teal-400 to-indigo-500 rounded-xs hover:opacity-80 disabled:opacity-40'
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon className='w-5 h-5' />
            </button>

            {/* Next */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className='px-2 py-1 text-white bg-linear-to-r from-teal-400 to-indigo-500 rounded-xs hover:opacity-80 disabled:opacity-50'
                disabled={currentPage === totalPages}
            >
                <ChevronRightIcon className='w-5 h-5' />
            </button>

            {/* Page Numbers */}
            <h5 className='px-2 text-[12px] text-gray-700 italic'>page {currentPage} of {totalPages}</h5>
        </div>
    )
}

export default Pagination