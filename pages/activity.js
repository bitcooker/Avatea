import * as React from "react";
import {useWallet} from "use-wallet";

// page components
import Act from "../src/components/pages/myActivity/Transaction/TransactionWrapper";
import Chart from "./../src/components/pages/myActivity/Chart/Chart";
import Info from "./../src/components/pages/myActivity/Info/Info";
import MyMarketMakingPools from "../src/components/pages/myActivity/MyMarketMakingPools";
import MyVestedPools from "../src/components/pages/myActivity/MyVestedPools";
import MyVaults from "../src/components/pages/myActivity/MyVaults";
import Projects from "../src/components/pages/myActivity/Projects";
import ConnectYourWallet from "../src/components/core/ConnectYourWallet";

export default function Activity() {
    const wallet = useWallet();

    return (
        <>
            {
                wallet.status === "connected" ? (
                    <>
                        {/*<Info />*/}

                        <Projects />

                        <div className="space-y-3.75 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-5">
                            {/*<Chart />*/}
                            <Act />
                        </div>
                    </>
                ) : <ConnectYourWallet/>
            }
        </>
    );
}
