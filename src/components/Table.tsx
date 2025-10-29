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
        <div className="overflow-x-auto">
            <table className="min-w-full md:w-2/3 text-left overflow-x-auto">
                <caption>{caption}</caption>
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