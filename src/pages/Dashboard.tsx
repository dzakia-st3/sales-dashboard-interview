import React from "react"
import Table from "../components/Table"
import ChartContainer from "../components/ChartContainer"
import dataSales from "../data/dataSales.json"

const columns = [
    { label: "No", key: "number", sortable: false },
    { label: "Date", key: "date", sortable: true },
    { label: "Country", key: "region", sortable: true },
    { label: "Product", key: "product", sortable: true },
    { label: "Price (unit)", key: "price_per_unit", sortable: true },
    { label: "QTY", key: "qty", sortable: true },
    { label: "Total", key: "total_sales", sortable: true },
]

const Dashboard = () => (
    <div>
        <h3>DASHBOARD</h3>
        <Table
            caption='NovaTech Sales Data'
            data={dataSales}
            columns={columns}
        />
        <ChartContainer />
    </div>
)

export default Dashboard