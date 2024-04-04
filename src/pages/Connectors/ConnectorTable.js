import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { StringLimit, getAllData } from '../../controllers/strapiController';

const ConnectorTable = () => {
    const [Connector, setConnector] = useState(null);
    const [Loader, setLoader] = useState(true);
    const CollectionName = "connectors";
    const theme=localStorage.getItem("Theme");

    useEffect(() => {
        setLoader(true)
        getAllData(CollectionName)
            .then((data) => { 
                setLoader(false); 
                setConnector(data.data) })
            .catch((error) => alert(JSON.stringify(error)))
    }, [])

    console.log("Connector", Connector)

    return (
        <div>
            {Connector && Connector.length > 0 ?
                <Table removeWrapper aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>CONNECTOR NAME</TableColumn>
                        <TableColumn>DESCRIPTION</TableColumn>
                        <TableColumn>CONNECTOR SOURCE</TableColumn>

                        <TableColumn>TAGS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {Connector && Connector.map((data, index) => {
                            return <TableRow key={index + 1}>
                                <TableCell className='flex gap-4'>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/pflszboa.json"
                                        trigger="hover"
                                        colors={`primary:${theme==="dark"?"#ffffff":"#000000"}`}
                                        style={{ width: "16px", height: "16px" }}>
                                    </lord-icon>
                                    {data.attributes.Name}
                                </TableCell>
                                <TableCell> {data.attributes.Description && StringLimit(data.attributes.Description, 100)}</TableCell>
                                <TableCell>{data.attributes.connector_list && data.attributes.connector_list.data !== null ? data.attributes.connector_list.data.attributes.Name : "-"}</TableCell>
                                <TableCell>
                                    {data.attributes.Tags && data.attributes.Tags &&
                                        <>
                                            {Object.keys(data.attributes.Tags).map((objectData) => (
                                                <p>{data.attributes.Tags[objectData]}</p>
                                            ))}
                                        </>
                                    }
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                : "No data"}
        </div>
    )
}

export default ConnectorTable;