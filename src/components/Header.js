import {useCallback, useEffect, useState} from "react";
import useLocalStorage from "use-local-storage";
import { useWallet } from "use-wallet";
import Image from "next/image";
import {ethers} from "ethers";
import hashicon from "hashicon";

import helpers from "../helpers";
import networks from "./../network/network.json";

// core components
import WalletConnect from "./core/WalletConnect";
import SwitchNetwork from "./core/SwitchNetwork";

export default function Header({ menu, setMenu, title }) {
  const wallet = useWallet();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isRegistered,setIsRegistered] = useLocalStorage('isRegistered', false);
  const [modalOpen, setModalOpen] = useState(false);
    const [currentNetwork, setCurrentNetwork] = useState(networks[wallet.chainId] || networks[4]);

    useEffect(() => {
        const network = networks.filter(network => network.chainId === wallet.chainId);
        setCurrentNetwork(network[0]);
    },[wallet,currentNetwork])
  //@TODO Optimize Register not to fire every time
  useEffect(() => {
    if (wallet.isConnected() && !isRegistered) {
      const initWallet = async () => {
        await helpers.user.registerUser(wallet,setIsRegistered,setUnreadMessages);
      };
      initWallet();
    } else if(wallet.status === "disconnected") {
        setIsRegistered(false);
    }
  }, [wallet.status,isRegistered]);

  const shortenAddress = useCallback((address) => {
    return address != null
      ? `${address.slice(0, 6)}...${address.slice(
          address.length - 4,
          address.length
        )}`
      : "";
  },[]);

  return (
    <header className="relative pt-5 pb-[3%] md:pb-[95px] md-lg:static md-lg:py-7.5">
      <div className="flex items-center justify-between">
        <div
          className="text-2xl text-blue-500 lg-xl:hidden hover:cursor-pointer hover:text-blue-500/30 transition"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <i className="fa-light fa-bars-staggered" />
        </div>
        <h1 className="hidden lg-xl:block lg-xl:text-2xl">{title}</h1>
        <div className="flex items-center">
            <div className={'relative mr-5 '}>
                <span className="flex h-5 w-5 absolute -top-2 -right-2.5 z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                <span className="flex absolute -top-[0.45rem] -right-[0.1rem] text-white text-xs z-20">
                    {unreadMessages}
                </span>
                <i className="relative fa-light fa-envelope text-2xl hover:cursor-pointer z-0" />

            </div>
                <div className="mr-2.5">
            <SwitchNetwork />
          </div>
          {wallet.status === "connected" ? (
            <div className="flex flex-row items-center bg-white p-1 rounded-4xl">
              <div className="hidden sm:flex sm:items-center px-2">
                <span className="mr-1">{Number(ethers.utils.formatEther(wallet.balance)).toFixed(4)}</span>
                <img src={currentNetwork.icon} alt="netImage" width={20} height={20}/>
              </div>
              <button
                className="flex justify-center box-border items-center px-7.5 py-3 bg-indigo-500 text-white rounded-4xl hover:cursor-pointer hover:bg-indigo-500/80 transition"
                onClick={() => wallet.reset()}
              >
                <span className="text-base mr-2">
                  {shortenAddress(wallet.account)}
                </span>
                <Image
                  src={hashicon(
                    wallet.account == null ? "" : wallet.account
                  ).toDataURL()}
                  alt="hashicon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          ) : (
            <div className="bg-white p-1 rounded-4xl">
              <button
                className="flex justify-center items-center px-7.5 py-3 bg-indigo-500 text-white rounded-4xl hover:cursor-pointer hover:bg-indigo-500/80 transition"
                onClick={() => setModalOpen(!modalOpen)}
              >
                <span className="text-base">Connect with wallet</span>
              </button>
            </div>
          )}
          <WalletConnect open={modalOpen} handleClose={() => setModalOpen(false)}/>
        </div>
      </div>
    </header>
  );
}
