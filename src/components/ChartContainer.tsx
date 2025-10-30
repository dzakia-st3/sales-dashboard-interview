import React, { Suspense } from "react";
import SalesBarChart from "./BarChart";
import SalesLineChart from "./LineChart";
import dataSales from "../data/dataSales.json"
import { FilterSalesData } from "../utility/FilterChartFunction";

interface ChartContainerProps {
    year: number | null;
    month: number | null;
    periodType: "weekly" | "monthly" | "annual" | "custom" | null;
    startDate: string | null;
    endDate: string | null;
}


const ChartContainer: React.FC<ChartContainerProps> = ({
    year,
    month,
    periodType,
    startDate,
    endDate
}) => {
    const filtered = FilterSalesData(dataSales, {
        year: year,
        month: month,
        period: periodType,
        startDate: startDate,
        endDate: endDate,
    });

    return (
        <>
            <Suspense fallback={<div>Loading Line Chart...</div>}>
                <SalesLineChart data={filtered.data} xDataKey={filtered.xDataKey} />
            </Suspense>
            <Suspense fallback={<div>Loading Line Chart...</div>}>
                <SalesBarChart data={filtered.data} xDataKey={filtered.xDataKey} />
            </Suspense>
        </>
    )
}

export default ChartContainer