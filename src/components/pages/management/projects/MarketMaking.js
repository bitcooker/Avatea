import Card from "../projectDetail/Card/Card";
import MaxButton from "./Button/MaxButton";
import InputWithIconSubmit from "../../../core/Input/InputWithIconSubmit";
import RangeSlider from "../../../core/RangeSlider/RangeSlider";
import InputEmpty from "../../../core/Input/InputEmpty";
import Radio from "../../../core/Radio/Radio";
import Button from "../../../core/Button/Button";
import InputApproveWithIconSubmit from "../../../core/Input/InputApproveWithIconSubmit";
import {useState, useEffect, useCallback} from "react";
import {ethers} from "ethers";
import helper from "../../../../helpers";

export default function MarketMaking({vault, wallet, project, marketMakingPool}) {

    const [amountBaseTokenBalance, setAmountBaseTokenBalance] = useState('0');
    const [amountPairTokenBalance, setAmountPairTokenBalance] = useState('0');
    const [amountBaseTokenToWithdraw, setAmountBaseTokenToWithdraw] = useState('0');
    const [amountPairTokenToWithdraw, setAmountPairTokenToWithdraw] = useState('0');
    const [amountBaseTokenToStake, setAmountBaseTokenToStake] = useState('0');
    const [amountPairTokenToStake, setAmountPairTokenToStake] = useState('0');
    const [baseTokenWalletBalance, setBaseTokenWalletBalance] = useState('0');
    const [pairedTokenWalletBalance, setPairedTokenWalletBalance] = useState('0');
    const [pressure, setPressure] = useState(0);
    const [priceLimit, setPriceLimit] = useState(null);
    const [fresh, setFresh] = useState(false);
    const [marketMakingSettingsId, setMarketMakingSettingsId] = useState(null);
    const [mode, setMode] = useState("sell");
    const [estimation, setEstimation] = useState("- Days");
    const [activity,setActivity]  = useState({baseAmountBought:'0', pairedAmountBought:'0', baseAmountSold: '0', pairedAmountSold: '0'})

    useEffect(() => {
        if (wallet.status === "connected" && marketMakingPool.paired_token) {
            const initWalletConnected = async () => {
                setBaseTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, project.token, wallet.account)));
                setPairedTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, marketMakingPool.paired_token, wallet.account)));
                const {available, baseAmountBought, pairedAmountBought, baseAmountSold, pairedAmountSold} = await helper.web3.marketMaker.fetchHoldersMapping(wallet, marketMakingPool.address);
                setActivity({
                    baseAmountBought: helper.formatting.web3Format(baseAmountBought),
                    pairedAmountBought: helper.formatting.web3Format(pairedAmountBought),
                    baseAmountSold: helper.formatting.web3Format(baseAmountSold),
                    pairedAmountSold: helper.formatting.web3Format(pairedAmountSold)
                })
                setAmountBaseTokenBalance(helper.formatting.web3Format(available));
                setAmountPairTokenBalance(helper.formatting.web3Format(await helper.web3.marketMaker.getWithdrawablePairedTokens(wallet, marketMakingPool.address, wallet.account)));
            };
            initWalletConnected();
        }
    }, [wallet, vault, marketMakingPool,project]);

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
                    setMode(market_making_type === null ? "sell" : market_making_type);
                    setPressure(buy_sell_pressure === null ? 0 : buy_sell_pressure);
                    setPriceLimit(price_limit === null ? 0 : price_limit);
                }
            };
            initWalletConnected();
        }
    }, [wallet,project]);

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

    const setMax = useCallback(async (amount, setter) => {
        setter(amount);
    },[]);

    const handleSetMode = useCallback((mode) => {
        setMode(mode);
    }, []);

    const updateSettings = useCallback(async (amount = 0) => {
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
    },[mode, pressure, priceLimit, marketMakingPool, marketMakingSettingsId, wallet,fresh]);


    const withdrawPairToken = useCallback(async () => {
        let full_withdrawal = parseFloat(amountPairTokenToWithdraw) === parseFloat(amountPairTokenBalance) && parseFloat(amountBaseTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountPairTokenToWithdraw);
        let success = await helper.web3.marketMaker.withdrawPairToken(wallet, marketMakingPool.address, wei, full_withdrawal);
        if (mode === 'buy' && success) {
            await updateSettings((parseFloat(amountPairTokenBalance) - parseFloat(amountPairTokenToWithdraw)))
        }
    },[mode,amountPairTokenToWithdraw,amountPairTokenBalance,amountBaseTokenBalance,wallet,marketMakingPool, updateSettings]);

    const withdrawBaseToken = useCallback(async () => {
        let full_withdrawal = parseFloat(amountBaseTokenToWithdraw) === parseFloat(amountBaseTokenBalance) && parseFloat(amountPairTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountBaseTokenToWithdraw);
        let success = await helper.marketMaker.withdrawBaseToken(wallet, marketMakingPool.address, wei, full_withdrawal);
        if (mode === 'sell' && success) {
            await updateSettings((parseFloat(amountBaseTokenBalance) - parseFloat(amountBaseTokenToWithdraw)));
        }
    },[mode,amountBaseTokenToWithdraw,amountBaseTokenBalance,amountPairTokenBalance,wallet,marketMakingPool, updateSettings]);


    const stakePairedToken = useCallback(async () => {
        const wei = ethers.utils.parseEther(amountPairTokenToStake);
        let success = await helper.web3.marketMaker.stakePairedToken(wallet, marketMakingPool.address, wei);
        if (success) await updateSettings((parseFloat(amountPairTokenBalance) + parseFloat(amountPairTokenToStake)))
    },[amountPairTokenToStake,wallet,marketMakingPool,amountPairTokenBalance,updateSettings]);


    const stakeMarketMaker = useCallback(async () => {
        const wei = ethers.utils.parseEther(amountBaseTokenToStake);
        let success = await helper.marketMaker.stake(wallet, marketMakingPool.address, wei);
        if (success) await updateSettings(parseFloat(amountBaseTokenBalance) + parseFloat(amountBaseTokenToStake))
    },[amountBaseTokenBalance,amountBaseTokenToStake,wallet,marketMakingPool,updateSettings]);

    return (
        <div className="grid md-lg:grid-cols-2 gap-7.5">
        <Card title="Activity">
            {/* Card Header */}
            <div className="card-header">
                <h1 className="text-2xl"><i className="fa-solid fa-wave-pulse"></i> Activity</h1>

                <div className="py-5.5 space-y-4.5">
                    <div className="flex justify-between">
                        <span className="text-sm"><i className="fa-solid fa-circle-minus"/> Sold</span>
                        <span className="flex text-base font-medium">
                    <img
                        src={project.image}
                        className="w-6 h-6 mr-2.5"
                    />
                            {activity.baseAmountSold} <img
                            src={marketMakingPool.paired_token_image}
                            className="w-6 h-6 ml-2.5 mr-2.5"
                        /> {activity.pairedAmountSold}
                  </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm"><i className="fa-solid fa-circle-plus"/> Bought</span>
                        <span className="flex text-base font-medium">
                    <img
                        src={project.image}
                        className="w-6 h-6 mr-2.5"
                    />
                            {activity.baseAmountBought} <img
                            src={marketMakingPool.paired_token_image}
                            className="w-6 h-6 ml-2.5 mr-2.5"
                        /> {activity.pairedAmountBought}
                  </span>
                    </div>
                </div>
            </div>

            <div className="card-content space-y-5">
                <div className="space-y-3.75">
                    <div className="space-y-2.5">
                        <div className="flex flex-row items-center justify-between text-base">
                            <div>
                                <i className="fa-solid fa-circle-dollar mr-1" />
                                Cash
                            </div>
                            <span>
                      {amountPairTokenBalance} &nbsp;
                                <MaxButton
                                    handleClick={() => setMax(amountPairTokenBalance, setAmountPairTokenToWithdraw)}
                                />
                    </span>
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
                                <i className="fa-solid fa-coin mr-1" />
                                Tokens
                            </div>
                            <span>
                      {amountBaseTokenBalance} &nbsp;
                                <MaxButton
                                    handleClick={() => setMax(amountBaseTokenBalance, setAmountBaseTokenToWithdraw)}
                                />
                    </span>
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
                <div className=" grid md-lg:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-10">
                        <span className="text-sm"><i className="fa-solid fa-circle-bolt" /> Pressure</span>
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
                  <span className="text-sm"><i className="fa-solid fa-circle-dollar" />
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
                <Button name="Save Settings" handleClick={(e) => {
                    updateSettings(mode === 'sell' ? amountBaseTokenBalance : amountPairTokenBalance)
                }}> <i className="pl-2 fa-solid fa-arrow-down-to-arc"/></Button>

                <div className="card-content pt-1 space-y-3.75">
                    {mode === "buy" && (<div className="space-y-2.5">
                        <div className="flex flex-row items-center justify-between text-base">
                            <div>
                                <i className="fa-solid fa-coin" /> Cash
                            </div>
                            <span>
                        {pairedTokenWalletBalance} &nbsp;
                                <MaxButton
                                    handleClick={() => setMax(pairedTokenWalletBalance, setAmountPairTokenToStake)}
                                />
                      </span>
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
                                <i className="fa-solid fa-coin" /> Token
                            </div>
                            <span>
                        {baseTokenWalletBalance} &nbsp;
                                <MaxButton
                                    handleClick={() => setMax(baseTokenWalletBalance, setAmountBaseTokenToStake)}
                                />
                      </span>
                        </div>
                        <InputApproveWithIconSubmit
                            id="token"
                            name="token"
                            type="number"
                            icon="fa-light fa-circle-plus"
                            submitName="Deposit"
                            image={project.image}
                            submitFunction={stakeMarketMaker}
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