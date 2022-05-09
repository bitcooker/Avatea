import React from "react";
import { UseWalletProvider } from 'use-wallet';
import {Slide, ToastContainer} from "react-toastify";
import Head from 'next/head'

export default function Layout({ children }) {

    return (
        <>
            <Head>
                <title>Avatea Base Demo</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <UseWalletProvider
                chainId={56}
                autoConnect={false}
                connectors={{
                    injected: {
                        chainId: [1, 4, 56],
                    },
                    walletconnect: {
                        chainId: 56,
                        rpc: {
                            56: 'https://bsc-dataseed.binance.org/',
                            4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
                        },
                    }
                }}
                pollBlockNumberInterval={3000}
                pollBalanceInterval={3000}
            >
                <main className={'bg-light-gray'}>{children}</main>
                <ToastContainer
                    transition={Slide}
                />
            </UseWalletProvider>
        </>
    )
}