import React from "react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface LineChartProps {
    data: any[] | [any[], string];
    xDataKey: string
}

const SalesLineChart: React.FC<LineChartProps> = ({ data, xDataKey }) => (
    <div className="flex-1 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Line Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
            <ReLineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xDataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="qty" stroke="#8884d8" />
            </ReLineChart>
        </ResponsiveContainer>
    </div>
);

export default SalesLineChart;
