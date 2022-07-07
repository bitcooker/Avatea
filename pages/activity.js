import * as React from "react";

import Act from "../src/components/pages/myActivity/Transaction/TransactionWrapper";
import Chart from "./../src/components/pages/myActivity/Chart/Chart";
import Info from "./../src/components/pages/myActivity/Info/Info";
import {useWallet} from "use-wallet";
import MyMarketMakingPools from "../src/components/pages/myActivity/MyMarketMakingPools";
import MyVestedPools from "../src/components/pages/myActivity/MyVestedPools";
import MyVaults from "../src/components/pages/myActivity/MyVaults";

import Toggle from "../src/components/core/Toggle/Toggle";

export default function Activity() {
    const wallet = useWallet();
    const [toggle, setToggle] = React.useState(false);

    return (
        <>
            {
                wallet.status === "connected" ? (
                    <>
                        <Info />

                        <MyMarketMakingPools wallet={wallet}/>
                        <MyVestedPools wallet={wallet}/>
                        <MyVaults wallet={wallet}/>

                        <div className="space-y-3.75 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-5">
                            <Chart />
                            <Act />
                        </div>
                    </>
                ) : <p>Connect your wallet</p>
            }
        </>
    );
}
