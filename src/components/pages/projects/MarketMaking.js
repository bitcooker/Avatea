import {useEffect, useState} from "react";
import Image from "next/image";
import {ethers} from "ethers";

import helper from "../../../helpers";
import {WETH_ADDRESS} from "../../../helpers/constants";

// core components
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";
import RangeSlider from "../../core/RangeSlider/RangeSlider";
import InputEmpty from "../../core/Input/InputEmpty";
import Radio from "../../core/Radio/Radio";
import Button from "../../core/Button/Button";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";
import Toggle from "../../core/Toggle/Toggle";

// page components
import MaxButton from "./Button/MaxButton";
import Card from "../projectDetail/Card/Card";
import SkeletonMarketMaking from "./Skeleton/SkeletonMarketMaking";
import Swal from "sweetalert2";

export default function MarketMaking({wallet, project, marketMakingPool}) {

    const [isLoading,setIsLoading] = useState(false);
    const [baseTokenValueLocked, setBaseTokenValueLocked] = useState("0");
    const [pairedTokenValueLocked, setPairedTokenValueLocked] = useState("0");
    const [amountBaseTokenBalance, setAmountBaseTokenBalance] = useState('0');
    const [amountPairTokenBalance, setAmountPairTokenBalance] = useState('0');
    const [amountBaseTokenToWithdraw, setAmountBaseTokenToWithdraw] = useState('0');
    const [amountPairTokenToWithdraw, setAmountPairTokenToWithdraw] = useState('0');
    const [amountBaseTokenToStake, setAmountBaseTokenToStake] = useState('0');
    const [amountPairTokenToStake, setAmountPairTokenToStake] = useState('0');
    const [baseTokenWalletBalance, setBaseTokenWalletBalance] = useState('0');
    const [pairedTokenWalletBalance, setPairedTokenWalletBalance] = useState('0');
    const [pressure, setPressure] = useState('0');
    const [priceLimit, setPriceLimit] = useState('0');
    const [fresh, setFresh] = useState(false);
    const [marketMakingSettingsId, setMarketMakingSettingsId] = useState(null);
    const [mode, setMode] = useState("sell");
    const [estimation, setEstimation] = useState("- Days");
    const [activity, setActivity] = useState({
                                                 baseAmountBought: '0',
                                                 pairedAmountBought: '0',
                                                 baseAmountSold: '0',
                                                 pairedAmountSold: '0'
                                             })
    const [maxBaseLiquidityRatio, setMaxBaseLiquidityRatio] = useState('0')
    const [maxPairedLiquidityRatio, setMaxPairedLiquidityRatio] = useState('0')
    const [newMaxBaseLiquidityRatio, setNewMaxBaseLiquidityRatio] = useState('0')
    const [newMaxPairedLiquidityRatio, setNewMaxPairedLiquidityRatio] = useState('0')
    const [baseLiquiditySetting, setBaseLiquiditySetting] = useState(false);
    const [pairedLiquiditySetting, setPairedLiquiditySetting] = useState(false);
    const [allowSelling, setAllowSelling] = useState(true);
    const [pairedTokenIsWeth, setPairedTokenIsWeth] = useState(false);
    const [load, setLoad] = useState(false);

    const loadWeb3 = async () => {

        if (marketMakingPool.paired_token === WETH_ADDRESS[wallet.chainId]) {
            setPairedTokenIsWeth(true)
            setPairedTokenWalletBalance(helper.formatting.web3Format(await helper.token.wethBalanceOf(wallet, wallet.account)));
        } else {
            setPairedTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, marketMakingPool.paired_token, wallet.account)));
        }

        setBaseTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, project.token, wallet.account)));
        const {
            balanceInBaseToken,
            baseAmountBought,
            pairedAmountBought,
            baseAmountSold,
            pairedAmountSold,
            maxBaseLiquidityRatio,
            maxPairedLiquidityRatio,
            baseTokenStakedInLiquidity,
            pairedTokenStakedInLiquidity,
            allowSelling
        } = await helper.web3.marketMaker.fetchHoldersMapping(wallet, marketMakingPool.address, wallet.account);
        setActivity({
                        baseAmountBought: helper.formatting.web3Format(baseAmountBought),
                        pairedAmountBought: helper.formatting.web3Format(pairedAmountBought),
                        baseAmountSold: helper.formatting.web3Format(baseAmountSold),
                        pairedAmountSold: helper.formatting.web3Format(pairedAmountSold),
                        baseTokenStakedInLiquidity: helper.formatting.web3Format(baseTokenStakedInLiquidity),
                        pairedTokenStakedInLiquidity: helper.formatting.web3Format(pairedTokenStakedInLiquidity),
                    })
        setAllowSelling(allowSelling);
        setMaxBaseLiquidityRatio(maxBaseLiquidityRatio);
        setMaxPairedLiquidityRatio(maxPairedLiquidityRatio);
        setNewMaxBaseLiquidityRatio(maxBaseLiquidityRatio);
        setNewMaxPairedLiquidityRatio(maxPairedLiquidityRatio);
        if (mode === 'sell' && maxBaseLiquidityRatio > 0) setBaseLiquiditySetting(true);
        if (mode === 'buy' && maxPairedLiquidityRatio > 0) setPairedLiquiditySetting(true);
        setAmountBaseTokenBalance(helper.formatting.web3Format(balanceInBaseToken));
        setAmountPairTokenBalance(helper.formatting.web3Format(await helper.web3.marketMaker.getWithdrawablePairedTokens(
            wallet,
            marketMakingPool.address,
            wallet.account
        )));
        setBaseTokenValueLocked(
            helper.formatting.web3Format(
                await helper.token.balanceOf(
                    wallet,
                    project.token,
                    marketMakingPool.address
                ) || '0'
            )
        );
        setPairedTokenValueLocked(
            helper.formatting.web3Format(
                await helper.token.balanceOf(
                    wallet,
                    marketMakingPool.paired_token,
                    marketMakingPool.address
                ) || '0'
            )
        );
        setLoad(true);
    };

    useEffect(() => {
        if (wallet.isConnected() && marketMakingPool.address) {
            loadWeb3();
        }

    }, [wallet.status]);


    useEffect(() => {
        if (wallet.status === "connected" && marketMakingPool.address) {
            if (baseLiquiditySetting === false && mode === 'sell') setNewMaxBaseLiquidityRatio(0);
            if (pairedLiquiditySetting === false && mode === 'buy') setNewMaxPairedLiquidityRatio(0);
        }
    }, [baseLiquiditySetting, pairedLiquiditySetting])

    useEffect(() => {
        if (wallet.status === "connected") {
            const initWalletConnected = async () => {
                //@TODO Wire Chain ID for production
                const marketMakingSettings = await helper.marketMaking.getMarketMakingSettings({
                                                                                                   slug: project.slug, user_address: wallet.account,
                                                                                               });
                if (marketMakingSettings) {
                    const {
                        market_making_type, buy_sell_pressure, price_limit, id,
                    } = marketMakingSettings;
                    if (!market_making_type) setFresh(true);
                    setMarketMakingSettingsId(id);
                    if (mode === 'sell') setMode(market_making_type === null || market_making_type === 'hold' ? "sell" : market_making_type);
                    if (pressure === '0') setPressure(buy_sell_pressure === null ? 0 : buy_sell_pressure);
                    if (pressure === '0') setPriceLimit(price_limit === null ? 0 : price_limit);
                }
            };
            initWalletConnected();
        }
    }, [wallet.status, project]);


    useEffect(() => {
        if (parseFloat(pressure) === 0) {
            setEstimation('- Days')
            return
        }
        if (mode === 'buy') {
            let max_buying_amount = marketMakingPool.max_buying_amount
            let balance = parseFloat(amountPairTokenBalance) + parseFloat(amountPairTokenToStake ? amountPairTokenToStake : 0)
            let days = balance / (max_buying_amount * pressure / 100)
            days = Math.round(days * 10) / 10
            setEstimation(days + ' Days')
        } else if (mode === 'sell') {
            let max_selling_amount = marketMakingPool.max_selling_amount
            let balance = parseFloat(amountBaseTokenBalance) + parseFloat(amountBaseTokenToStake ? amountBaseTokenToStake : 0)
            let days = balance / (max_selling_amount * pressure / 100)
            days = Math.round(days * 10) / 10
            setEstimation(days + ' Days')
        } else {
            setEstimation('- Days')
        }

    }, [mode, pressure, amountBaseTokenBalance, amountPairTokenBalance, amountPairTokenToStake, amountBaseTokenToStake, marketMakingPool]);

    useEffect(() => {
        if (mode === 'sell' && maxBaseLiquidityRatio > 0) setBaseLiquiditySetting(true);
        if (mode === 'buy' && maxPairedLiquidityRatio > 0) setPairedLiquiditySetting(true);
    }, [mode, maxBaseLiquidityRatio, maxPairedLiquidityRatio]);

    const setMax = async (amount, setter) => {
        setter(amount);
    };

    const handleSetMode = (mode) => {
        setMode(mode);
    }

    const stakePairedToken = async () => {
        const stakeToken = async () => {
            setFresh(false);
            const wei = ethers.utils.parseEther(amountPairTokenToStake);
            let success;
            if (pairedTokenIsWeth) {
                success = await helper.web3.marketMaker.stakePairedTokenInETH(wallet, marketMakingPool.address, wei, newMaxPairedLiquidityRatio);
            } else {
                success = await helper.web3.marketMaker.stakePairedToken(wallet, marketMakingPool.address, wei, newMaxPairedLiquidityRatio);
            }
            if (success) await updateSettings((parseFloat(amountPairTokenBalance) + parseFloat(amountPairTokenToStake)))
            setAmountPairTokenBalance(parseFloat(amountPairTokenBalance) + parseFloat(amountPairTokenToStake));
            loadWeb3();
        }
        if (newMaxPairedLiquidityRatio > 0) {
            Swal.fire({
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
                   stakeToken()
                }
            })
        } else {
            stakeToken()
        }

    };

    const stakeBaseToken = async () => {
        const stakeToken = async () => {
            setFresh(false);
            const wei = ethers.utils.parseEther(amountBaseTokenToStake);
            let success = await helper.marketMaker.stake(wallet, marketMakingPool.address, wei, newMaxBaseLiquidityRatio);
            if (success) await updateSettings(parseFloat(amountBaseTokenBalance) + parseFloat(amountBaseTokenToStake));
            loadWeb3();
        }
        if (newMaxBaseLiquidityRatio > 0) {
            Swal.fire({
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
                    stakeToken()
                }
            })
        } else {
            stakeToken()
        }
    };

    const withdrawPairToken = async () => {
        let full_withdrawal = parseFloat(amountPairTokenToWithdraw) === parseFloat(amountPairTokenBalance) && parseFloat(amountBaseTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountPairTokenToWithdraw);
        let success = await helper.web3.marketMaker.withdrawPairToken(wallet, marketMakingPool.address, wei, full_withdrawal);
        if (mode === 'buy' && success) {
            await updateSettings((parseFloat(amountPairTokenBalance) - parseFloat(amountPairTokenToWithdraw)))
        }
        loadWeb3();
    };

    const withdrawBaseToken = async () => {
        let full_withdrawal = parseFloat(amountBaseTokenToWithdraw) === parseFloat(amountBaseTokenBalance) && parseFloat(amountPairTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountBaseTokenToWithdraw);
        let success = await helper.marketMaker.withdrawBaseToken(wallet, marketMakingPool.address, wei, full_withdrawal);
        if (mode === 'sell' && success) {
            await updateSettings((parseFloat(amountBaseTokenBalance) - parseFloat(amountBaseTokenToWithdraw)));
        }
        loadWeb3();
    };

    const updateRatio = async () => {
        if (mode === 'sell') await helper.web3.marketMaker.setMaxBaseLiquidityRatio(wallet, marketMakingPool.address, newMaxBaseLiquidityRatio);
        else await helper.web3.marketMaker.setMaxPairedLiquidityRatio(wallet, marketMakingPool.address, newMaxPairedLiquidityRatio);
    }

    const updateSettings = async (amount = 0) => {
        try {
            setIsLoading(true);
            const marketMakingSettings = {
                marketMakingType: mode,
                amountSettings: amount,
                pressure,
                priceLimit,
                marketMakingPoolId: marketMakingPool.id,
                id: marketMakingSettingsId ? marketMakingSettingsId : "",
            };
            await helper.marketMaking.updateMarketMakingSettings({
                marketMakingSettings, wallet, fresh
            });
            setIsLoading(false)
        } catch(e) {
            setIsLoading(false)
        }

    };


    const AllowSellingAndUpdateSettings = async (amount = 0) => {
        let success = await helper.marketMaker.setAllowSelling(wallet, marketMakingPool.address, true);
        if (success) updateSettings(amount)
    };


    return !load ? <SkeletonMarketMaking/> : (
        <div className="grid md-lg:grid-cols-2 gap-7.5">
            <Card title="Activity">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-wave-pulse"></i> Activity</h1>

                    <div className="py-5.5 space-y-4.5">
                        <div className="flex justify-between">
                            <span className="text-sm">
                                <i className="fa-solid fa-money-bill-transfer"/> TVL
                            </span>
                            <span className="flex text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <span className="mx-2.5">{baseTokenValueLocked}</span>
                                <Image
                                    src={marketMakingPool.paired_token_image}
                                    alt="pairedTokenImage"
                                    width={24}
                                    height={24}
                                />
                                <span className="mx-2.5">{pairedTokenValueLocked}</span>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm"><i className="fa-solid fa-circle-minus"/> Sold</span>
                            <span className="flex text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <span className="mx-2.5">{activity.baseAmountSold} </span>
                                <Image
                                    src={marketMakingPool.paired_token_image}
                                    alt="pairedTokenImage"
                                    width={24}
                                    height={24}
                                />
                                <span className="mx-2.5">{activity.pairedAmountSold}</span>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm"><i className="fa-solid fa-circle-plus"/> Bought</span>
                            <span className="flex text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <span className="mx-2.5">{activity.baseAmountBought}</span>
                                <Image
                                    src={marketMakingPool.paired_token_image}
                                    alt="pairedTokenImage"
                                    width={24}
                                    height={24}
                                />
                                <span className="mx-2.5">{activity.pairedAmountBought}</span>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm"><i className="fa-solid fa-circle-plus"/> Added To Liquidity</span>
                            <span className="flex text-base font-medium">
                                <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                <span className="mx-2.5">{activity.baseTokenStakedInLiquidity}</span>
                                <Image
                                    src={marketMakingPool.paired_token_image}
                                    alt="pairedTokenImage"
                                    width={24}
                                    height={24}
                                />
                                <span className="mx-2.5">{activity.pairedTokenStakedInLiquidity}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card-content space-y-5">
                    <div className="space-y-3.75">
                        <div className="space-y-2.5">
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-solid fa-circle-dollar mr-1"/>
                                    Cash
                                </div>
                                <MaxButton
                                    balance={amountPairTokenBalance}
                                    handleClick={() => setMax(amountPairTokenBalance, setAmountPairTokenToWithdraw)}
                                />
                            </div>
                            <InputWithIconSubmit
                                id="withdrawCash"
                                name="withdrawCash"
                                type="number"
                                placeholder="Input amount to withdraw"
                                submitName="Withdraw"
                                image={marketMakingPool.paired_token_image}
                                icon="fa-light fa-circle-minus"
                                value={amountPairTokenToWithdraw}
                                setValue={setAmountPairTokenToWithdraw}
                                submitFunction={withdrawPairToken}
                            />
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-solid fa-coin mr-1"/>
                                    Tokens
                                </div>
                                <MaxButton
                                    balance={amountBaseTokenBalance}
                                    handleClick={() => setMax(amountBaseTokenBalance, setAmountBaseTokenToWithdraw)}
                                />
                            </div>
                            <InputWithIconSubmit
                                id="withdrawToken"
                                name="withdrawToken"
                                type="number"
                                placeholder="Input amount to withdraw"
                                submitName="Withdraw"
                                image={project.image}
                                icon="fa-light fa-circle-minus"
                                value={amountBaseTokenToWithdraw}
                                setValue={setAmountBaseTokenToWithdraw}
                                submitFunction={withdrawBaseToken}
                            />
                        </div>
                    </div>
                </div>
            </Card>
            <Card title="Settings">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-sliders"/> Settings</h1>
                </div>

                <div className="card-content pt-5.5 space-y-5">
                    <div className="grid md-lg:grid-cols-2 md-lg:h-20 gap-5">
                        <div className="flex flex-col space-y-8">
                            <span className="text-sm"><i className="fa-solid fa-circle-bolt"/> Pressure</span>
                            <RangeSlider setPercent={setPressure} percent={pressure}/>
                        </div>
                        <div className={`space-y-2.5 ${estimation === '- Days' ? 'hidden' : ''}`}>
                            <span className="text-sm"><i className="fa-solid fa-timer"/> Estimation</span>
                            <InputEmpty placeholder={estimation} readOnly/>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <span className="text-sm"><i className="fa-solid fa-plus-minus"/> Mode</span>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                            <Radio
                                name="mode"
                                label="Buy"
                                value={"buy"}
                                checked={mode === "buy"}
                                handleSetMode={handleSetMode}
                            />
                            <Radio
                                name="mode"
                                label="Sell"
                                value={"sell"}
                                checked={mode === "sell"}
                                handleSetMode={handleSetMode}
                            />
                        </div>
                    </div>
                    <div className="space-y-2.5">
                  <span className="text-sm"><i className="fa-solid fa-circle-dollar"/>
                      {mode === "buy" ? " Maximum Buying Price" : " Minimum Selling Price"}
                  </span>
                        <InputWithIconSubmit
                            id="priceLimit"
                            name="priceLimit"
                            type="number"
                            image={mode === "sell" ? project.image : marketMakingPool.paired_token_image}
                            placeholder="Enter price"
                            icon="fa-light fa-circle-minus"
                            hideButton={true}
                            value={priceLimit}
                            setValue={setPriceLimit}
                        />
                    </div>
                    {allowSelling ?
                        <Button name="Save Settings"
                        isLoading={isLoading}
                                disabled={isLoading}
                                handleClick={(e) => {
                            updateSettings(mode === 'sell' ? amountBaseTokenBalance : amountPairTokenBalance)
                        }}> <i className="pl-2 fa-solid fa-arrow-down-to-arc"/></Button>
                        :
                        <Button name="Allow Market Making And Save Settings" handleClick={(e) => {
                            AllowSellingAndUpdateSettings(mode === 'sell' ? amountBaseTokenBalance : amountPairTokenBalance)
                        }}> <i className="pl-2 fa-solid fa-arrow-down-to-arc"/></Button>
                    }

                    {
                        mode === 'buy' || mode === 'sell' ? <div className="card-content pt-1 space-y-3.75">
                            <Toggle
                                label={(mode === 'sell' && baseLiquiditySetting || mode === 'buy' && pairedLiquiditySetting) ? "Set Liquidity Ratio" : "Do you want to provide liquidity?"}
                                handleClick={() => {
                                    mode === 'sell' ? setBaseLiquiditySetting(!baseLiquiditySetting) : setPairedLiquiditySetting(!pairedLiquiditySetting)
                                }}
                                checked={mode === 'sell' ? baseLiquiditySetting : pairedLiquiditySetting}
                            />
                            {((baseLiquiditySetting && mode === 'sell') || (pairedLiquiditySetting && mode === 'buy')) &&
                                <div className="grid md-lg:grid-cols-2 md-lg:h-10 gap-5">
                                    {
                                        ((mode === 'sell' && baseLiquiditySetting || mode === 'buy' && pairedLiquiditySetting)) ?
                                            <div className="flex items-center">
                                                <RangeSlider
                                                    className="mt-5 md-lg:mt-0"
                                                    setPercent={mode === 'sell' ? setNewMaxBaseLiquidityRatio : setNewMaxPairedLiquidityRatio}
                                                    percent={mode === 'sell' ? newMaxBaseLiquidityRatio : newMaxPairedLiquidityRatio}
                                                />
                                            </div>
                                            : ""
                                    }
                                    {(mode === 'sell' && (maxBaseLiquidityRatio.toString() !== newMaxBaseLiquidityRatio.toString())) &&
                                        <Button name={'Update Ratio'} handleClick={updateRatio}>
                                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                                        </Button>
                                    }
                                    {(mode === 'buy' && (maxPairedLiquidityRatio.toString() !== newMaxPairedLiquidityRatio.toString())) &&
                                        <Button name={'Update Ratio'} handleClick={updateRatio}>
                                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                                        </Button>
                                    }
                                </div>
                            }
                        </div> : ""
                    }

                    <div className="card-content pt-1 space-y-3.75">
                        {mode === "buy" && (<div className="space-y-2.5">
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-solid fa-coin"/> Cash
                                </div>
                                <MaxButton
                                    balance={pairedTokenWalletBalance}
                                    handleClick={() => setMax(pairedTokenWalletBalance, setAmountPairTokenToStake)}
                                />
                            </div>
                            <InputApproveWithIconSubmit
                                id="cash"
                                name="cash"
                                type="number"
                                icon="fa-light fa-circle-plus"
                                submitName="Deposit"
                                submitFunction={stakePairedToken}
                                value={amountPairTokenToStake}
                                image={marketMakingPool.paired_token_image}
                                setValue={setAmountPairTokenToStake}
                                address={marketMakingPool.address}
                                token={marketMakingPool.paired_token}
                            />
                        </div>)}

                        {mode === "sell" && (<div className="space-y-2.5">
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-solid fa-coin"/> Token
                                </div>
                                <MaxButton
                                    balance={baseTokenWalletBalance}
                                    handleClick={() => setMax(baseTokenWalletBalance, setAmountBaseTokenToStake)}
                                />
                            </div>
                            <InputApproveWithIconSubmit
                                id="token"
                                name="token"
                                type="number"
                                icon="fa-light fa-circle-plus"
                                submitName="Deposit"
                                image={project.image}
                                submitFunction={stakeBaseToken}
                                value={amountBaseTokenToStake}
                                setValue={setAmountBaseTokenToStake}
                                address={marketMakingPool.address}
                                token={project.token}
                            />
                        </div>)}
                    </div>
                </div>
            </Card>
        </div>)
}