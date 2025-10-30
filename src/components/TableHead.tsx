import React from "react";
import { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

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
            <tr className="bg-linear-to-r from-teal-400 to-indigo-500">
                {columns?.map(({ label, key, sortable }) => (
                    <th
                        key={key}
                        onClick={sortable ? () => handleSortingChange(key) : undefined}
                        className="p-3 font-sm text-white cursor-pointer select-none"
                    >
                        {/* Bungkus label + icon */}
                        <div className="flex items-center justify-between">
                            <span>{label}</span>

                            {/* Icon container */}
                            {sortable && (
                                <div className="flex flex-col ml-1">
                                    {/* Default: dua panah */}
                                    {SortField !== key && (
                                        <>
                                            <ArrowUpIcon className="w-3 h-3 text-white transition-opacity duration-200" />
                                            <ArrowDownIcon className="w-3 h-3 text-white -mt-1 transition-opacity duration-200" />
                                        </>
                                    )}
                                    {/* Asc */}
                                    {SortField === key && order === "asc" && (
                                        <ArrowUpIcon className="w-3 h-3 text-indigo-950 transition-transform duration-200 transform rotate-0" />
                                    )}
                                    {/* Desc */}
                                    {SortField === key && order === "desc" && (
                                        <ArrowDownIcon className="w-3 h-3 text-indigo-950 transition-transform duration-200 transform rotate-0" />
                                    )}
                                </div>
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHead