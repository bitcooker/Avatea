import * as React from "react";
import hashicon from "hashicon";
import Image from "next/image";
import moment from "moment";

// core components
import TableRow from "../../../core/table/TableRow";
import TableCol from "../../../core/table/TableCol";


export default function AddressAndAmountAndTimeTable(props) {

    return (
        <div className="flex flex-col w-full h-full">
            <div className="table-header grid grid-cols-12 px-2 mb-5 w-full">
                <TableCol className="flex flex-row items-center col-span-5 md-lg:col-span-5 hover:cursor-pointer">
                    {/*<Checkbox />*/}
                    <div className="flex flex-row items-center space-x-1">
                        <h1 className="hidden md-lg:block text-base">Address</h1>
                        <h1 className="block md-lg:hidden text-base"><i className="fa-solid fa-at" /></h1>
                        {/*<i className="fa-solid fa-chevron-down"/>*/}
                    </div>
                </TableCol>
                <TableCol className="flex flex-row items-center space-x-1 col-span-5 md-lg:col-span-3 hover:cursor-pointer">
                        <h1 className="hidden md-lg:block text-base">Amount Sent</h1>
                        <h1 className="block md-lg:hidden text-base"><i className="fa-solid fa-coins" /></h1>
                    {/*<i className="fa-solid fa-chevron-down"/>*/}
                </TableCol>
                <TableCol className="hidden md-lg:flex flex-row items-center space-x-1 col-span-1 md-lg:col-span-3 hover:cursor-pointer">
                    <h1 className="truncate text-base">Time Stamp</h1>
                    {/*<i className="fa-solid fa-chevron-down"/>*/}
                </TableCol>
                <TableCol className="flex flex-row items-center justify-center space-x-1 col-span-2 md-lg:col-span-1 hover:cursor-pointer">
                        <h1 className="hidden md-lg:block text-base">Transaction</h1>
                        <h1 className="block md-lg:hidden text-base"><i className="fa-solid fa-paper-plane" /></h1>
                    {/*<i className="fa-solid fa-chevron-down"/>*/}
                </TableCol>
            </div>
            <div className="table-body flex flex-col">
                {props.transactions.map((transaction, index) => (
                    <TableRow key={index}>
                        <TableCol className="flex flex-row items-center col-span-5 md-lg:col-span-5">
                            <Image
                                src={hashicon(
                                    transaction.user_address
                                ).toDataURL()}
                                alt="hashicon"
                                width={20}
                                height={20}
                            />
                            <span className="ml-2 truncate text-base font-medium"> {transaction.user_address}</span>
                        </TableCol>
                        <TableCol className="flex flex-row items-center col-span-5 md-lg:col-span-3">
                            <Image src={props.tokenImage} width={20} height={20} alt="Token"/>
                            <span className=" ml-2 truncate text-base font-medium">
                               {transaction.amount}</span>
                        </TableCol>
                        <TableCol className="hidden md-lg:flex flex-row items-center col-span-1 md-lg:col-span-3">
                            <span className=" ml-2 truncate text-base font-medium">
                                {moment(transaction.timestamp).format("llll")}</span>
                        </TableCol>
                        <TableCol className="col-span-2 md-lg:col-span-1 flex items-center justify-center">
                            <a target={'_blank'} href={`https://rinkeby.etherscan.io/tx/${transaction.hash}`} rel={'noreferrer'}>
                                <div
                                    className={`flex items-center justify-center w-6 h-6 pt-[1.5px] rounded-md border border-slate-600/50 hover:border-slate-600`}>
                                    <i className={`fa-solid fa-eye fa-xs text-slate-600`}/>
                                </div>
                            </a>
                        </TableCol>
                    </TableRow>
                ))}
            </div>
        </div>
    );
}