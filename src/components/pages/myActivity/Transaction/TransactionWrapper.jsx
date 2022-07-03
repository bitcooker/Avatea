import React, {useEffect, useState} from "react";
import TransactionItem from "./TransactionItem";
import { ActModul } from "./ActModul";
import {useWallet} from "use-wallet";
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

    console.log(transactions);

    return (
    <div className="act">
        <h2>Transactions</h2>
        <div className="act__inner h-100">

            {
              transactions ? transactions?.map((transaction) => {
                  return <TransactionItem key={transaction.id} {...transaction} />;
              }) : <div className={'flex items-center justify-center'}>
                  <Spinner size={10}/>
              </div>
          }
        {}
      </div>
    </div>
  );
}
