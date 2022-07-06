import React from "react";
import Image from "next/image";
import moment from 'moment';

import TableRow from "../../../core/table/TableRow";
import TableCol from "../../../core/table/TableCol";

export default function TransactionItem(props) {
  return (
    <div className="grid grid-cols-12 items-center w-full h-19 px-2">
        <TableCol className="col-span-2 p-2">
            <i className="fa-duotone fa-money-bill-transfer text-2xl"/>
        </TableCol>
        <TableCol className="truncate col-span-5 font-medium text-base tracking-[.0125rem]">
            <h1 className="text-base">{props.type}</h1>
            <small className="">{moment(props.timestamp).format('llll')}</small>
        </TableCol>
        <TableCol className="col-span-4 text-center font-medium text-base tracking-[.0125rem] text-rose-500">{props.amount} </TableCol>
        <TableCol className="col-span-1 text-center">
            <a target={'_blank'} href={`https://rinkeby.etherscan.io/tx/${props.hash}`} rel={'noreferrer'}><i className="fa-solid fa-eye"/></a>
        </TableCol>
    </div>
  );
}
