import {useEffect, useState} from "react";
import Image from "next/image";
import {ethers} from "ethers";
import moment from "moment";

import helper from "../../../helpers";

// core components
import Button from "../../core/Button/Button";

// project detail components
import Card from "../projectDetail/Card/Card";
import SkeletonLiquidity from "./Skeleton/SkeletonLiquidity";

export default function LiquidityMaker({liquidityMaker, wallet, project}) {


    const [rewardEarned, setRewardEarned] = useState('0');
    const [liquidityRewardEarned, setLiquidityRewardEarned] = useState('0');
    const [baseTotalSupply, setBaseTotalSupply] = useState('0');
    const [pairedTotalSupply, setPairedTotalSupply] = useState('0');
    const [lockingPeriod, setLockingPeriod] = useState('0');
    const [rewardPerToken, setRewardPerToken] = useState('0');
    const [liquidityRewardPerToken, setLiquidityRewardPerToken] = useState('0');
    const [currentBaseValue, setCurrentBaseValue] = useState('0');
    const [currentPairedValue, setCurrentPairedValue] = useState('0');
    const [currentRewardBaseValue, setCurrentRewardBaseValue] = useState('0');
    const [currentRewardPairedValue, setCurrentRewardPairedValue] = useState('0');
    const [holdersMapping, setHoldersMapping] = useState();
    const [load, setLoad] = useState(true);


    useEffect(() => {
        if (wallet.status === "connected" && liquidityMaker.address) {
            const initWalletConnected = async () => {
                setRewardEarned(
                    helper.formatting.web3Format(
                        await helper.web3.liquidityMaker.rewardEarned(wallet, liquidityMaker.address, wallet.account)
                    )
                );
                setLiquidityRewardEarned(
                    helper.formatting.web3Format(
                        await helper.web3.liquidityMaker.liquidityRewardEarned(wallet, liquidityMaker.address, wallet.account)
                    )
                );
                setRewardPerToken(
                    await helper.web3.liquidityMaker.rewardPerToken(wallet, liquidityMaker.address)
                );
                setLiquidityRewardPerToken(
                    await helper.web3.liquidityMaker.liquidityRewardPerToken(wallet, liquidityMaker.address)
                );
                setLockingPeriod(
                    Number(await helper.web3.liquidityMaker.getLockingPeriod(wallet, liquidityMaker.address))
                );

                let TVL = await helper.web3.liquidityMaker.getTVL(wallet, liquidityMaker.address, project.token, liquidityMaker.paired_token)
                setBaseTotalSupply(helper.formatting.web3Format(TVL.baseValue));
                setPairedTotalSupply(helper.formatting.web3Format(TVL.pairedValue));

                setHoldersMapping(
                    await helper.web3.liquidityMaker.fetchHoldersMapping(wallet, liquidityMaker.address, wallet.account)
                );
                setLoad(true)

            };
            initWalletConnected();
        }
    }, [wallet, liquidityMaker]);

    useEffect(() => {
        if (liquidityRewardEarned && holdersMapping?.liquidityBalance) {
            const getCurrentValue = async () => {
                let data = await helper.web3.liquidityMaker.getCurrentValue(wallet, liquidityMaker.address, wallet.account, project.token, liquidityMaker.paired_token)
                setCurrentBaseValue(data.currentBaseValue);
                setCurrentPairedValue(data.currentPairedValue);
                setCurrentRewardBaseValue(data.currentRewardBaseValue);
                setCurrentRewardPairedValue(data.currentRewardPairedValue);
            };
            getCurrentValue();
        }
    }, [liquidityRewardEarned, holdersMapping?.liquidityBalance]);


    const setMax = async (amount, setter) => {
        setter(amount);
    };


    const withdrawLiquidity = async () => {
        //@Todo inspect full_withdrawal here if it makes sense? Because no wei value or something is passed
        let full_withdrawal = false;
        // let full_withdrawal = parseFloat(vaultBalance) === parseFloat(stakedVaultBalance);
        await helper.web3.liquidityMaker.withdraw(
            wallet,
            liquidityMaker.address,
            full_withdrawal
        );
    };

    const claimReward = async () => {
        await helper.web3.liquidityMaker.getReward(wallet, liquidityMaker.address);
    };

    const compoundReward = async () => {
        await helper.web3.liquidityMaker.compoundLPReward(wallet, liquidityMaker.address);
    };

    const exitLiquidity = async () => {
        //@Todo inspect full_withdrawal here if it makes sense? Because no wei value or something is passed
        let full_withdrawal = false;
        await helper.web3.liquidityMaker.exit(wallet, liquidityMaker.address);
    };

    const addReward = async () => {
        //@Todo declare the right value amount
        const wei = ethers.utils.parseEther(0);
        await helper.web3.liquidityMaker.addReward(wallet, liquidityMaker.address, wei);
    };

    const addLiquidityReward = async () => {
        //@Todo declare the right value amount
        const wei = ethers.utils.parseEther(0);
        await helper.web3.liquidityMaker.addLiquidityReward(wallet, liquidityMaker.address, wei);
    };

    return !load ? <SkeletonLiquidity/> : (
        <div className="grid lg:grid-cols-2 gap-7.5">
            <Card>
                <div className="divide-y">
                    {/* Card Header */}
                    <div className="card-header">
                        <h1 className="text-2xl"><i className="fa-solid fa-nfc-lock"/> Liquidity Stats</h1>
                        <div className="py-5.5 space-y-4.5">
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-clock"/> Locking Period</span>
                                <span className="text-base font-medium">{parseInt(moment.duration(lockingPeriod, 'seconds').asDays())} days and
                                    {" "}{parseInt(moment.duration(lockingPeriod, 'seconds').asHours()) % 24} hours
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-timer"/> Unlocked on</span>
                                <span
                                    className="text-base font-medium">{moment(parseInt(holdersMapping?.lastLiquidityProvidingTime) + parseInt(lockingPeriod)).format('llll')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i
                                    className="fa-solid fa-treasure-chest"/> Total Value Locked</span>
                                <span className="flex text-base font-medium">
                                    <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                    <p className="mx-2.5">{baseTotalSupply}</p>
                                    <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24} height={24}/>
                                    <p className="mx-2.5">{pairedTotalSupply}</p>
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-hands-holding-dollar"/> Reward Per Token</span>
                                <span className="text-base font-medium">{rewardPerToken}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-hands-holding-dollar"/> Liquidity Reward Per Token</span>
                                <span className="text-base font-medium">{liquidityRewardPerToken}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Card title="Liquidity & Reward Management">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-newspaper"/> Liquidity & Reward Management</h1>
                </div>
                <div className="card-content pt-5 space-y-3.75">
                    <div>
                        <div className="flex flex-col space-y-2.5 md-lg:flex-row md-lg:space-y-0 md-lg:items-center md-lg:justify-between text-base">
                            <span>
                                <i className="fa-solid fa-money-bill-transfer"/> Staked
                            </span>
                            <span className="flex justify-center items-center text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <p className="mx-2.5">{holdersMapping?.stakedInBaseToken}</p>
                                <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24} height={24}/>
                                <p className="mx-2.5">{holdersMapping?.stakedInPairedToken}</p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col space-y-2.5 md-lg:flex-row md-lg:space-y-0 md-lg:items-center md-lg:justify-between text-base">
                            <span>
                                <i className="fa-solid fa-money-bill-transfer"/> Current Value Of Liquidity
                            </span>
                            <span className="flex justify-center text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <p className="mx-2.5">{currentBaseValue}</p>
                                <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24} height={24}/>
                                <p className="mx-2.5">{currentPairedValue}</p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col space-y-2.5 md-lg:flex-row md-lg:space-y-0 md-lg:items-center md-lg:justify-between text-base">
                            <span>
                                <i className="fa-solid fa-money-bill-transfer"/> Current Value Of Rewards
                            </span>
                            <span className="flex justify-center text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <p className="mx-2.5">{currentRewardBaseValue}</p>
                                <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24} height={24}/>
                                <p className="mx-2.5">{currentRewardPairedValue}</p>
                                <Image src="/avatea-token.png" alt="pairTokeImage" width={24} height={24}/>
                                <p className="mx-2.5">{rewardEarned}</p>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card-content pt-5.5">
                    <div className="grid md-lg:grid-cols-2 gap-3.75">
                        <Button
                            name="Withdraw Liquidity"
                            handleClick={withdrawLiquidity}
                        >
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                        <Button name="Withdraw All" handleClick={exitLiquidity}>
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                        <Button name="Claim Rewards" handleClick={claimReward}>
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                        <Button name="Compound Liquidity" handleClick={compoundReward}>
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>

    )
}