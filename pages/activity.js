import Act from "../src/components/pages/myActivity/Transaction/TransactionWrapper";
import Chart from "./../src/components/pages/myActivity/Chart/Chart";
import Info from "./../src/components/pages/myActivity/Info/Info";
import {useWallet} from "use-wallet";
import MyMarketMakingPools from "../src/components/pages/myActivity/MyMarketMakingPools";
import MyVestedPools from "../src/components/pages/myActivity/MyVestedPools";
import MyVaults from "../src/components/pages/myActivity/MyVaults";

export default function Activity() {

    const wallet = useWallet();

    return (
        <div className="activity">
        {
            wallet.status === "connected" ? (

            <div className="activity__inner">
                <Info />

                <MyMarketMakingPools wallet={wallet}/>
                <MyVestedPools wallet={wallet}/>
                <MyVaults wallet={wallet}/>

                <div className="activity__inner-row">
                    <Chart />
                    <Act />
                </div>
            </div>) : <p>Connect your wallet</p>
        }
        </div>
    );
}
