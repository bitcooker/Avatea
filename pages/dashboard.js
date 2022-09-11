import * as React from "react";
import {useWallet} from "@albs1/use-wallet";

// page components
import Projects from "../src/components/pages/myActivity/Projects";
import ConnectYourWallet from "../src/components/core/ConnectYourWallet";
import {useEffect, useState} from "react";
import helpers from "../src/helpers";
import { usePageTitleContext } from "../src/context/PageTitleContext";
import TransactionWrapper from "../src/components/pages/myActivity/Transaction/TransactionWrapper";
import Head from "next/head";
import {TITLE_PREFIX} from "../src/helpers/constants";

export default function Dashboard() {
    const { setTitle } = usePageTitleContext();
    const wallet = useWallet();
    const [loaded,setIsLoaded] = useState(false);
    const [projects, setProjects] = useState([]);
    
    
    useEffect(() => {
        setTitle("Dashboard")
        if(wallet.isConnected()) {
            (async () => {
                setProjects(await helpers.user.userActivity(wallet))
                setIsLoaded(true);
            })()
        }
    },[setTitle, wallet])

    return (
        <>
            <Head>
                <title>Dashboard | { TITLE_PREFIX }</title>
                <meta property="og:title" content={`Dashboard ${TITLE_PREFIX}`} key="title" />
            </Head>
            {
                wallet.status === "connected" ? (
                    <>
                        {/*<Info />*/}
                        <Projects projects={projects} loaded={loaded} />

                        <div className="space-y-3.75 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-5">
                            {/*<Chart />*/}
                            <TransactionWrapper  />
                        </div>
                    </>
                ) : <ConnectYourWallet/>
            }
        </>
    );
}
