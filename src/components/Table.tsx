import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useSortingTable } from "../utility/SortTableFunction";

interface PropsType {
    caption?: string,
    data?: any[],
    columns?: any[]
}

const Table: React.FC<PropsType> = ({ caption, data, columns }) => {
    const [tableData, handleSorting] = useSortingTable(data ?? [], columns ?? [])

    return (
        <>
            <table>
                <caption>{caption}</caption>
                <TableHead columns={columns ?? []} handleSorting={handleSorting} />
                <TableBody columns={columns ?? []} tableData={tableData as any[]} />
            </table>
        </>
    )
}


export default Table