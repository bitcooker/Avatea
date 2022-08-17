import * as React from "react";
import {useWallet} from "@albs1/use-wallet";

// page components
import Act from "../src/components/pages/myActivity/Transaction/TransactionWrapper";
import Chart from "./../src/components/pages/myActivity/Chart/Chart";
import Info from "./../src/components/pages/myActivity/Info/Info";
import MyMarketMakingPools from "../src/components/pages/myActivity/MyMarketMakingPools";
import MyVestedPools from "../src/components/pages/myActivity/MyVestedPools";
import MyVaults from "../src/components/pages/myActivity/MyVaults";
import Projects from "../src/components/pages/myActivity/Projects";
import ConnectYourWallet from "../src/components/core/ConnectYourWallet";
import {useEffect, useState} from "react";
import helpers from "../src/helpers";
import { usePageTitleContext } from "../src/context/PageTitleContext";
import TransactionWrapper from "../src/components/pages/myActivity/Transaction/TransactionWrapper";

export default function Activity() {
    const { setTitle } = usePageTitleContext();
    const wallet = useWallet();
    const [loaded,setIsLoaded] = useState(false);
    const [projects, setProjects] = useState([]);
    
    
    useEffect(() => {
        setTitle("Activity")
        if(wallet.isConnected()) {
            (async () => {
                setProjects(await helpers.user.userActivity(wallet))
                setIsLoaded(true);
            })()
        }
    },[setTitle, wallet])

    return (
        <>
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
