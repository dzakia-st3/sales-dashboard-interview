import { useState } from "react"
import Table from "../components/Table"
import ChartContainer from "../components/ChartContainer"
import dataSales from "../data/dataSales.json"
import DateFilter from "../components/DateFilter"

const columns = [
    { label: "No", key: "number", sortable: false },
    { label: "Date", key: "date", sortable: true },
    { label: "Country", key: "region", sortable: true },
    { label: "Product", key: "product", sortable: true },
    { label: "Price (unit)", key: "price_per_unit", sortable: true },
    { label: "QTY", key: "qty", sortable: true },
    { label: "Total", key: "total_sales", sortable: true },
]


const Dashboard = () => {
    const now = new Date();
    const currentYear = now.getFullYear()

    const [filters, setFilters] = useState<{
        year: number | null;
        month: number | null;
        periodType: "weekly" | "monthly" | "annual" | "custom" | null;
        startDate: string | null;
        endDate: string | null;
    }>({
        year: currentYear,
        month: 0,
        periodType: 'monthly',
        startDate: null,
        endDate: null,
    });

    let label = () => {
        if (filters.periodType === 'annual') {
            return 'Annual Summary'
        } else if (filters.periodType === 'monthly') {
            const year = filters.year ?? currentYear
            if (filters.month === 0 || filters.month === null) {
                return `${year}`
            } else {
                const monthName = new Date(year, filters.month - 1).toLocaleString('en-GB', { month: 'short' })
                return `${monthName} ${year}`
            }
        } else if (filters.periodType === 'weekly') {
            if (filters.startDate) {
                const start = new Date(filters.startDate)
                const end = new Date(start)
                end.setDate(start.getDate() + 6)
                const opt = { day: '2-digit', month: 'short', year: 'numeric' } as const

                return `${start.toLocaleDateString('en-GB', opt)} - ${end.toLocaleDateString('en', opt)}`
            }
        } else if (filters.periodType === 'custom') {
            if (filters.startDate && filters.endDate) {
                const opt = { day: '2-digit', month: 'short', year: 'numeric' } as const
                const start = new Date(filters.startDate)
                const end = new Date(filters.endDate)

                return `${start.toLocaleDateString('en-GB', opt)} - ${end.toLocaleDateString('en', opt)}`
            }
        } else {
            return ''
        }
    }

    return (
        <>
            <h3 className="w-full py-3 px-5 md:px-10 text-white text-3xl font-semibold  bg-gradient-to-r from-teal-400 to-indigo-500 tracking-wide">DASHBOARD</h3>
            <div className="my-3 mx-5 md:mx-10">
                <Table
                    caption='NovaTech Sales Data'
                    data={dataSales}
                    columns={columns}
                />
                <div className="bg-white/20 backdrop-blur-xs rounded-xs shadow-md border border-white/30">
                    <h3 className="text-left text-2xl md:text-4xl font-light py-5 px-4 font-semibold">{`Sales Chart – ${label()}`}</h3>
                    <hr className="border border-gray-50" />
                    <DateFilter
                        onFilterChange={(newFilters) => setFilters({
                            year: newFilters.year ?? null,
                            month: newFilters.month ?? 0,
                            periodType: newFilters.type ?? null,
                            startDate: newFilters.startDate ?? null,
                            endDate: newFilters.endDate ?? null,
                        })}
                    />
                    <ChartContainer {...filters} />
                </div>
            </div>
            <h5 className="w-full py-3 px-5 md:px-10 text-white text-xs font-normal  bg-gradient-to-r from-teal-400 to-indigo-500 tracking-wide"> ©2025 ProjectName. All rights reserved.</h5>
        </>
    )
}

export default Dashboard