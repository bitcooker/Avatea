import * as React from "react";
import Image from "next/image";
import {useWallet} from "use-wallet";
import {useEffect} from "react";

export default function WalletConnect(props) {
    const wallet = useWallet();

    useEffect(() => {
        if(wallet.status === "connected") props.handleClose()
    },[wallet])
    return <div
                className={
                    props.open
                        ? "fixed z-50 w-[100vw] h-[100vh] top-0 left-0 bg-black/20 backdrop-blur-[1px] px-5 md-lg:px-60 overflow-y-auto md-lg:overflow-y-hidden transition"
                        : "fixed -z-50 w-[100vw] md-lg:h-[100vh] top-0 left-0 bg-black/20 backdrop-blur-[1px] px-40 opacity-0"
                    }
                onClick={props.handleClose}
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[480px] bg-white rounded-2.5xl px-5" onClick={(e) => e.stopPropagation()}>
                        <div className="connect-header flex flex-row justify-between items-center py-5">
                            <h1 className="text-xl">Connect a wallet</h1>
                            <div
                                className="p-3 rounded-full hover:cursor-pointer hover:bg-gray-200 transition"
                                onClick={props.handleClose}
                            >
                                <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M15 1L1 15M15 15L1 1L15 15Z"
                                    stroke="#00204C"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </svg>
                            </div>
                        </div>
                        <div className="connect-content flex flex-col space-y-2.5">
                            <div className="flex flex-row items-center justify-between border border-gray-300 bg-gray-300/50 rounded-xl p-5 hover:border-indigo-500/50 hover:cursor-pointer" onClick={() => wallet.connect('injected')}>
                                <p className="text-base">MetaMask</p>
                                <Image src="https://app.uniswap.org/static/media/metamask.02e3ec27.png" alt="metamask" width={24} height={24}/>
                            </div>
                            <div className="flex flex-row items-center justify-between border border-gray-300 bg-gray-300/50 rounded-xl p-5 hover:border-indigo-500/50 hover:cursor-pointer"  onClick={() => wallet.connect('walletconnect')}>
                                <p className="text-base">WalletConnect</p>
                                <Image src="https://app.uniswap.org/static/media/walletConnectIcon.304e3277.svg" alt="metamask" width={24} height={24}/>
                            </div>
                            <div className="flex flex-row items-center justify-between border border-gray-300 bg-gray-300/50 rounded-xl p-5 hover:border-indigo-500/50 hover:cursor-pointer">
                                <p className="text-base">Coinbase Wallet</p>
                                <Image src="https://app.uniswap.org/static/media/coinbaseWalletIcon.a3a7d7fd.svg" alt="metamask" width={24} height={24}/>
                            </div>
                            <div className="flex flex-row items-center justify-between border border-gray-300 bg-gray-300/50 rounded-xl p-5 hover:border-indigo-500/50 hover:cursor-pointer">
                                <p className="text-base">Fortmatic</p>
                                <Image src="data:image/png;base64,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" alt="metamask" width={24} height={24}/>
                            </div>
                        </div>
                        <div className="connect-footer text-sm p-5 my-5 border border-gray-200 bg-gray-300/10 rounded-xl break-words">
                            By connecting a wallet, you agree to Avatea Labs’ <span className="text-pink-500 underline hover:cursor-pointer">Terms of Service</span> and acknowledge that you have read and understand the Avatea <span className="text-pink-500 underline hover:cursor-pointer">Protocol Disclaimer</span>
                        </div>
                    </div>
                </div>
            </div>
}