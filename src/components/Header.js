import {useCallback, useEffect, useState} from "react";
import useLocalStorage from "use-local-storage";
import { useWallet } from "@albs1/use-wallet";
import Image from "next/image";
import {ethers} from "ethers";
import hashicon from "hashicon";
import Hamburger from "hamburger-react"

import helpers from "../helpers";
import networks from "./../network/network.json";

// core components
import WalletConnect from "./core/WalletConnect";
import SwitchNetwork from "./core/SwitchNetwork";
import {useRouter} from "next/router";

// context
import { usePageTitleContext } from "../context/PageTitleContext";
import {useAdminContext} from "../context/AdminContext";
import Button from "./core/Button/Button";

export default function Header({ menu, setMenu }) {
  const wallet = useWallet();
  const router = useRouter();
  const { title } = usePageTitleContext();
  const { setIsAdmin } = useAdminContext();
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
    // if (wallet.isConnected() && !isRegistered) {
    if (wallet.isConnected()) {
      const initWallet = async () => {
          await helpers.user.registerUser(wallet,setIsRegistered,setUnreadMessages, setIsAdmin);
      }
      initWallet();
      const pollingMessage = setInterval(initWallet,10000);
      return () => {
          clearInterval(pollingMessage);
      }
    } else if(wallet.status === "disconnected") {
        setIsRegistered(false);
        setIsAdmin(false);

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
    <header className="fixed top-0 left-0 px-1 py-3 w-full z-[60] bg-white/95 shadow-xl md:shadow-none md:relative md:bg-transparent md:px-0 md:pb-[30px] md-lg:py-7.5">
      <div className="flex items-center justify-between">
        <div className="flex gap-5 lg-xl:hidden">
            <Hamburger toggled={menu} toggle={setMenu} size={20} />
            {/* Avatea logo */}
            <div className="flex items-center md-lg:hidden">
                <Image src="/logo.svg" alt="logo" width={100} height={22} />
            </div>
        </div>

        {/* title */}
        <h1 className="hidden lg-xl:block lg-xl:text-2xl">{title}</h1>
        <div className="flex items-center">
            <div className={`relative mr-5 ${unreadMessages > 0 ? "md-lg:flex " : "hidden"}`} onClick={() => router.push('/inbox')}>
                <span className="flex h-5 w-5 absolute -top-2 -right-2.5 z-10">
                  {/*<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>*/}
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
            <div className="flex flex-row items-center bg-white p-1 rounded-4xl shadow">
              <div className="hidden sm:flex sm:items-center px-2">
                <span className="mr-1">{Number(ethers.utils.formatEther(wallet.balance)).toFixed(4)}</span>
                <Image src={'/avatea-token.png'} alt="netImage" width={20} height={20}/>
              </div>
              <button
                className="flex justify-center box-border items-center px-7.5 py-3 bg-indigo-500 text-white rounded-4xl hover:cursor-pointer hover:bg-indigo-500/80 transition"
                onClick={() => wallet.reset()}
              >
                <span className="hidden md:block text-base mr-2">
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
              <Button
                className="flex justify-center items-center px-7.5 py-3 bg-indigo-500 text-white rounded-4xl hover:cursor-pointer hover:bg-indigo-500/80 transition"
                handleClick={() => setModalOpen(!modalOpen)}
                isLoading={modalOpen}
              >
                  {
                      !modalOpen ? <>
                          <span className="hidden md-lg:inline-block text-base">Connect with wallet</span>
                          <span className="inline-block md-lg:hidden"> Connect </span>
                      </> : <span>Connecting</span>
                  }

              </Button>
            </div>
          )}
          <WalletConnect open={modalOpen} handleClose={() => setModalOpen(false)}/>
        </div>
      </div>
    </header>
  );
}
