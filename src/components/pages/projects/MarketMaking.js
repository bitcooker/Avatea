import * as React from "react";
import {useEffect, useState} from "react";
import Image from "next/image";

import helper from "../../../helpers";

// core components
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";
import RangeSlider from "../../core/RangeSlider/RangeSlider";
import Radio from "../../core/Radio/Radio";
import Button from "../../core/Button/Button";
import Modal from "../../core/modal/Modal";

// page components
import Card from "../projectDetail/Card/Card";
import SkeletonMarketMaking from "./Skeleton/SkeletonMarketMaking";
import KPICard from "../../core/KPICard";
import KPIWrapper from "../../core/KPIWrapper";
import HomeCard from "../../pages/Home/HomeCard";
import Tooltip from "../../core/Tooltip/Tooltip";
import ReactGA from "react-ga4";

const questions = [
    "How to guide - Please make a selection",
    "How to guide - How fast would you like this to happen?",
    "What price limit do you want to set?",
]

export default function MarketMaking({wallet, project, marketMakingPool}) {

    const [isLoading, setIsLoading] = useState(false);
    const [baseTokenValueLocked, setBaseTokenValueLocked] = useState("0");
    const [pairedTokenValueLocked, setPairedTokenValueLocked] = useState("0");
    const [amountBaseTokenBalance, setAmountBaseTokenBalance] = useState('0');
    const [amountPairTokenBalance, setAmountPairTokenBalance] = useState('0');
    const [pressure, setPressure] = useState('0');
    const [priceLimit, setPriceLimit] = useState('0');
    const [fresh, setFresh] = useState(false);
    const [marketMakingSettingsId, setMarketMakingSettingsId] = useState(null);
    const [mode, setMode] = useState("sell");
    const [estimation, setEstimation] = useState("- Days");
    const [estimationLoader, setEstimationLoader] = useState(false);
    const [activity, setActivity] = useState({
        baseAmountBought: '0',
        pairedAmountBought: '0',
        baseAmountSold: '0',
        pairedAmountSold: '0'
    })
    const [allowSelling, setAllowSelling] = useState(true);
    const [load, setLoad] = useState(false);
    const [visibleMagicModal, setVisibleMagicModal] = useState(false);
    const [openMagicModal, setOpenMagicModal] = useState(false);
    const [magicQStep, setMagicQStep] = useState(0);
    const [touchedSettings, setTouchedSettings] = useState(false);
    const [marketMakingSettings, setMarketMakingSettings] = useState()
    const [tokenPrice, setTokenPrice] = useState('0');

    useEffect(() => {

        if (wallet.isConnected() && marketMakingPool.address) {
            const initWalletConnected = async () => {

                const {
                    balanceInBaseToken,
                    baseAmountBought,
                    pairedAmountBought,
                    baseAmountSold,
                    pairedAmountSold,
                    allowSelling,
                    pairedAllocationTrading,
                    baseAllocationTrading
                } = await helper.web3.marketMaker.fetchHoldersMapping(wallet, marketMakingPool.address, wallet.account);
                setActivity({
                    baseAmountBought: helper.formatting.web3Format(baseAmountBought),
                    pairedAmountBought: helper.formatting.web3Format(pairedAmountBought),
                    baseAmountSold: helper.formatting.web3Format(baseAmountSold),
                    pairedAmountSold: helper.formatting.web3Format(pairedAmountSold),
                    pairedAllocationTrading: helper.formatting.web3Format(pairedAllocationTrading),
                    baseAllocationTrading: helper.formatting.web3Format(baseAllocationTrading),
                })
                setAllowSelling(allowSelling);
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
                setTokenPrice(await helper.web3.uniswap.getPrice(wallet, project.token, marketMakingPool.paired_token))
                setLoad(true);
            };
            initWalletConnected();
        }

    }, [wallet]);


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
                    setMarketMakingSettings({
                        market_making_type,
                        buy_sell_pressure: buy_sell_pressure?.toString(),
                        price_limit
                    });
                    if (!market_making_type) setFresh(true);
                    setMarketMakingSettingsId(id);
                    if (mode === 'sell') setMode(market_making_type === null || market_making_type === 'hold' ? "sell" : market_making_type);
                    if (pressure === '0') setPressure(buy_sell_pressure === null ? '0' : buy_sell_pressure.toString());
                    if (pressure === '0') setPriceLimit(price_limit === null ? 0 : price_limit);
                    console.log(mode, pressure, priceLimit)
                }
            };
            initWalletConnected();
        }
    }, [wallet.status, project]);

    useEffect(() => {
        if (fresh) {
            setTouchedSettings(true)
        } else {
            const comparisonObject = {
                market_making_type: mode,
                buy_sell_pressure: pressure,
                price_limit: priceLimit
            }
            console.log(comparisonObject)
            if (JSON.stringify(comparisonObject) === JSON.stringify(marketMakingSettings)) {
                setTouchedSettings(false)
            } else {
                setTouchedSettings(true)
            }

        }

    }, [mode, pressure, priceLimit])

    useEffect(() => {

        setEstimationLoader(true);


        if (parseFloat(pressure) === 0) {
            setEstimation('- Days')
        }
        if (mode === 'buy') {
            let max_buying_amount = marketMakingPool.max_buying_amount
            let balance = parseFloat(activity.pairedAllocationTrading)
            let days = balance / (max_buying_amount * pressure / 100)
            days = Math.round(days * 10) / 10
            setEstimation(days + ' Days')
        } else if (mode === 'sell') {
            let max_selling_amount = marketMakingPool.max_selling_amount
            let balance = parseFloat(activity.baseAllocationTrading)
            let days = balance / (max_selling_amount * pressure / 100)
            days = Math.round(days * 10) / 10
            setEstimation(days + ' Days')
        } else {
            setEstimation('- Days')
        }
        const timeout = setTimeout(() => setEstimationLoader(false), 1800);

        return () => {
            clearTimeout(timeout)
        }

    }, [mode, pressure, amountBaseTokenBalance, amountPairTokenBalance, marketMakingPool]);

    useEffect(() => {
        setTimeout(() => {
            setVisibleMagicModal(true);
        }, 600)
    })

    useEffect(() => {
        if (openMagicModal) {
            ReactGA.event({
                category: "Modal",
                action: "Open Modal",
                label: "How to"
            });
        }
    },[openMagicModal])
    const setMax = async (amount, setter) => {
        setter(amount);
    };

    const handleSetMode = (mode) => {
        setMode(mode);
    }

    const updateSettings = async () => {
        try {
            setIsLoading(true);
            const marketMakingSettings = {
                marketMakingType: mode,
                pressure,
                priceLimit,
                marketMakingPoolId: marketMakingPool.id,
                id: marketMakingSettingsId ? marketMakingSettingsId : "",
            };
            let id = await helper.marketMaking.updateMarketMakingSettings({
                marketMakingSettings, wallet, fresh
            });
            setIsLoading(false)
            if (fresh) {
                setFresh(false);
                setMarketMakingSettingsId(id)
            }
            ReactGA.event({
                category: 'Settings',
                action: 'Updated Settings - Sustainable Trading'
            });
        } catch (e) {
            setIsLoading(false)
        }

    };

    const AllowSelling = async () => {
        let success = helper.marketMaker.setAllowSelling(wallet, marketMakingPool.address, true);
        setFresh(false);
        ReactGA.event({
            category: 'Settings',
            action: 'Allowed Selling - Sustainable Trading'
        });
    };

    return !load ? <SkeletonMarketMaking/> : (
        <>
            {/* magic modal */}
            {visibleMagicModal &&
                <Modal
                    title={questions[magicQStep]}
                    open={openMagicModal}
                    handleClose={() => setOpenMagicModal(false)}
                >
                    {
                        magicQStep === 0 &&
                        <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-5">
                            <HomeCard
                                icon={<i className="fa-solid fa-money-check-pen text-2xl text-indigo-500"></i>}
                                title="Buy mode"
                                content={`I want to buy ${project.ticker}`}
                                handleClick={() => {
                                    setMode("buy");
                                    setMagicQStep(1);
                                }}
                            />

                            <HomeCard
                                icon={<i className="fa-solid fa-money-check-pen text-2xl text-indigo-500"></i>}
                                title="Sell mode"
                                content={`I want to sell ${project.ticker}`}                                handleClick={() => {
                                    setMode("sell");
                                    setMagicQStep(1);
                                }}
                            />
                        </div>
                    }
                    {
                        magicQStep === 1 &&
                        <div className="flex flex-col space-y-5">
                            <div className="flex flex-col space-y-8">
                                <span className="text-sm"><i className="fa-solid fa-circle-bolt"/> Pressure</span>
                                <RangeSlider setPercent={setPressure} percent={pressure}/>
                            </div>

                            <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-5">
                                <Button name="Previous" handleClick={() => setMagicQStep(0)}/>
                                <Button name="Next" handleClick={() => setMagicQStep(2)}/>
                            </div>
                        </div>
                    }
                    {
                        magicQStep === 2 &&
                        <div className="flex flex-col space-y-2.5">
                            <InputWithIconSubmit
                                id="priceLimit"
                                name="priceLimit"
                                type="number"
                                image={marketMakingPool.paired_token_image}
                                placeholder="Enter price"
                                icon="fa-light fa-circle-minus"
                                hideButton={true}
                                value={priceLimit}
                                setValue={setPriceLimit}
                            />

                            <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-5">
                                <Button name="Previous" handleClick={() => setMagicQStep(0)}/>
                                {allowSelling || mode === "buy" ?
                                    <Button name="Show Settings"
                                            isLoading={isLoading}
                                            disabled={isLoading}
                                            handleClick={() => setOpenMagicModal(false)}> <i className="pl-2 fa-solid fa-check-circle"/></Button>
                                    :
                                    <Button name="Allow sustainable selling" handleClick={(e) => {
                                        AllowSelling()
                                    }}> <i className="pl-2 fa-solid fa-arrow-down-to-arc"/></Button>
                                }
                            </div>
                        </div>
                    }
                </Modal>
            }
            <div className="grid md-lg:grid-cols-1 gap-7.5 max-w-[700px] lg:max-w-[900px] mx-auto">
                <Card title="Activity" className={''}>

                    {/* Card Header */}
                    <div className="card-header">
                        {mode === "sell" ? (
                            <KPIWrapper  cols={4}>
                                <KPICard image={project.image} end={activity.baseAmountSold} label={'Sold'}/>
                                <KPICard image={marketMakingPool.paired_token_image} end={activity.pairedAmountSold}
                                         label={'Bought'}/>
                                <KPICard image={marketMakingPool.paired_token_image}
                                         disableCount={true}
                                         end={activity.pairedAmountSold / activity.baseAmountSold}
                                         label={'Avg. Price'}/>
                                <KPICard image={project.image} end={activity.baseAllocationTrading}
                                         label={'Allocation'}/>
                            </KPIWrapper>
                        ) : (
                            <KPIWrapper  cols={4}>
                                <KPICard image={project.image} end={activity.baseAmountBought} label={'Bought'}/>
                                <KPICard image={marketMakingPool.paired_token_image} end={activity.pairedAmountBought}
                                         label={'Sold'}/>
                                <KPICard image={marketMakingPool.paired_token_image}
                                         end={activity.pairedAmountBought / activity.baseAmountBought}
                                         disableCount={true}
                                         label={'Avg. Price'}/>
                                <KPICard image={marketMakingPool.paired_token_image}
                                         end={activity.pairedAllocationTrading} label={'Allocation'}/>
                            </KPIWrapper>

                        )}


                        <div className="py-5.5 space-y-4.5 hidden">
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
                                <span className="text-sm"><i className="fa-solid fa-circle-minus"/> Allocated Trading Amount</span>
                                <span className="flex text-base font-medium">
                                    <Image src={project.image} alt="projectImage" width={24} height={24}/>
                                    <span className="mx-2.5">{activity.baseAllocationTrading} </span>
                                    <Image
                                        src={marketMakingPool.paired_token_image}
                                        alt="pairedTokenImage"
                                        width={24}
                                        height={24}
                                    />
                                    <span className="mx-2.5">{activity.pairedAllocationTrading}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card title="Settings">
                    {/* Card Header */}
                    <div className="card-header flex justify-between">
                        <h1 className="text-2xl"><i className="fa-solid fa-sliders"/> Settings</h1>
                        <div
                            className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 shadow-lg rounded-full flex items-center justify-center hover:cursor-pointer"
                            onClick={() => setOpenMagicModal(true)}
                        >
                            <i className="fa-solid fa-wand-magic-sparkles text-md"/>
                        </div>
                    </div>

                    <div className="card-content pt-5.5 space-y-5">
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
                        <div className="grid md-lg:grid-cols-2 md-lg:h-20 gap-5">
                            <div className="flex flex-col space-y-8">
                                <span className="text-sm"><i className="fa-solid fa-circle-bolt"/> Pressure</span>
                                <RangeSlider setPercent={setPressure} percent={pressure}/>
                            </div>
                            <div
                                className={`${estimationLoader ? 'space-y-5' : 'space-y-5'} ${estimation === '- Days' ? 'hidden' : ''}`}>
                                <span className="text-sm"><i className="fa-solid fa-timer"/> Estimation</span>
                                {
                                    estimationLoader ?
                                        <div className={'flex flex-row'}>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <small>Calculating Estimation</small>
                                        </div>
                                        :
                                        <p>{estimation}</p>

                                }
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div className="flex flex-row items-center justify-between text-base">
                                   <span className="text-sm"><i className="fa-solid fa-circle-dollar"/>
                                       {mode === "buy" ? " Maximum Buying Price" : " Minimum Selling Price"}
                            </span>
                                <div className="flex items-center gap-1">

                                    {
                                        mode === "buy" ?
                                            <span className={`text-sm relative space-x-1`}>Current Price:
                                                <span
                                                    className={`ml-1 text-balance transition-all delay-300 ${Number(priceLimit) >= Number(tokenPrice) ? 'text-green-600' : 'text-red-600'}`}>{tokenPrice}</span>
                                                {
                                                    Number(priceLimit) >= Number(tokenPrice) ?
                                                        <span className="relative  flex-row group">
                                                     <i className="fa-solid fa-check-circle fa-xs text-green-400 transition-all delay-300"></i>
                                                    <Tooltip className={' py-0.5'} title={'Above Current Price'}/>
                                                </span> : <span className="relative  flex-row group">
                                                     <i className="fa-solid fa-warning fa-xs text-amber-500 transition-all delay-300"></i>
                                                    <Tooltip className={' py-0.5'} title={'Below Current Price'}/>
                                                </span>
                                                }

                                            </span> :

                                            <span className={`text-sm space-x-1 relative`}>Current Price:
                                            <span
                                                className={`ml-1 text-balance transition-all delay-300 ${Number(priceLimit) <= Number(tokenPrice) ? 'text-green-600' : 'text-red-600'}`}>{tokenPrice}</span>
                                                {
                                                    Number(priceLimit) <= Number(tokenPrice) ?
                                                        <span className="relative  flex-row group">
                                                     <i className="fa-solid fa-check-circle fa-xs text-green-400 transition-all delay-300"></i>
                                                    <Tooltip className={' py-0.5'} title={'Below Current Price'}/>
                                                </span> : <span className="relative  flex-row group">
                                                     <i className="fa-solid fa-warning fa-xs text-amber-500 transition-all delay-300"></i>
                                                    <Tooltip className={' py-0.5'} title={'Above Current Price'}/>
                                                </span>
                                                }
                                        </span>

                                    }

                                </div>

                            </div>

                            <InputWithIconSubmit
                                id="priceLimit"
                                name="priceLimit"
                                type="number"
                                image={marketMakingPool.paired_token_image}
                                placeholder="Enter price"
                                icon="fa-light fa-circle-minus"
                                hideButton={true}
                                value={priceLimit}
                                setValue={setPriceLimit}
                            />
                        </div>
                        {
                            (priceLimit === '0' || priceLimit === 0) && <div className="text-center py-4 lg:px-4">
                                <div
                                    className="p-2 bg-gray-100 items-center text-black leading-none lg:rounded-full flex lg:inline-flex"
                                    role="alert">
                                                <span
                                                    className="flex rounded-full bg-gray-300 uppercase px-2 py-1 text-xs mr-3">Note</span>
                                    <span className=" mr-2 text-left flex-auto">If your price limit is saved on 0, buys & sells will be executed on the current market prices.</span>
                                </div>
                            </div>
                        }

                        {allowSelling || mode === "buy" ?
                            <Button name="Save Settings"
                                    isLoading={isLoading}
                                    disabled={isLoading || !touchedSettings}
                                    handleClick={(e) => {
                                        updateSettings()
                                    }}> <i className="pl-2 fa-solid fa-arrow-down-to-arc"/></Button>
                            :
                            <Button name="Allow sustainable selling" handleClick={(e) => {
                                AllowSelling()
                            }}> <i className="pl-2 fa-solid fa-arrow-down-to-arc"/></Button>
                        }
                    </div>
                </Card>
            </div>
        </>
    )
}