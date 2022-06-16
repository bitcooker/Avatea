import Card from "../projectDetail/Card/Card";
import MaxButton from "./Button/MaxButton";
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";
import RangeSlider from "../../core/RangeSlider/RangeSlider";
import InputEmpty from "../../core/Input/InputEmpty";
import Radio from "../../core/Radio/Radio";
import Button from "../../core/Button/Button";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";
import {useState, useEffect, useCallback} from "react";
import {ethers} from "ethers";
import helper from "../../../helpers";

export default function MarketMaking({ vault, wallet, project, marketMakingPool }) {

    const [amountPairTokenBalance, setAmountPairTokenBalance] = useState('0');
    const [amountPairToken, setAmountPairToken] = useState('0');
    const [amountBaseTokenBalance, setAmountBaseTokenBalance] = useState('0');
    const [amountBaseToken, setAmountBaseToken] = useState('0');
    const [pressure, setPressure] = useState(0);
    const [amountToStake, setAmountToStake] = useState('0');
    const [projectTokenBalance, setProjectTokenBalance] = useState('0');
    const [amountPairTokenToStake, setAmountPairTokenToStake] = useState('0');
    const [pairedTokenWalletBalance, setPairedTokenWalletBalance] = useState('0');
    const [priceLimit, setPriceLimit] = useState(null);
    const [fresh, setFresh] = useState(false);
    const [marketMakingSettingsId, setMarketMakingSettingsId] = useState(null);
    const [mode, setMode] = useState("hold");
    const [estimation, setEstimation] = useState("- Days");

    useEffect(() => {
        if (wallet.status === "connected" && marketMakingPool.paired_token) {
            const initWalletConnected = async () => {
                setAmountPairTokenBalance(
                    helper.formatting.web3Format(
                        await helper.web3.marketMaker.getWithdrawablePairedTokens(
                            wallet,
                            marketMakingPool.address,
                            wallet.account
                        )
                    )
                );

                setPairedTokenWalletBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(wallet, marketMakingPool.paired_token)
                    )
                );
                setProjectTokenBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(wallet, project.token)
                    )
                );

                const { available } =
                    await helper.web3.marketMaker.fetchHoldersMapping(
                        wallet,
                        marketMakingPool.address
                    );
                setAmountBaseTokenBalance(helper.formatting.web3Format(available));
            };
            initWalletConnected();
        }
    }, [wallet, vault, marketMakingPool]);

    useEffect(() => {
        if (wallet.status === "connected") {
            const initWalletConnected = async () => {
                //@TODO Wire Chain ID for production
                const marketMakingSettings =
                    await helper.marketMaking.getMarketMakingSettings({
                        slug: project.slug,
                        user_address: wallet.account,
                    });
                if (marketMakingSettings) {
                    const {
                        market_making_type,
                        buy_sell_pressure,
                        price_limit,
                        id,
                    } = marketMakingSettings;
                    if (!market_making_type) setFresh(true);
                    setMarketMakingSettingsId(id);
                    setMode(market_making_type === null ? "hold" : market_making_type);
                    setPressure(buy_sell_pressure === null ? 0 : buy_sell_pressure);
                    setPriceLimit(price_limit === null ? 0 : price_limit);
                }
            };
            initWalletConnected();
        }
    }, [wallet]);

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
            let balance = parseFloat(amountBaseTokenBalance) + parseFloat(amountToStake ? amountToStake : 0)
            let days = balance / (max_selling_amount * pressure / 100)
            days = Math.round(days * 10) / 10
            setEstimation(days + ' Days')
        } else {
            setEstimation('- Days')
        }

    }, [mode, pressure, amountPairTokenToStake, amountToStake, marketMakingPool.max_buying_amount]);

    const setMax = async (amount, setter) => {
        setter(amount);
    };

    const handleSetMode = useCallback((mode) => {
        setMode(mode);
    }, []);

    const stakePairedToken = async () => {
        const wei = ethers.utils.parseEther(amountPairTokenToStake);
        await helper.web3.marketMaker.stakePairedToken(
            wallet,
            marketMakingPool.address,
            wei
        );
        await updateSettings((parseFloat(amountPairTokenBalance) + parseFloat(amountPairTokenToStake)))
    };

    const withdrawPairToken = async () => {
        let full_withdrawal =
            parseFloat(amountPairToken) === parseFloat(amountPairTokenBalance) &&
            parseFloat(amountBaseTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountPairToken);
        await helper.web3.marketMaker.withdrawPairToken(
            wallet,
            marketMakingPool.address,
            wei,
            full_withdrawal
        );
        if(mode === 'buy') {
            await updateSettings((parseFloat(amountPairTokenBalance) - parseFloat(amountPairToken)))
        }
    };

    const withdrawBaseToken = async () => {
        let full_withdrawal =
            parseFloat(amountBaseToken) === parseFloat(amountBaseTokenBalance) &&
            parseFloat(amountPairTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountBaseToken);
        await helper.marketMaker.withdrawBaseToken(
            wallet,
            marketMakingPool.address,
            wei,
            full_withdrawal
        );
        if(mode === 'sell') {
            await updateSettings((parseFloat(amountBaseTokenBalance) - parseFloat(amountBaseToken)));
        }
    };

    const updateSettings = async (amount = 0) => {
        const marketMakingSettings = {
            marketMakingType: mode,
            amountSettings: amount,
            pressure,
            priceLimit,
            marketMakingPoolId: marketMakingPool.id,
            id: marketMakingSettingsId ? marketMakingSettingsId : "",
        };
        console.log(marketMakingSettings)
        await helper.marketMaking.updateMarketMakingSettings({
            marketMakingSettings,
            wallet,
            fresh
        });
    };

    const stakeMarketMaker = async () => {
        console.log(parseFloat(amountBaseTokenBalance) + parseFloat(amountToStake))
        const wei = ethers.utils.parseEther(amountToStake);
        await helper.marketMaker.stake(wallet, marketMakingPool.address, wei);
        await updateSettings(parseFloat(amountBaseTokenBalance) + parseFloat(amountToStake))
    };

    return (
        <div className="grid md-lg:grid-cols-2 gap-7.5">
            <Card title="Activity">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl">Activity</h1>

                    <div className="py-5.5 space-y-4.5">
                        <div className="flex justify-between">
                            <span className="text-sm">Sold</span>
                            <span className="flex text-base font-medium">
                    <img
                        src="/coins/maticIcon.png"
                        className="w-6 h-6 mr-2.5"
                    />
                    100.00
                  </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Bought</span>
                            <span className="flex text-base font-medium">
                    <img
                        src="/coins/maticIcon.png"
                        className="w-6 h-6 mr-2.5"
                    />
                    100.00
                  </span>
                        </div>
                    </div>
                </div>

                <div className="card-content space-y-5">
                    <div className="space-y-3.75">
                        <div className="space-y-2.5">
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-regular fa-money-bills-simple mr-1"></i>
                                    Cash
                                </div>
                                <span>
                      {amountPairTokenBalance} &nbsp;
                                    <MaxButton
                                        handleClick={() =>
                                            setMax(amountPairTokenBalance, setAmountPairToken)
                                        }
                                    />
                    </span>
                            </div>
                            <InputWithIconSubmit
                                id="withdrawCash"
                                name="withdrawCash"
                                type="number"
                                placeholder="Input amount to withdraw"
                                submitName="Withdraw"
                                icon="fa-light fa-circle-minus"
                                value={amountPairToken}
                                setValue={setAmountPairToken}
                                submitFunction={withdrawPairToken}
                            />
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-regular fa-hexagon-vertical-nft mr-1"></i>
                                    Tokens
                                </div>
                                <span>
                      {amountBaseTokenBalance} &nbsp;
                                    <MaxButton
                                        handleClick={() =>
                                            setMax(amountBaseTokenBalance, setAmountBaseToken)
                                        }
                                    />
                    </span>
                            </div>
                            <InputWithIconSubmit
                                id="withdrawToken"
                                name="withdrawToken"
                                type="number"
                                placeholder="Input amount to withdraw"
                                submitName="Withdraw"
                                icon="fa-light fa-circle-minus"
                                value={amountBaseToken}
                                setValue={setAmountBaseToken}
                                submitFunction={withdrawBaseToken}
                            />
                        </div>
                    </div>
                </div>
            </Card>
            <Card title="Settings">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl">Settings</h1>
                </div>

                <div className="card-content pt-5.5 space-y-5">
                    <div className=" grid md-lg:grid-cols-2 gap-5">
                        <div className="flex flex-col space-y-10">
                            <span className="text-sm">Pressure Slider</span>
                            <RangeSlider setPercent={setPressure} percent={pressure} />
                        </div>
                        <div className="space-y-2.5">
                            <span className="text-sm">Estimation</span>
                            <InputEmpty placeholder={estimation} readOnly />
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <span className="text-sm">Mode</span>
                        <div className="grid grid-cols-2 md-lg:grid-cols-3 gap-x-4 gap-y-2.5">
                            <Radio
                                name="mode"
                                label="Buy"
                                value={"buy"}
                                checked={mode === "buy"}
                                handleSetMode={handleSetMode}
                            />
                            <Radio
                                name="mode"
                                label="Hold"
                                value={"hold"}
                                checked={mode === "hold"}
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
                    {mode !== "hold" ? (
                        <div className="space-y-2.5">
                  <span className="text-sm">
                    {mode === "buy"
                        ? "Maximum Buying Price"
                        : "Minimum Selling Price"}
                  </span>
                            <InputWithIconSubmit
                                id="priceLimit"
                                name="priceLimit"
                                type="number"
                                placeholder="Enter price"
                                icon="fa-light fa-circle-minus"
                                hideButton={true}
                                value={priceLimit}
                                setValue={setPriceLimit}
                            />
                        </div>
                    ) : (
                        ""
                    )}

                    <Button name="Save Settings" handleClick={updateSettings} />

                    <div className="card-content pt-1 space-y-3.75">
                        {mode == "buy" && (
                            <div className="space-y-2.5">
                                <div className="flex flex-row items-center justify-between text-base">
                                    <div>
                                        <i className="fa-regular fa-money-bills-simple mr-1"></i>
                                        Cash
                                    </div>
                                    <span>
                        {pairedTokenWalletBalance} &nbsp;
                                        <MaxButton
                                            handleClick={() =>
                                                setMax(
                                                    pairedTokenWalletBalance,
                                                    setAmountPairTokenToStake
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
                                    submitName="Deposit"
                                    submitFunction={stakePairedToken}
                                    value={amountPairTokenToStake}
                                    setValue={setAmountPairTokenToStake}
                                    address={marketMakingPool.address}
                                    token={marketMakingPool.paired_token}
                                />
                            </div>
                        )}

                        {mode == "sell" && (
                            <div className="space-y-2.5">
                                <div className="flex flex-row items-center justify-between text-base">
                                    <div>
                                        <i className="fa-regular fa-hexagon-vertical-nft mr-1"></i>
                                        Token
                                    </div>
                                    <span>
                        {projectTokenBalance} &nbsp;
                                        <MaxButton
                                            handleClick={() =>
                                                setMax(projectTokenBalance, setAmountToStake)
                                            }
                                        />
                      </span>
                                </div>
                                <InputApproveWithIconSubmit
                                    id="token"
                                    name="token"
                                    type="number"
                                    icon="fa-light fa-circle-plus"
                                    submitName="Deposit"
                                    submitFunction={stakeMarketMaker}
                                    value={amountToStake}
                                    setValue={setAmountToStake}
                                    address={marketMakingPool.address}
                                    token={project.token}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}