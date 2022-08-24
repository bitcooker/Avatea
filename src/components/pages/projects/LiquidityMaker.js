import {useEffect, useState} from "react";
import Image from "next/image";

import helper from "../../../helpers";

// core components
import Button from "../../core/Button/Button";

// project detail components
import Card from "../projectDetail/Card/Card";
import SkeletonLiquidity from "./Skeleton/SkeletonLiquidity";
import moment from "moment";
import Toggle from "../../core/Toggle/Toggle";
import RangeSlider from "../../core/RangeSlider/RangeSlider";
import Swal from "sweetalert2";
import KPIWrapper from "../../core/KPIWrapper";
import KPICard from "../../core/KPICard";

export default function LiquidityMaker({liquidityMaker, wallet, project, marketMakingPool}) {


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
    const [load, setLoad] = useState(false);
    const [maxBaseLiquidityRatio, setMaxBaseLiquidityRatio] = useState('0')
    const [maxPairedLiquidityRatio, setMaxPairedLiquidityRatio] = useState('0')
    const [newMaxBaseLiquidityRatio, setNewMaxBaseLiquidityRatio] = useState('0')
    const [newMaxPairedLiquidityRatio, setNewMaxPairedLiquidityRatio] = useState('0')
    const [baseLiquiditySetting, setBaseLiquiditySetting] = useState(false);
    const [pairedLiquiditySetting, setPairedLiquiditySetting] = useState(false);
    const [baseAllocation, setBaseAllocation] = useState('0');
    const [pairAllocation, setPairAllocation] = useState('0');
    const [pairedTokenStakedInLiquidity, setPairedTokenStakedInLiquidity] = useState('0');
    const [baseTokenStakedInLiquidity, setBaseTokenStakedInLiquidity] = useState('0');


    useEffect(() => {
        if (wallet.status === "connected") {
            const initWalletConnected = async () => {
                const {
                    maxBaseLiquidityRatio,
                    maxPairedLiquidityRatio,
                    pairedAllocationLiquidity,
                    baseAllocationLiquidity,
                    pairedTokenStakedInLiquidity,
                    baseTokenStakedInLiquidity

                } = await helper.web3.marketMaker.fetchHoldersMapping(wallet, marketMakingPool.address, wallet.account);
                setMaxBaseLiquidityRatio(maxBaseLiquidityRatio);
                setMaxPairedLiquidityRatio(maxPairedLiquidityRatio);
                setNewMaxBaseLiquidityRatio(maxBaseLiquidityRatio);
                setNewMaxPairedLiquidityRatio(maxPairedLiquidityRatio);
                setBaseAllocation(helper.formatting.web3Format(baseAllocationLiquidity))
                setPairAllocation(helper.formatting.web3Format(pairedAllocationLiquidity))
                setBaseTokenStakedInLiquidity(helper.formatting.web3Format(baseTokenStakedInLiquidity))
                setPairedTokenStakedInLiquidity(helper.formatting.web3Format(pairedTokenStakedInLiquidity))
                if (maxBaseLiquidityRatio > 0) setBaseLiquiditySetting(true);
                if (maxPairedLiquidityRatio > 0) setPairedLiquiditySetting(true);

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
                setLoad(true);

                //@TODO Wire Chain ID for production
                const marketMakingSettings = await helper.marketMaking.getMarketMakingSettings({
                    slug: project.slug, user_address: wallet.account,
                });
                if (marketMakingSettings) {
                    const {
                        market_making_type, buy_sell_pressure, price_limit, id,
                    } = marketMakingSettings;
                }
            };
            initWalletConnected();
        }
    }, [wallet, project]);

    useEffect(() => {
        if (wallet.status === "connected" && marketMakingPool.address) {
            if (baseLiquiditySetting === false) {
                setNewMaxBaseLiquidityRatio(0)
            } else {
                setNewMaxBaseLiquidityRatio(maxBaseLiquidityRatio)
            }
            if (pairedLiquiditySetting === false) {
                setNewMaxPairedLiquidityRatio(0)
            } else {
                setNewMaxPairedLiquidityRatio(maxPairedLiquidityRatio)
            }
        }
    }, [baseLiquiditySetting, pairedLiquiditySetting])

    useEffect(() => {
        if (maxBaseLiquidityRatio > 0) setBaseLiquiditySetting(true);
        if (maxPairedLiquidityRatio > 0) setPairedLiquiditySetting(true);
    }, [maxBaseLiquidityRatio, maxPairedLiquidityRatio]);


    useEffect(() => {
        if (liquidityRewardEarned && holdersMapping?.liquidityBalance) {
            const getCurrentValue = async () => {
                let data = await helper.web3.liquidityMaker.getCurrentValue(
                    wallet,
                    liquidityMaker.address,
                    wallet.account,
                    project.token,
                    liquidityMaker.paired_token
                )
                setCurrentBaseValue(data.currentBaseValue);
                setCurrentPairedValue(data.currentPairedValue);
                setCurrentRewardBaseValue(data.currentRewardBaseValue);
                setCurrentRewardPairedValue(data.currentRewardPairedValue);
            };
            getCurrentValue();
        }
    }, [liquidityRewardEarned, holdersMapping?.liquidityBalance]);


    const updateBaseRatio = async () => {
        if (newMaxBaseLiquidityRatio > 0) {
            await Swal.fire({
                title: 'Read before proceeding',
                text: "Providing Liquidity exposes you to a certain risk reward situation, please use with caution.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.close();
                    helper.web3.marketMaker.setMaxBaseLiquidityRatio(wallet, marketMakingPool.address, newMaxBaseLiquidityRatio);
                }
            })
        } else {
            await helper.web3.marketMaker.setMaxBaseLiquidityRatio(wallet, marketMakingPool.address, newMaxBaseLiquidityRatio);
        }
    }

    const updatePairedRatio = async () => {
        if (newMaxPairedLiquidityRatio > 0) {
            await Swal.fire({
                title: 'Read before proceeding',
                text: "Providing Liquidity exposes you to a certain risk reward situation, please use with caution.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.close();
                    helper.web3.marketMaker.setMaxPairedLiquidityRatio(wallet, marketMakingPool.address, newMaxPairedLiquidityRatio);
                }
            })
        } else {
            await helper.web3.marketMaker.setMaxPairedLiquidityRatio(wallet, marketMakingPool.address, newMaxPairedLiquidityRatio);
        }
    }

    const claimReward = async () => {
        await helper.web3.liquidityMaker.getReward(wallet, liquidityMaker.address);
    };

    const compoundReward = async () => {
        await helper.web3.liquidityMaker.compoundLPReward(wallet, liquidityMaker.address);
    };

    const exitLiquidity = async () => {
        await helper.web3.liquidityMaker.exit(wallet, liquidityMaker.address);
    };


    return !load ? <SkeletonLiquidity/> : (
        <div className="grid md-lg:grid-cols-1 gap-7.5 max-w-[700px] lg:max-w-[900px] mx-auto">
            <Card>
                <KPIWrapper>
                    <KPICard image={project.image} end={baseAllocation} label={'Allocation'} />
                    <KPICard image={project.image} end={baseTokenStakedInLiquidity} label={'Added to Liquidity'} />
                    <KPICard image={project.image} end={baseTotalSupply} label={'Total Value Locked'} />
                    <KPICard image={liquidityMaker.paired_token_image} end={pairAllocation} label={'Allocation'} />
                    <KPICard image={liquidityMaker.paired_token_image} end={pairedTokenStakedInLiquidity} label={'Added to Liquidity'} />
                    <KPICard image={liquidityMaker.paired_token_image} end={pairedTotalSupply} label={'Total Value Locked'} />
                </KPIWrapper>
                <div className="divide-y">
                    {/* Card Header */}
                    <div className="card-header">
                        <h1 className="text-lg md-lg:text-2xl"><i className="fa-solid fa-nfc-lock"/> Liquidity Stats
                        </h1>
                        <div className="py-5.5 space-y-4.5">
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-clock"/> Locking Period</span>
                                <span className="text-base font-medium">{helper.formatting.secondFormat(lockingPeriod)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-sm"><i
                                    className="fa-solid fa-treasure-chest"/> Total Value Locked</span>
                                <span className="flex items-center text-base font-medium">
                                    <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                    <p className="mx-2.5">{baseTotalSupply}</p>
                                    <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24}
                                           height={24}/>
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

                            <div className="flex justify-between">
                                <span className="text-sm"><i
                                    className="fa-solid fa-treasure-chest"/> Allocated Liquidity</span>
                                <span className="flex items-center text-base font-medium">
                                    <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                    <p className="mx-2.5">{baseAllocation}</p>
                                    <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24}
                                           height={24}/>
                                    <p className="mx-2.5">{pairAllocation}</p>
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i
                                    className="fa-solid fa-circle-plus"/> Added To Liquidity</span>
                                <span className="flex text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <span className="mx-2.5">{baseTokenStakedInLiquidity}</span>
                                <Image
                                    src={marketMakingPool.paired_token_image}
                                    alt="pairedTokenImage"
                                    width={24}
                                    height={24}
                                />
                                <span className="mx-2.5">{pairedTokenStakedInLiquidity}</span>
                            </span>
                            </div>

                        </div>
                    </div>
                </div>
            </Card>
            <Card title="Liquidity & Reward Management">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-lg md-lg:text-2xl"><i className="fa-solid fa-newspaper"/> Liquidity & Reward
                        Management</h1>
                </div>
                <div className="card-content pt-5 space-y-3.75">
                    <div>
                        <div
                            className="flex flex-col space-y-2.5 md-lg:flex-row md-lg:space-y-0 md-lg:items-center md-lg:justify-between text-base">
                            <span className="text-center md-lg:text-left">
                                <i className="fa-solid fa-money-bill-transfer"/> Staked
                            </span>
                            <span className="flex justify-center items-center text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <p className="mx-2.5">{holdersMapping?.stakedInBaseToken}</p>
                                <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24}
                                       height={24}/>
                                <p className="mx-2.5">{holdersMapping?.stakedInPairedToken}</p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div
                            className="flex flex-col space-y-2.5 md-lg:flex-row md-lg:space-y-0 md-lg:items-center md-lg:justify-between text-base">
                            <span className="text-center md-lg:text-left">
                                <i className="fa-solid fa-money-bill-transfer"/> Current Value Of Liquidity
                            </span>
                            <span className="flex justify-center text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <p className="mx-2.5">{currentBaseValue}</p>
                                <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24}
                                       height={24}/>
                                <p className="mx-2.5">{currentPairedValue}</p>
                            </span>
                        </div>
                    </div>

                    <div>
                        <div
                            className="flex flex-col space-y-2.5 md-lg:flex-row md-lg:space-y-0 md-lg:items-center md-lg:justify-between text-base">
                            <span className="text-center md-lg:text-left">
                                <i className="fa-solid fa-money-bill-transfer"/> Current Value Of Rewards
                            </span>
                            <span className="flex justify-center text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <p className="mx-2.5">{currentRewardBaseValue}</p>
                                <Image src={liquidityMaker.paired_token_image} alt="pairTokeImage" width={24}
                                       height={24}/>
                                <p className="mx-2.5">{currentRewardPairedValue}</p>
                                <Image src="/avatea-token.png" alt="pairTokeImage" width={24} height={24}/>
                                <p className="mx-2.5">{rewardEarned}</p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <span className="text-sm"><i className="fa-solid fa-timer"/> Unlocked on</span>
                            <span
                                className="text-base font-medium">
                                    {helper.formatting.dateFormat(parseInt(holdersMapping?.lastLiquidityProvidingTime) + parseInt(lockingPeriod))}
                                </span>
                        </div>
                    </div>
                </div>

                <div className="card-content p-5 space-y-3.75 border-1 border-2 rounded-2xl mt-2.5">
                    <Toggle
                        label={baseLiquiditySetting ? "Set " + project.ticker + " Liquidity Ratio" : "Do you want to provide liquidity in " + project.ticker + "?"}
                        handleClick={() => {
                            setBaseLiquiditySetting(!baseLiquiditySetting)
                        }}
                        checked={baseLiquiditySetting}
                    />
                    {
                        <div className="grid md-lg:grid-cols-2 md-lg:h-10 gap-5">
                            {
                                baseLiquiditySetting ?
                                    <div className="flex items-center">
                                        <RangeSlider
                                            className="mt-5 md-lg:mt-0"
                                            setPercent={setNewMaxBaseLiquidityRatio}
                                            percent={newMaxBaseLiquidityRatio}
                                        />
                                    </div>
                                    : ""
                            }
                            {maxBaseLiquidityRatio.toString() !== newMaxBaseLiquidityRatio.toString() &&
                                <Button name={'Update Ratio'} handleClick={updateBaseRatio}>
                                    <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                                </Button>
                            }

                        </div>
                    }

                    <Toggle
                        label={pairedLiquiditySetting ? "Set " + liquidityMaker.paired_token_ticker + " Liquidity Ratio" : "Do you want to provide liquidity in " + liquidityMaker.paired_token_ticker + "?"}
                        handleClick={() => {
                            setPairedLiquiditySetting(!pairedLiquiditySetting)
                        }}
                        checked={pairedLiquiditySetting}
                    />
                    {
                        <div className="grid md-lg:grid-cols-2 md-lg:h-10 gap-5">
                            {
                                pairedLiquiditySetting ?
                                    <div className="flex items-center">
                                        <RangeSlider
                                            className="mt-5 md-lg:mt-0"
                                            setPercent={setNewMaxPairedLiquidityRatio}
                                            percent={newMaxPairedLiquidityRatio}
                                        />
                                    </div>
                                    : ""
                            }

                            {maxPairedLiquidityRatio.toString() !== newMaxPairedLiquidityRatio.toString() &&
                                <Button name={'Update Ratio'} handleClick={updatePairedRatio}>
                                    <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                                </Button>
                            }
                        </div>
                    }
                </div>

                <div className="card-content pt-5.5">
                    <div className="grid md-lg:grid-cols-2 gap-3.75">
                        <Button
                            disabled={parseInt(holdersMapping?.lastLiquidityProvidingTime) + parseInt(lockingPeriod) > moment().unix()}
                            className={'col-span-full'} name="Withdraw All" handleClick={exitLiquidity}>
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