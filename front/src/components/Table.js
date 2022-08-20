import React from "react";
import { useTable, useGlobalFilter } from "react-table";

const Table = ({ rows, data }) => {
    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        columns,
        preprareColumn,
        setGlobalFilter, 
    } = useTable({ rows, data }, useGlobalFilter);

    return (
        <body>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <td {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((row) => (
                                <th {...row.getHeaderProps(row.getSortByToggleProps())}>
                                    {row.render("Header")}
                                </th>
                            ))}
                        </td>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {columns.map((column) => {
                        preprareColumn(column);
                        return (
                            <td {...column.getColumnProps()}>
                                {column.cells.map((cell)=> (
                                    <tr {...cell.getCellProps()}>{cell.render("Cell")}</tr>
                                ))}
                            </td>

                        );
                    })}
                </tbody>
            </table>
        </body>
    )
};

export default Table;

