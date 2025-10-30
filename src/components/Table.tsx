import React, { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import { useSortingTable } from "../utility/SortTableFunction";

interface PropsType {
    caption?: string,
    data?: any[],
    columns?: any[]
    itemsPerPage?: number
}

const Table: React.FC<PropsType> = ({ caption, data, columns, itemsPerPage = 10 }) => {
    const [tableData, handleSorting] = useSortingTable(data ?? [], columns ?? [])
    const [currentPage, setCurrentPage] = useState(1)

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = tableData.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="overflow-x-auto p-3 bg-white/20 backdrop-blur-xs rounded-xs shadow-md border border-white/30 flex flex-col">
            <h2 className="text-left text-2xl md:text-4xl font-light pb-5 font-semibold">{caption}</h2>
            <table className="min-w-full table-auto border-separate border-spacing-0 text-[13px] md:text-base md:w-2/3 text-left">
                <TableHead columns={columns ?? []} handleSorting={handleSorting} />
                <TableBody columns={columns ?? []} tableData={paginatedData} />
            </table>

            <Pagination
                totalItems={tableData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}


export default Table