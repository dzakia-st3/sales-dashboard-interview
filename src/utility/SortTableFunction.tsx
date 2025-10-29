import React, { useState } from 'react'

interface ColumnType {
    sortbyOrder?: "asc" | "desc";
}

interface DataType {
    [key: string]: any;
}

const getDefaultSorting = (defaultTableData: DataType[], columns: ColumnType[]) => {
    const sorted = [...defaultTableData].sort((a, b) => {
        const filterColumn = columns.filter((column) => column.sortbyOrder)
        console.log('filter column', filterColumn)

        let { key = 'date', sortbyOrder = 'desc' } = Object.assign(
            {},
            ...filterColumn
        )
        console.log('key, sortbyOrder', { key, sortbyOrder })

        if (a[key] === null) return 1
        if (b[key] === null) return -1
        if (a[key] === null && b[key] === null) return 0

        const ascending = a[key]?.toString().localeCompare(b[key]?.toString(), 'en', { numeric: true })
        console.log('ascending', ascending)

        return sortbyOrder === 'asc' ? ascending : -ascending
    })

    return sorted
}

export const useSortingTable = (
    data: DataType[],
    columns: ColumnType[]
): [DataType[], (SortField: string, SortOrder: "asc" | "desc") => void] => {
    const [tableData, setTableData] = useState(() => getDefaultSorting(data, columns));
    
    const handleSorting = (SortField: string, SortOrder: "asc" | "desc") => {
        if (SortField) {
            const sorted = [...tableData].sort((a, b) => {
                if (a[SortField] === null) return 1
                if (b[SortField] === null) return -1
                if (a[SortField] === null && b[SortField] === null) return 0

                return (a[SortField]?.toString().localeCompare(b[SortField]?.toString(), 'en', { numeric: true }) * (SortOrder === 'asc' ? 1 : -1)
                )
            })
            setTableData(sorted)
        }
    };

    return [tableData, handleSorting];
}