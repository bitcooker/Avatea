import * as React from "react";

// core components
import Toggle from "../../src/components/core/Toggle/Toggle";

// page components
import FarmsCard from "../../src/components/pages/farms/FarmsCard";
import FarmsCardItem from "../../src/components/pages/farms/FarmsCardItem";

const farms = [
    {
        id: 1,
        title: "MERCOR-BUSD LP",
        image: "/coins/bnbImage.png",
        apr: 62.21,
        stake: "MERCOR-BUSD LP",
        earn: "MERCOR",
        depositFee: 0,
        noFeeds: true,
        multiplier: 60,
        totalValue: 139537,
        myStakedValue: 0
    },
    {
        id: 2,
        title: "MERCOR-BNB LP",
        image: "/coins/ethIcon.png",
        apr: 21.78,
        stake: "MERCOR-BNB LP",
        earn: "MERCOR",
        depositFee: 0,
        noFeeds: true,
        multiplier: 2,
        totalValue: 13060,
        myStakedValue: 0
    }
]

export default function Farms(props) {
    return (
        <div className="flex flex-col gap-5 divide-y divide-dashed">
            <div className="flex flex-col items-center justify-center gap-3">
                <label className="text-2xl text-center font-medium">Stake LP tokens to earn MERCOR</label>
                <Toggle label="Staked only" />
            </div>
            <div className="pt-5">
                <FarmsCard>
                    {farms.map((farm, index) => <FarmsCardItem key={index} {...farm} />)}
                </FarmsCard>
            </div>
        </div>
    )
}