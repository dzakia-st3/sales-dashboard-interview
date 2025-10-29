import React, { useState } from "react"
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

    return (
        <div>
            <h3>DASHBOARD</h3>
            <Table
                caption='NovaTech Sales Data'
                data={dataSales}
                columns={columns}
            />
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
    )
}

export default Dashboard