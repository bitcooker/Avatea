import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import helper from "../helpers/";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";

import Button from "../components/core/Button/Button";

const menus = [
  {
    label: "Home",
    href: "/",
    icon: "fa-solid fa-home-user",
  },
  {
    label: "My Activity",
    href: "/activity",
    icon: "fa-solid fa-chart-area",
  },
  {
    label: "Vault List",
    href: "/projects",
    icon: "fa-solid fa-diagram-project",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "fa-solid fa-gears",
  },
  {
    label: "Logout",
    href: "/logout",
    icon: "fa-solid fa-right-from-bracket",
  },
];

export default function Sidebar({ menu, setMenu }) {
  const wallet = useWallet();
  const [claimableDividend, setClaimableDividend] = useState(0);

  useEffect(() => {
    if (wallet.isConnected()) {
      const fetchClaimableDividend = async () => {
        const result = await helper.avateaToken.getClaimableAmount(
          wallet,
          wallet.account
        );
        setClaimableDividend(ethers.utils.formatEther(result));
      };
      fetchClaimableDividend();
    }
  }, [wallet]);

  const claimDividend = async () => {
    if (wallet.isConnected()) {
      await helper.avateaToken.claim(wallet);
    } else {
      alert("Wallet is not connected");
    }
  };

  return (
    <div
      className={
        "fixed w-[100vw] h-[100vh] bg-black/30 top-0 left-0 z-50 lg-xl:rounded-r-2.5xl transition bg-white lg-xl:translate-x-0 lg-xl:w-50 xl-2xl:w-66.25 " +
        (menu ? "translate-x-0" : "-translate-x-full")
      }
      onClick={() => setMenu(false)}
    >
      <div className="px-3.75 max-w-66.25 bg-white rounded-r-2.5xl h-[100vh]">
        <div className="flex items-center justify-start px-3.75">
          <Image src={"/logo.svg"} alt="logo" width={126} height="100%" />
        </div>
        <nav
          className="relative flex flex-col justify-between"
          style={{ height: "calc(100% - 105px)" }}
        >
          <div className="flex flex-col">
            {menus.map((menu, index) => (
              <MenuItem
                href={menu.href}
                label={menu.label}
                icon={menu.icon}
                key={index}
              />
            ))}
          </div>
          <div className="pt-7.5 pb-8">
            <div className="relative w-100 mx-auto max-w-42.5 px-5 pb-5 box-border rounded-2xl before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-2xl before:bg-gradient-to-t before:from-indigo-500 after:absolute after:content-[''] after:top-0.5 after:left-0.5 after:w-[98%] after:h-[98%] after:rounded-2xl after:bg-slate-100">
              <div className="relative z-10">
                <div className="flex items-center w-20 mx-auto -mb-5">
                  <img
                    src={"/shapes/shapePlan.svg"}
                    alt="plan"
                    className="relative w-full -top-7.5"
                  />
                </div>

                <div className="mb-5 font-medium text-base text-center tracking-wider">
                  Claimable Dividend <br />
                  &nbsp;
                  {wallet.isConnected() ? (
                    <p>{claimableDividend}</p>
                  ) : (
                    "Connect your wallet"
                  )}
                </div>
                <Button
                  handleClick={() => claimDividend()}
                  name="
                  Claim Dividend"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export const MenuItem = (props) => {
  const router = useRouter();

  return (
    <Link href={props.href}>
      <a
        className={`link flex items-center font-medium text-base rounded-4xl transition p-3.75 hover:cursor-pointer ${
          router.asPath == props.href
            ? "bg-indigo-500 text-white"
            : router.asPath.indexOf(props.href) == 0 && props.href != "/"
            ? "bg-indigo-500 text-white"
            : "bg-white text-black"
        }`}
      >
        <i className={props.icon + " mr-1"} />
        {props.label}
      </a>
    </Link>
  );
};
