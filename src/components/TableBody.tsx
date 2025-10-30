import { format } from 'date-fns';
import React from 'react'
import formatRupiah from '../utility/formatRupiah';

interface PropsType {
    tableData?: any[];
    columns: any[];
}

const TableBody: React.FC<PropsType> = ({ columns, tableData }) => {
    return (
        <tbody>
            {tableData?.map((data, idx) => {
                return (
                    <tr className={`${idx % 2 === 0 ? '' : 'bg-indigo-50'} text-gray-600`} key={data.id}>
                        <td className='text-center'>{idx + 1}</td>
                        {columns.filter(({ key }) => key !== 'number').map(({ key }) => {
                            const tData = data[key] ? data[key] : '——'

                            if (key === 'date') {
                                return <td key={key} className='p-2'>{tData !== '——' ? format(tData, 'dd MMM yy') : '——'}</td>
                            } else if (key === 'price_per_unit' || key === 'total_sales') {
                                return <td key={key} className='p-2'>{formatRupiah(tData)}</td>
                            } else {
                                return <td key={key} className='p-2'>{tData}</td>
                            }
                        })}

                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody