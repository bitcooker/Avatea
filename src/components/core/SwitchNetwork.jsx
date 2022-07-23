import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import networks from "../../network/network.json";
import {useCallback, useEffect} from "react";
import {useWallet} from "@albs1/use-wallet";
import {ethers} from "ethers";

const variants = {
    open: { opacity: 1, zIndex: 60, display: "block" },
    close: { opacity: 0, transitionEnd: {zIndex: -10, display: "none"} }
}

export default function SwitchNetwork(props) {
    const wallet = useWallet();
    const [open, setOpen] = React.useState(false);
  const [currentNetwork, setCurrentNetwork] = React.useState(networks[wallet.chainId] || networks[4]);

  React.useEffect(() => {
    const handleClickOutside = () => {
        setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

    useEffect(() => {
        const network = networks.filter(network => network.chainId === wallet.chainId);
        setCurrentNetwork(network[0]);
    },[wallet,currentNetwork])

    const switchChain = useCallback(async ({chainId,displayName,symbol, currencyName}) => {
        if (wallet.chainId !== chainId) {
            try {
                await wallet.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: ethers.utils.hexValue( chainId)}]
                    });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                    await wallet.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: displayName,
                                chainId: ethers.utils.hexValue( chainId),
                                nativeCurrency: { name: currencyName, decimals: 18, symbol },
                                rpcUrls: ['https://polygon-rpc.com/']
                            }
                        ]
                    });
                }
            }
        }
    },[wallet,currentNetwork])

  return (
    <div
      className="relative bg-indigo-50 hover:bg-indigo-50/50 md:hover:bg-white/50 md:bg-white rounded-full p-4 hover:cursor-pointer transition"
      onClick={() => setOpen(!open)}
    >
        <div className="flex flex-row items-center space-x-2">
            <Image src={`${currentNetwork?.icon}`} alt="network" width={20} height={20} />
            <span className="hidden md-lg:block">{currentNetwork?.displayName}</span>
        </div>
        
        <NetworkDropdown
            open={open}
            switchChain={switchChain}
            currentNetwork={currentNetwork}
            setCurrentNetwork={(network) => {
                setCurrentNetwork(network);
                setOpen(false);
            }}
        />
    </div>
  );
}

export const NetworkDropdown = (props) => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={props.open ? "open" : "close"}
        transition={{ duration: .15 }}
        variants={variants} 
        className="absolute top-14 right-0 md:left-0 flex flex-col w-60 bg-white p-4 rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-base">Select a network</h1>
      <div className="flex flex-col space-y-2">
        {networks.map((network, index) => (
          <NetworkItem
            network={network}
            key={index}
            currentNetwork={props.currentNetwork}
            handleClick={props.switchChain}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const NetworkItem = (props) => {
  return (
    <div
      className="flex flex-row items-center justify-between p-2 rounded-md hover:cursor-pointer hover:bg-gray-100"
      onClick={() => props.handleClick(props.network)}
    >
      <div className="flex flex-row gap-2">
        <Image
          src={props.network.icon}
          alt="network_item"
          width={20}
          height={20}
        />
        <span>{props.network.displayName}</span>
      </div>
      {props.currentNetwork?.networkName == props.network?.networkName && (
        <div className="state w-2.5 h-2.5 rounded-full bg-green-500"></div>
      )}
    </div>
  );
};
