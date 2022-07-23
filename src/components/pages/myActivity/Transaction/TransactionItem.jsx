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

const TRANSACTION_TYPES = {
    'AR': 'Avatea Rewards',
    'VD': 'Vault Deposit',
    'VW': 'Vault Withdrawal',
    'VR': 'Vault Rewards',
    'VE': 'Vault Exit',
    'VA': 'Vault Reward Adding',
    'LMD': 'Liquidity Maker Deposit',
    'LMW': 'Liquidity Maker Withdrawal',
    'LMR': 'Liquidity Maker Rewards',
    'LMC': 'Liquidity Maker Compound',
    'LME': 'Liquidity Maker Exit',
    'LMA': 'Liquidity Maker Reward Adding',
    'LML': 'Liquidity Maker Liquidity Adding',
    'MMBD': 'Market Making Base Deposit',
    'MMPD': 'Market Making Paired Deposit',
    'MMVD': 'Market Making Vesting Deposit',
    'MMVR': 'Market Making Vesting Release',
    'MMRT': 'Market Making Revoke Tokens',
    'MMBW': 'Market Making Base Withdrawal',
    'MMPW': 'Market Making Paired Withdrawal',
    'MMSC': 'Market Making Settings Change',
    'MMCD': 'Market Making Contract Deployment',
    'MMAS': 'Market Making Allow Selling',
    'MMAR': 'Market Making Allow Releasing',
    'MMBR': 'Market Making Base Staking Ratio',
    'MMPR': 'Market Making Paired Staking Ratio',
}
export default function TransactionItem(props) {
  return (
    <div className="grid grid-cols-12 items-center w-full p-2">
        <TableCol className="truncate col-span-7 font-medium text-base tracking-[.0125rem]">
            <div>
                <div className={`inline-block px-2 py-1 ${bgColors[props.type]} rounded-full text-white`}>
                    <p className="hidden sm:block text-base leading-none">{TRANSACTION_TYPES[props.type]}</p>
                    <p className="sm:hidden text-base leading-none">{props.type}</p>

                </div>
            </div>
            <small>{moment(props.timestamp).format('llll')}</small>
        </TableCol>
        <TableCol className="col-span-4 font-medium text-base tracking-[.0125rem] text-white">
            <div className={`text-slate-600 text-sm`}>
                {props.amount > 0 ? props.amount : ""}
            </div>
        </TableCol>
        <TableCol className="col-span-1 flex items-center justify-center">
            <a target={'_blank'} href={`https://rinkeby.etherscan.io/tx/${props.hash}`} rel={'noreferrer'}>
                <div className={`flex items-center justify-center w-6 h-6 pt-[1.5px] rounded-md border border-slate-600/50 hover:border-slate-600`}>
                    <i className={`fa-solid fa-eye fa-xs text-slate-600`}/>
                </div>
            </a>
        </TableCol>
    </div>
  );
}
