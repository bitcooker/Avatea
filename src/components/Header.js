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
        await helpers.user.registerUser(wallet,setIsRegistered);
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
          <i className="relative fa-light fa-bell text-2xl mr-6.25 hover:cursor-pointer after:content-[''] after:w-2 after:h-2 after:absolute after:right-0 after:rounded-full after:bg-rose-500 after:hover:ring-2 after:hover:ring-rose-500/30 after:transition" />
          <div className="mr-2.5 md:mr-6.25">
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
