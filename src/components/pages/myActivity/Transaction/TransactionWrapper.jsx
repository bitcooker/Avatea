import React, {useEffect, useState} from "react";
import TransactionItem from "./TransactionItem";
import { ActModul } from "./ActModul";
import {useWallet} from "@albs1/use-wallet";
import helpers from "../../../../helpers";
import Spinner from "../../../core/Spinner";

export default function TransactionWrapper() {

    const wallet = useWallet();
    const [transactions,setTransactions] = useState(null);

    useEffect(() => {
        if(wallet.status === "connected") {
             const initiateWallet = async() => {
                const result = await helpers.transactions.getTransactions({
                    userAddress: wallet.account
                })
                setTransactions(result)
            }
            const timeout = setTimeout(() => {
                initiateWallet()
            },2000);
             return () => {
                 clearTimeout(timeout)
             }
        }
    },[wallet])


    return (
    <div className="grow p-5 rounded-2.5xl bg-white">
        <h2 className="text-2xl">Transactions</h2>
        <div className="w-full py-5 h-[550px] overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-300">
        {
            transactions ? transactions?.map((transaction) => {
                return <TransactionItem key={transaction.id} {...transaction} />;
            }) : <div className={'flex h-full items-center justify-center'}>
                <Spinner size={5}/>
            </div>
        }
      </div>
    </div>
  );
}
