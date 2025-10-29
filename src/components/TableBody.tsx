import React from 'react'

interface PropsType {
    tableData?: any[];
    columns: any[];
}

const TableBody: React.FC<PropsType> = ({ columns, tableData }) => {
    return (
        <tbody>
            {tableData?.slice(0, 11).map((data, idx) => {
                return (
                    <tr key={data.id}>
                        <td>{idx + 1}</td>
                        {columns.filter(({ key }) => key !== 'number').map(({ key, idx }) => {
                            const tData = data[key] ? data[key] : '——'
                            return <td key={key}>{tData}</td>
                        })}

                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody