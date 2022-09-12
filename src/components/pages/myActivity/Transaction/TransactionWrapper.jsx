import React, {useEffect, useState, useCallback} from "react";
import {useWallet} from "@albs1/use-wallet";

// core components
import Spinner from "../../../core/Spinner";

// page components
import TransactionItem from "./TransactionItem";
import { ActModul } from "./ActModul";
import helpers from "../../../../helpers";
import user from "../../../../helpers/user";

export default function TransactionWrapper( { userAddress,projectSlug }) {
    const wallet = useWallet();
    const [transactions,setTransactions] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handleNext = useCallback(() => {
        if(currentPage < totalPages - 1) setCurrentPage((page) => page + 1);
    }, [currentPage, totalPages])

    const handlePrev = useCallback(() => {
        if(currentPage > 0) setCurrentPage((page) => page - 1);
    }, [currentPage])

    useEffect(() => {
        if(wallet.status === "connected") {
             const initiateWallet = async() => {
                 if (userAddress && projectSlug) {
                     const result = await helpers.transactions.getTransactions({
                         userAddress,
                         project: projectSlug
                     })
                     setTransactions(result)
                     setTotalPages(result.length / 10 + 1)
                     setTotal(result.length);
                 }
                 else {
                     const result = await helpers.transactions.getTransactions({
                         userAddress: wallet.account
                     })
                     setTransactions(result)
                     setTotalPages(Math.floor(result.length / 10 + 1))
                     setTotal(result.length);
                 }
            }
            const timeout = setTimeout(() => {
                initiateWallet()
            },2000);
             return () => {
                 clearTimeout(timeout)
             }
        }
    },[projectSlug, userAddress, wallet])

    return (
    <div className="grow p-5 rounded-2.5xl bg-white">
        <h2 className="text-2xl">Transactions</h2>
        <div className="w-full py-5 overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-300 divide-y">
        {
            transactions ? transactions?.slice(10 * currentPage, 10 * (currentPage + 1)).map((transaction) => {
                return <TransactionItem key={transaction.id} {...transaction} />;
            }) : <div className={'flex h-full items-center justify-center'}>
                <Spinner size={5}/>
            </div>
        }
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-1 py-3 sm:px-2">
            <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing 
                        <span className="font-medium"> {currentPage * 10 + 1} </span>
                        to 
                        <span className="font-medium"> {(currentPage + 1) === totalPages ? total : (currentPage + 1) * 10} </span>
                        of 
                        <span className="font-medium"> {total} </span>
                        transactions
                    </p>
                </div>
                <div>
                <nav className="isolate inline-flex rounded-md shadow-sm" aria-label="Pagination">
                    <a className="relative inline-flex items-center rounded-l-md border bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer hover:border-indigo-500 transition" onClick={handlePrev}>
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a aria-current="page" className="relative z-10 inline-flex items-center border-y bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">{(currentPage + 1) + " / " + totalPages}</a>
                    <a className="relative inline-flex items-center rounded-r-md border bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer hover:border-indigo-500 transition" onClick={handleNext}>
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </a>
                </nav>
                </div>
            </div>
        </div>
    </div>
  );
}
