import { useWallet } from "use-wallet";
import helpers from "../helpers";
import { useEffect } from "react";

import SwitchNetwork from "../components/core/SwitchNetwork";

export default function Header({ menu, setMenu, title }) {
  const wallet = useWallet();

  //@TODO Optimize Register not to fire every time
  useEffect(() => {
    if (wallet.isConnected()) {
      const initWallet = async () => {
        await helpers.user.registerUser(wallet);
      };
      initWallet();
    }
  }, [wallet]);

  const shortenAddress = (address) => {
    return address != null
      ? `${address.slice(0, 6)}...${address.slice(
          address.length - 4,
          address.length
        )}`
      : "";
  };

  return (
    <header className="relative pt-5 pb-[95px] md-lg:static md-lg:py-7.5">
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
          <form className="absolute bottom-5 left-0 w-full md-lg:static md-lg:w-75 md-lg:mr-6.25">
            <div className="relative w-full">
              <input
                className="w-full text-base text-black bg-white shadow-[0_6px_12px_rgba(155,0,231,0.1)] rounded-full py-4 px-12"
                type="text"
                placeholder="Search"
              />
              <div className="absolute left-5 top-5 hover:cursor-pointer">
                <i className="fa-regular fa-magnifying-glass text-lg"></i>
              </div>
            </div>
          </form>
          <i className="relative fa-light fa-bell text-2xl mr-6.25 hover:cursor-pointer after:content-[''] after:w-2 after:h-2 after:absolute after:right-0 after:rounded-full after:bg-rose-500 after:hover:ring-2 after:hover:ring-rose-500/30 transition" />
          <div className="mr-6.25">
            <SwitchNetwork />
          </div>
          {wallet.status === "connected" ? (
            <button
              className="flex justify-center box-border items-center px-7.5 py-4 bg-indigo-500 text-white rounded-full hover:cursor-pointer hover:bg-indigo-500 transition"
              onClick={() => wallet.reset()}
            >
              <span className="text-indigo-300">
                {wallet.balance + "ETH " + shortenAddress(wallet.account)}
              </span>
              &nbsp; Disconnect
            </button>
          ) : (
            <button
              className="flex justify-center items-center px-7.5 py-4 bg-indigo-500 text-white rounded-full hover:cursor-pointer hover:bg-indigo-500 hover: transition"
              onClick={() => wallet.connect("injected")}
            >
              Connect with wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
