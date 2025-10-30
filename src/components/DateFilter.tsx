import React, { useState } from "react";
import ChartContainer from "./ChartContainer";

interface DateFilterProps {
    onFilterChange: (filters: {
        type: "weekly" | "monthly" | "annual" | "custom" | null;
        year?: number | null;
        month?: number | null;
        startDate?: string | null;
        endDate?: string | null;
    }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilterChange }) => {
    const currentYear = new Date().getFullYear();
    const [periodType, setPeriodType] = useState<"weekly" | "monthly" | "annual" | "custom">("monthly");
    const [year, setYear] = useState<number>(currentYear);
    const [month, setMonth] = useState<number | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleApply = () => {
        onFilterChange({ type: periodType, year, month: month || undefined, startDate, endDate });
    };

    return (
        <div className="flex flex-wrap gap-4 items-end bg-white/20 backdrop-blur-xs rounded-xs shadow-md border border-white/30 p-4 mb-2">
            <div className="flex flex-col">
                <label className="text-sm text-gray-700 font-semibold mb-1">Periode</label>
                <select
                    className="border border-gray-500 text-gray-700 p-2 rounded-xs"
                    value={periodType}
                    onChange={(e) => setPeriodType(e.target.value as any)}
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="custom">Custom Range</option>
                </select>
            </div>

            {/* Input sesuai periode */}
            {periodType === "monthly" && (
                <>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700 font-semibold mb-1">Year</label>
                        <select
                            className="border text-gray-700 border-gray-500 p-2 rounded-xs"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                        >
                            {[2023, 2024, 2025].map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700 font-semibold mb-1">Month</label>
                        <select
                            className="border text-gray-700 p-2 rounded-xs border-gray-500"
                            value={month ?? ""}
                            onChange={(e) => setMonth(e.target.value ? parseInt(e.target.value) : null)}
                        >
                            <option value={0}>All</option>
                            {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ].map((m, i) => (
                                <option key={i} value={i + 1}>{m}</option>
                            ))}
                        </select>
                    </div>
                </>
            )}

            {periodType === "weekly" && (
                <>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700 font-semibold mb-1">Start date</label>
                        <input
                            type="date"
                            className="border border-gray-500 text-gray-700 p-2 rounded-xs"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </>
            )}

            {periodType === "custom" && (
                <>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700 font-semibold mb-1">Start date</label>
                        <input
                            type="date"
                            className="border border-gray-500 text-gray-700 p-2 rounded-xs"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700 font-semibold mb-1">End date</label>
                        <input
                            type="date"
                            className="border border-gray-500 p-2 text-gray-700 rounded-xs"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </>
            )}

            <button
                onClick={handleApply}
                className="bg-gradient-to-r from-teal-400 to-indigo-500 hover:opacity-80 text-white font-semibold py-2 px-3 rounded-xs"
            >
                Apply
            </button>
        </div>
    );
};

export default DateFilter;
