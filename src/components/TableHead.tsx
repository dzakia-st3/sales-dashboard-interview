import React from "react";
import { useState } from "react";

interface PropsType {
    columns?: any[]
    handleSorting?: any
}

const TableHead: React.FC<PropsType> = ({ columns, handleSorting }) => {
    const [SortField, setSortField] = useState("")
    const [order, setOrder] = useState("")

    const handleSortingChange = (key: string) => {
        const SortOrder = key === SortField && order === 'asc' ? 'desc' : 'asc'

        setSortField(key)
        setOrder(SortOrder)
        handleSorting(key, SortOrder)
    }

    return (
        <thead>
            <tr>
                {columns?.map(({ label, key, sortable }) => {
                    const icon = sortable ? SortField === key && order === 'asc' ? "up" : SortField === key && order === 'desc' ? 'down' : "default" : ""

                    return (
                        <th
                            key={key}
                            onClick={sortable && (() => handleSortingChange(key))}
                            className={`icon bg-amber-400`}
                        >
                            {label}
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}

export default TableHead