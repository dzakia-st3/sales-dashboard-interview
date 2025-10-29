import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useSortingTable } from "../SortTableFunction";

interface PropsType {
    caption? : string,
    data?: any[],
    columns?: any[]
}

// const columns = [
//   { label: "Name", accessor: "name", sortable: true },
//   { label: "Country", accessor: "country", sortable: true },
//   { label: "GitHub username", accessor: "github_username", sortable: true },
//   { label: "Course price", accessor: "money", sortable: true },
// ];

const Table: React.FC<PropsType> = ({caption, data, columns}) => {
    const [tableData, handleSorting] = useSortingTable(data ?? [], columns ?? [])

    return (
        <>
            <table>
                <caption>{caption}</caption>
                <TableHead columns={columns ?? []} handleSorting={handleSorting} />
                <TableBody columns={columns ?? []} tableData={tableData as any[]} />
            </table>
        </>
    )
}


export default Table

// interface PropsType {
//     data?: []
//     key?: string
// }

// const HeadTable = ['No','Country','Product','Price (unit)','QTY','Total']

// const Table: React.FC<PropsType> = ({data}) => {
//     const [sortBy, setSortBy] = useState('id')
//     const [sortOrder, setSortOrder] = useState('asc')

//      return (
//         <div>
//         <table className="w-full text-left border-collapse">
//             <caption>NovaTech Sales Data</caption>
//             <thead>
//                 <tr className="border-b-1 p-2 cursor-pointer">
//                     {HeadTable.map( item => (
//                         <th
//                             key={item.toLocaleLowerCase()}
//                             className=""
//                         >{item}</th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {dataSales.slice(0,11).map((item, idx) => (
//                     <tr key={item.id} className="hover:bg-gray-100">
//                         <td>{idx+1}</td>
//                         <td>{item.region}</td>
//                         <td>{item.product}</td>
//                         <td>{item.price_per_unit}</td>
//                         <td>{item.qty}</td>
//                         <td>{item.total_sales}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
//     )
// }