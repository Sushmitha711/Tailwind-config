import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const markdownTable = `| | Monthly | Weekly | Daily | Hourly |
| --- | --- | --- | --- | --- |
| ZeroModel | 2.045 | 6.075 | 2.989 | 10.255 |`;

const MarkdownTableRenderer = ({ markdownTable }) => {
    // Splitting the markdown table into rows
    const rows = markdownTable.split('\n').map(row => row.trim());

    // Processing the rows to extract header and data cells
    const headerRow = rows[0].split('|').filter(cell => cell.trim() !== '');
    const dataRows = rows.slice(2).map(row => row.split('|').map(cell => cell.trim()));

    return (
        <div>
            <h2>Markdown Table</h2>
            <Table removeWrapper aria-label="Markdown Table">
                <TableHeader>
                    {headerRow.map((cell, index) => <TableColumn key={index}>{cell.trim()}</TableColumn>)}
                </TableHeader>
                <TableBody>
                    {dataRows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headerRow.map((_, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    {row[cellIndex] ? row[cellIndex] : ''}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default function App() {
    return (
        <MarkdownTableRenderer markdownTable={markdownTable} />
    );
}
