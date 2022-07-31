import React from "react";
import { UseWalletProvider } from "@albs1/use-wallet";
import { Slide, ToastContainer } from "react-toastify";
import Script from "next/script";
import Head from "next/head";
import dynamic from "next/dynamic";

import { AppWrapper } from "../context/AppContext";
import { PageTitleWrapper } from "../context/PageTitleContext";

// components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./core/Footer";
import {AdminWrapper} from "../context/AdminContext";

const SidebarWithNoSSR = dynamic(() => import("./Sidebar"), { ssr: false });

export default function Layout({ children }) {
  const [menu, setMenu] = React.useState(false);
  
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
            chainId: [1, 4, 56, 137],
          },
          walletconnect: {
            chainId: [1, 4, 56, 137],
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
        <AppWrapper>
            <PageTitleWrapper>
                <AdminWrapper>
                    <Sidebar menu={menu} setMenu={setMenu} />
                <main>
                    <div className="flex flex-col pt-24 md:pt-0 min-h-[100vh] pb-5 px-[15px] lg-xl:px-5 lg-xl:pl-[220px] xl-2xl:pr-5 xl-2xl:pl-[295px]">
                    <Header menu={menu} setMenu={setMenu} />
                    <div className="grow">
                        {children}
                    </div>
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
                    
                    <Footer />
                    </div>
                </main>
                </AdminWrapper>
            </PageTitleWrapper>
        </AppWrapper>
      </UseWalletProvider>
    </>
  );
}
