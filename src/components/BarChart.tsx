import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface BarChartProps {
    data: any[] | [any[], string];
    xDataKey: string
}

const SalesBarChart: React.FC<BarChartProps> = ({ data, xDataKey }) => {
    return (
        (
            <div className="flex-1 bg-white p-4 rounded shadow">
                <h2 className="font-bold mb-2">Bar Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xDataKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="qty" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    )
};

export default SalesBarChart