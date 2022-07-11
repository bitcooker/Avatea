import React from "react";
import Image from "next/image";
import moment from 'moment';

import TableCol from "../../../core/table/TableCol";

const bgColors = {
    "MMVD": "bg-sky-500",
    "MMVR": "bg-orange-500",
    "MMCD": "bg-lime-500"
}

const textColors = {
    "MMVD": "text-sky-500",
    "MMVR": "text-orange-500",
    "MMCD": "text-lime-500"
}

const borderColors = {
    "MMVD": "border-sky-500/50",
    "MMVR": "border-orange-500/50",
    "MMCD": "border-lime-500/50"
}

const hoverBorderColors = {
    "MMVD": "hover:border-sky-500",
    "MMVR": "hover:border-orange-500",
    "MMCD": "hover:border-lime-500"
}

export default function TransactionItem(props) {
  return (
    <div className="grid grid-cols-12 items-center w-full p-2">
        <TableCol className="flex items-center justify-center col-span-2 p-2">
            <i className="fa-duotone fa-money-bill-transfer text-2xl"/>
        </TableCol>
        <TableCol className="truncate col-span-5 font-medium text-base tracking-[.0125rem]">
            <div>
                <div className={`inline-block px-2 py-1 ${bgColors[props.type]} rounded-full text-white`}>
                    <h1 className="text-base leading-none">{props.type}</h1>
                </div>
            </div>
            <small className="leading-none">{moment(props.timestamp).format('llll')}</small>
        </TableCol>
        <TableCol className="col-span-4 text-center font-medium text-base tracking-[.0125rem] text-white">
            <div className={`${textColors[props.type]} text-sm`}>
                {props.amount}
            </div>
        </TableCol>
        <TableCol className="col-span-1 flex items-center justify-center">
            <a target={'_blank'} href={`https://rinkeby.etherscan.io/tx/${props.hash}`} rel={'noreferrer'}>
                <div className={`flex items-center justify-center w-6 h-6 pt-[1.5px] rounded-md border ${borderColors[props.type]} ${hoverBorderColors[props.type]}`}>
                    <i className={`fa-solid fa-eye fa-xs ${textColors[props.type]}`}/>
                </div>
            </a>
        </TableCol>
    </div>
  );
}
