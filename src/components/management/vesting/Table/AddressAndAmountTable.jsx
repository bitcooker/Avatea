import * as React from "react";
import {useRouter} from "next/router";

// core components
import TableRow from "../../../core/table/TableRow";
import TableCol from "../../../core/table/TableCol";
import {TableActionEditButton} from "../../../core/table/TableActionButtons";


export default function VestingTable(props) {
    return (
        <div className="table flex flex-col w-full h-full">
            <div className="table-header grid grid-cols-3 md-lg:grid-cols-12 px-2 mb-5 w-full">
                <TableCol className="flex flex-row items-center col-span-2 md-lg:col-span-10 hover:cursor-pointer">
                    {/*<Checkbox />*/}
                    <div className="flex flex-row items-center space-x-1">
                        <h1 className="text-base">Address</h1>
                        <i className="fa-solid fa-chevron-down"/>
                    </div>
                </TableCol>
                <TableCol className="flex flex-row items-center space-x-1 col-span-1 md-lg:col-span-2 hover:cursor-pointer">
                    <h1 className="truncate text-base">Total amount vested</h1>
                    <i className="fa-solid fa-chevron-down"/>
                </TableCol>
            </div>
            <div className="table-body flex flex-col">
                {props.vestings.map((vesting, index) => (
                    <TableRow key={index}>
                        <TableCol className="flex flex-row items-center col-span-2 md-lg:col-span-10">
                            {/*<Checkbox />*/}
                            <span className="truncate text-base font-medium">{vesting.address}</span>
                        </TableCol>
                        <TableCol className="flex flex-row items-center col-span-1 md-lg:col-span-2">
                            <span className="truncate text-base font-medium">{vesting.amount}</span>
                        </TableCol>
                    </TableRow>
                ))}
            </div>
        </div>
    );
}