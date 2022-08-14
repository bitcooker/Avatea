import * as React from "react";
import Image from "next/image";
import {useWallet} from "@albs1/use-wallet";
import { motion } from "framer-motion"

const variants = {
    open: { opacity: 1, zIndex: 80, display: "block" },
    close: { opacity: 0, transitionEnd: {zIndex: -10, display: "none"} }
}

export default function WalletConnect(props) {
    const wallet = useWallet();

    React.useEffect(() => {
        if(wallet.status === "connected") props.handleClose()
    },[wallet])

    return <motion.div
                initial={{ opacity: 0 }}
                animate={props.open ? "open" : "close"}
                transition={{ duration: .3 }}
                variants={variants}
                className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-black/20 backdrop-blur-[1px] px-5 md-lg:px-60 overflow-y-auto md-lg:overflow-y-hidden"
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
                                <Image src="https://www.blocknative.com/hubfs/Icons%20and%20Illustrations/metamask%20wallet%20icon.svg" alt="metamask" width={24} height={24}/>
                            </div>
                            <div className="flex flex-row items-center justify-between border border-gray-300 bg-gray-300/50 rounded-xl p-5 hover:border-indigo-500/50 hover:cursor-pointer"  onClick={() => wallet.connect('walletconnect')}>
                                <p className="text-base">WalletConnect</p>
                                <Image src="https://www.blocknative.com/hubfs/Imported%20sitepage%20images/walletconnect-circle-blue.svg" alt="walletconnect" width={24} height={24}/>
                            </div>
                            {/*<div className="flex flex-row items-center justify-between border border-gray-300 bg-gray-300/50 rounded-xl p-5 hover:border-indigo-500/50 hover:cursor-pointer">*/}
                            {/*    <p className="text-base">Coinbase Wallet</p>*/}
                            {/*    <Image src="https://www.blocknative.com/hubfs/Icons%20and%20Illustrations/coinbase%20wallet%20icon.svg" alt="metamask" width={24} height={24}/>*/}
                            {/*</div>*/}
                            {/*<div className="flex flex-row items-center justify-between border border-gray-300 bg-gray-300/50 rounded-xl p-5 hover:border-indigo-500/50 hover:cursor-pointer" onClick={() => wallet.connect('fortmatic')}>*/}
                            {/*    <p className="text-base">Fortmatic</p>*/}
                            {/*    <Image src="https://www.blocknative.com/hubfs/Icons%20and%20Illustrations/fortmatic%20wallet%20icon.svg" alt="formatic" width={24} height={24} />*/}
                            {/*</div>*/}
                            {/*<div className="flex flex-row items-center justify-between border border-gray-300 bg-gray-300/50 rounded-xl p-5 hover:border-indigo-500/50 hover:cursor-pointer" onClick={() => wallet.connect('frame')}>*/}
                            {/*    <p className="text-base">Frame</p>*/}
                            {/*    <Image src="https://www.blocknative.com/hubfs/frame-1.jpeg" alt="frame" width={24} height={24} />*/}
                            {/*</div>*/}
                        </div>
                        <div className="connect-footer text-sm p-5 my-5 border border-gray-200 bg-gray-300/10 rounded-xl break-words">
                            By connecting a wallet, you agree to Avatea Labs’ <span className="text-pink-500 underline hover:cursor-pointer">Terms of Service</span> and acknowledge that you have read and understand the Avatea <span className="text-pink-500 underline hover:cursor-pointer">Protocol Disclaimer</span>
                        </div>
                    </div>
                </div>
            </motion.div>
}