import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const HayaTableRender = ({ markdownTable }) => {
    // Extracting header and data rows
    const [headerRow, ...dataRows] = markdownTable.map(row => row.split('|').map(cell => cell.trim()));

    return (
        <div>
            <Table removeWrapper>
                <TableHeader>
                    {headerRow.map((cell, index) => <TableColumn key={index}>{cell}</TableColumn>)}
                </TableHeader>
                <TableBody>
                    {dataRows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default HayaTableRender;
