import React from "react";
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
            <SalesLineChart data={filtered.data} xDataKey={filtered.xDataKey} />
            <SalesBarChart data={filtered.data} xDataKey={filtered.xDataKey} />
        </>
    )
}

export default ChartContainer