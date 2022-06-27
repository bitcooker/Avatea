import React from "react";
import { UseWalletProvider } from "use-wallet";
import { Slide, ToastContainer } from "react-toastify";
import Head from "next/head";
import Header from "./Header";
import dynamic from "next/dynamic";
import { useState } from "react";
import Script from "next/script";
import Sidebar from "./Sidebar";
const SidebarWithNoSSR = dynamic(() => import("./Sidebar"), { ssr: false });

export default function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const [title, setTitle] = useState("Home");

  return (
    <>
      <Script src="https://kit.fontawesome.com/92468525cf.js"></Script>
      <Head>
        <title>Avatea Base Demo</title>
      </Head>
      <UseWalletProvider
        autoConnect={true}
        connectors={{
          injected: {
            chainId: [1, 4, 56],
          },
          walletconnect: {
            chainId: [1, 4, 56],
            rpc: {
              1: "https://rpc.ankr.com/eth",
              4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
              56: "https://bsc-dataseed.binance.org/",
            },
          },
        }}
        pollBlockNumberInterval={3000}
        pollBalanceInterval={3000}
      >
        <Sidebar menu={menu} setMenu={setMenu} setTitle={setTitle} />
        <main>
          <div className="px-[15px] lg-xl:px-5 lg-xl:pl-[220px] xl-2xl:pr-5 xl-2xl:pl-[295px]">
            <Header menu={menu} setMenu={setMenu} title={title} />
            {children}
            <ToastContainer
              transition={Slide}
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </main>
      </UseWalletProvider>
    </>
  );
}
