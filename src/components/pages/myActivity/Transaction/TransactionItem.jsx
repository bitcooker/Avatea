import React from "react";
import Image from "next/image";
import moment from 'moment';

import TableCol from "../../../core/table/TableCol";

const bgColors = {
    "MMVD": "bg-sky-500",
    "MMVR": "bg-orange-500",
    "MMCD": "bg-lime-500",
    "VW": "bg-orange-300",
    "MMPW": "bg-blue-500",
    "VR": "bg-teal-500",
    "LML": "bg-violet-500",
    "LMW": "bg-rose-500",
    "MMBR": "bg-fuchsia-500",
    "VA": "bg-pink-500",
    "MMBD": "bg-emerald-500",
    "MMAS": "bg-amber-500",
    "MMBW": "bg-purple-500",
    "MMPD": "bg-stone-500"
}

const textColors = {
    "MMVD": "text-sky-500",
    "MMVR": "text-orange-500",
    "MMCD": "text-lime-500",
    "VW": "text-orange-300",
    "MMPW": "text-blue-500",
    "VR": "text-teal-500",
    "LML": "text-violet-500",
    "LMW": "text-rose-500",
    "MMBR": "text-fuchsia-500",
    "VA": "text-pink-500",
    "MMBD": "text-emerald-500",
    "MMAS": "text-amber-500",
    "MMBW": "text-purple-500",
    "MMPD": "text-stone-500"
}

const borderColors = {
    "MMVD": "border-sky-500/50",
    "MMVR": "border-orange-500/50",
    "MMCD": "border-lime-500/50",
    "VW": "border-orange-300/50",
    "MMPW": "border-blue-500/50",
    "VR": "border-teal-500/50",
    "LML": "border-violet-500/50",
    "LMW": "border-rose-500/50",
    "MMBR": "border-fuchsia-500/50",
    "VA": "border-pink-500/50",
    "MMBD": "border-emerald-500/50",
    "MMAS": "border-amber-500/50",
    "MMBW": "border-purple-500/50",
    "MMPD": "border-stone-500/50"
}

const hoverBorderColors = {
    "MMVD": "hover:border-sky-500",
    "MMVR": "hover:border-orange-500",
    "MMCD": "hover:border-lime-500",
    "VW": "hover:border-orange-300",
    "MMPW": "hover:border-blue-500",
    "VR": "hover:border-teal-500",
    "LML": "hover:border-violet-500",
    "LMW": "hover:border-rose-500",
    "MMBR": "hover:border-fuchsia-500",
    "VA": "hover:border-pink-500",
    "MMBD": "hover:border-emerald-500",
    "MMAS": "hover:border-amber-500",
    "MMBW": "hover:border-purple-500",
    "MMPD": "hover:border-stone-500"
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
