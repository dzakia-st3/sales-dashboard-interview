import React from "react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface LineChartProps {
    data: any[] | [any[], string];
    xDataKey: string
}

const SalesLineChart: React.FC<LineChartProps> = ({ data, xDataKey }) => (
    <div className="flex-1 bg-white p-4 rounded-xs my-2 shadow">
        <h2 className="font-bold mb-2">Line Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
            <ReLineChart data={data}>
                <defs>
                    <linearGradient id="lineGradient" x1='0' y1='0' x2='1' y2='0'>
                        <stop offset='0%' stopColor="#14b8a6" /> {/*teal-400 */}
                        <stop offset='100%' stopColor="#4f46e5" /> {/*indigo-500 */}
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={xDataKey}
                    tick={{ fill: '#374151' }}
                />
                <YAxis
                    tick={{ fill: '#374151' }}
                />
                <Tooltip
                    contentStyle={{
                        color: '#374151',
                        borderRadius: 2
                    }}
                />
                <Legend
                    formatter={(value) => <span style={{ color: "#374151" }}>{value}</span>}
                />
                <Line type="monotone" dataKey="qty" stroke="url(#lineGradient)" />
            </ReLineChart>
        </ResponsiveContainer>
    </div>
);

export default SalesLineChart;
