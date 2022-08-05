import * as React from "react";
import {useWallet} from "@albs1/use-wallet";
import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {ethers} from "ethers";

import {PAIRED_TOKEN_DEFAULT_IMAGE} from "../../../helpers/constants";
import helper from "../../../helpers";

// core components
import InputEmpty from "../../../components/core/Input/InputEmpty";
import ButtonFit from "../../../components/core/Button/ButtonFit";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";

// page components
import SkeletonFarmsCard from "./Skeleton/SkeletonFarmsCard";
import MaxButton from "../projects/Button/MaxButton";

export default function FarmsCardItem({liquidityMaker}) {
    const [loading, setLoading] = useState(true);
    const wallet = useWallet();

    const [openDetail, setOpenDetail] = React.useState(false);

    const [liquidityRewardTokenWalletBalance, setLiquidityTokenWalletBalance] = useState("0");
    const [amountLiquidityTokenToStake, setAmountLiquidityTokenToStake] = useState("0");

    const [maxTotalSupply, setMaxTotalSupply] = useState('0');
    const [liquidityBalance, setLiquidityBalance] = useState(-1);

    const [rewardPerToken, setRewardPerToken] = useState('0');
    const [liquidityRewardPerToken, setLiquidityRewardPerToken] = useState('0');

    const [rewardEarned, setRewardEarned] = useState('0');
    const [liquidityRewardEarned, setLiquidityRewardEarned] = useState('0');
    const [totalSupply, setTotalSupply] = useState('0');
    const [lockingPeriod, setLockingPeriod] = useState('0');

    const [holdersMapping, setHoldersMapping] = useState();

    useEffect(() => {
        if (wallet.status === "connected" && liquidityMaker.address) {
            const initWalletConnected = async () => {
                setRewardPerToken(
                    await helper.web3.liquidityMaker.rewardPerToken(wallet, liquidityMaker.address)
                );
                setLiquidityRewardPerToken(
                    await helper.web3.liquidityMaker.liquidityRewardPerToken(wallet, liquidityMaker.address)
                );

                let lockingPeriod = Number(await helper.web3.liquidityMaker.getLockingPeriod(wallet, liquidityMaker.address));
                setLockingPeriod(lockingPeriod);

                let maxTotalSupply = helper.formatting.web3Format((await helper.web3.liquidityMaker.maxTotalSupply(wallet, liquidityMaker.address)));
                setMaxTotalSupply(maxTotalSupply);

                let TVL = await helper.web3.liquidityMaker.totalSupply(wallet, liquidityMaker.address)
                setTotalSupply(helper.formatting.web3Format(TVL));

                setLiquidityTokenWalletBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(wallet, liquidityMaker.pair_address, wallet.account)
                    )
                );

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

                let holdersMappingData = await helper.web3.liquidityMaker.fetchHoldersMapping(wallet, liquidityMaker.address, wallet.account)
                setHoldersMapping(holdersMappingData);

                setLiquidityBalance(holdersMappingData.liquidityBalance);

            };

            initWalletConnected();
        }

        if (wallet.status === "disconnected" && liquidityMaker.address) {
            const initWithoutWallet = async () => {
                setRewardPerToken(
                        await helper.web3.liquidityMaker.rewardPerToken(wallet, liquidityMaker.address,true)
                );
                setLiquidityRewardPerToken(
                        await helper.web3.liquidityMaker.liquidityRewardPerToken(wallet, liquidityMaker.address,true)
                );

                let lockingPeriod = Number(await helper.web3.liquidityMaker.getLockingPeriod(wallet, liquidityMaker.address,true));
                setLockingPeriod(lockingPeriod);

                let maxTotalSupply = helper.formatting.web3Format((await helper.web3.liquidityMaker.maxTotalSupply(wallet, liquidityMaker.address,true)));
                setMaxTotalSupply(maxTotalSupply);

                let TVL = await helper.web3.liquidityMaker.totalSupply(wallet, liquidityMaker.address, true)
                setTotalSupply(helper.formatting.web3Format(TVL));
                setLoading(false)
            };

            initWithoutWallet();
        }
    }, [wallet, liquidityMaker]);

    const setMax = useCallback(async (amount, setter) => {
        setter(amount);
    }, []);


    const stakeLP = async () => {
        const wei = ethers.utils.parseEther(amountLiquidityTokenToStake);
        let success = await helper.web3.liquidityMaker.stake(wallet, liquidityMaker.address, wei);
    };

    const claimReward = async () => {
        await helper.web3.liquidityMaker.getReward(wallet, liquidityMaker.address);
    };

    const compoundReward = async () => {
        await helper.web3.liquidityMaker.compoundLPReward(wallet, liquidityMaker.address);
    };

    const exitLiquidity = async () => {
        await helper.web3.liquidityMaker.exitInLP(wallet, liquidityMaker.address);
    };

    useEffect(() => {
        if(liquidityBalance !== -1)
            setLoading(false);
    }, [liquidityBalance])

    return <>
        { loading ? 
            <SkeletonFarmsCard />
            :
            <div className="flex flex-col p-6 bg-white rounded-2.5xl gap-5 divide-y">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <Image src={liquidityMaker.image} alt="farmImage" width={64} height={64} objectFit="none"/>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold">{liquidityMaker.ticker}-{liquidityMaker.paired_token_ticker} LP</h1>
                            <div className="flex gap-2 justify-end">
                                <div className="flex items-center px-2 py-1 gap-2 border-2 border-green-500 rounded-full">
                                    <i className="fa-solid fa-badge-check text-green-500 text-lg"/>
                                    <span className="text-green-500">No Fees</span>
                                </div>
                                {/*<div className="flex items-center px-2 py-1 bg-indigo-500 text-white rounded-full">*/}
                                {/*    {props.multiplier}X*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>

                    <div className="flex p-2 flex-col text-black-500">
                        <div className="flex justify-between">
                            <span>APR In VATE:</span>
                            <span className="font-semibold">{rewardPerToken}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>APR:</span>
                            <span className="font-semibold">{liquidityRewardPerToken}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Stake:</span>
                            <span className="font-semibold">{liquidityMaker.ticker}-{liquidityMaker.paired_token_ticker} LP</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Earn:</span>
                            <span className="font-semibold">{liquidityMaker.ticker}-{liquidityMaker.paired_token_ticker} LP + VATE</span>
                        </div>
                    </div>

                    {
                        wallet.status === "connected" ? <>
                            <div className="flex flex-col px-2 gap-1">
                                <label className="text-indigo-500"><span className="font-semibold"></span> VATE EARNED</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <InputEmpty id="mercor-earned" name="earned" type="number" value={rewardEarned} readOnly/>
                                    <ButtonFit name="Harvest" handleClick={claimReward} disabled={parseFloat(rewardEarned) === 0.0}/>
                                </div>
                            </div>

                            <div className="flex flex-col px-2 gap-1">
                                <label className="text-indigo-500"><span className="font-semibold"></span> LP EARNED</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <InputEmpty id="mercor-earned" name="earned" type="number" value={liquidityRewardEarned} readOnly/>
                                    <ButtonFit name="Compound" handleClick={compoundReward} disabled={parseFloat(liquidityRewardEarned) === 0.0}/>
                                </div>
                            </div>
                        </>
                                :
                                ""
                    }


                    {
                        wallet.status === "connected" ? <ButtonFit name="Exit" handleClick={exitLiquidity} disabled={parseFloat(liquidityBalance) === 0.0}/>
                                :
                                ""
                    }

                    <div className="flex justify-between">
                        <span className="text-sm"><i className="fa-solid fa-clock"/> Locking Period</span>
                        <span className="text-base font-medium">{helper.formatting.secondFormat(lockingPeriod)}
                                    </span>
                    </div>
                    {
                        wallet.status === "connected" ?  <div className="flex justify-between">
                            <span className="text-sm"><i className="fa-solid fa-timer"/> Unlocked on</span>
                            <span
                                    className="text-base font-medium">
                                        {helper.formatting.dateFormat(parseInt(holdersMapping?.lastLiquidityProvidingTime) + parseInt(lockingPeriod))}
                                    </span>
                        </div> : ""
                    }

                    {
                        wallet.status === "connected" ?  <div className="flex flex-col space-y-2.5 md-lg:flex-row md-lg:space-y-0 md-lg:items-center md-lg:justify-between text-base">
                                <span className="text-center md-lg:text-left">
                                    <i className="fa-solid fa-money-bill-transfer"/> Staked
                                </span>
                            <span className="flex justify-center items-center text-base font-medium">
                                    <p className="mx-2.5">{holdersMapping?.liquidityBalance}</p>
                                </span>
                        </div> : ""
                    }


                    {
                        wallet.status === "connected" ? <>
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-solid fa-coin"/> Stake LP tokens
                                </div>
                                <span>
                                <MaxButton
                                        balance={liquidityRewardTokenWalletBalance}
                                        handleClick={() =>
                                                setMax(
                                                        liquidityRewardTokenWalletBalance,
                                                        setAmountLiquidityTokenToStake
                                                )
                                        }
                                />
                        </span>
                            </div>
                            <InputApproveWithIconSubmit
                                    id="cash"
                                    name="cash"
                                    type="number"
                                    icon="fa-light fa-circle-plus"
                                    submitName="Stake"
                                    image={PAIRED_TOKEN_DEFAULT_IMAGE}
                                    submitFunction={stakeLP}
                                    value={amountLiquidityTokenToStake}
                                    setValue={setAmountLiquidityTokenToStake}
                                    address={liquidityMaker.address}
                                    token={liquidityMaker.pair_address}
                            /></> : ""
                    }

                </div>

                {/* details collapse */}
                <div className="flex flex-col gap-2 pt-5 ">
                    <div className="flex justify-center items-center text-indigo-500 hover:text-indigo-500/80 hover:cursor-pointer gap-2 transition"
                        onClick={() => setOpenDetail((openDetail) => !openDetail)}>
                        Details {!openDetail ? <i className="fa-solid fa-arrow-down"/> : <i className="fa-solid fa-arrow-up"/>}
                    </div>
                    <div className={`flex flex-col gap-2 overflow-hidden transition-all ${openDetail ? 'max-h-[130px]' : 'max-h-0'}`}>
                        <div className="flex justify-between">
                            <span>Total Liquidity:</span>
                            <span>{totalSupply}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Max Total Liquidity:</span>
                            <span>{maxTotalSupply}</span>
                        </div>
                        <a className="flex justify-between text-indigo-500 hover:text-indigo-500/80 hover:cursor-pointer transition">
                            <span>View Contract</span>
                            <span><i className="fa-solid fa-arrow-up-right-from-square"/></span>
                        </a>
                        <a className="flex justify-between text-indigo-500 hover:text-indigo-500/80 hover:cursor-pointer transition">
                            <span>See Pair Info</span>
                            <span><i className="fa-solid fa-arrow-up-right-from-square"/></span>
                        </a>
                    </div>
                </div>
            </div>
        }
    </>
}