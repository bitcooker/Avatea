import Button from "../../core/Button/Button";
import {useWallet} from "use-wallet";
import MaxButton from "../projects/Button/MaxButton";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";
import Card from "../projectDetail/Card/Card";
import {useCallback, useEffect, useState} from "react";
import helper from "../../../helpers";
import {ethers} from "ethers";
import moment from "moment";
import {AVATEA_TOKEN, AVATEA_TOKEN_IMAGE, PAIRED_TOKEN_DEFAULT_IMAGE} from "../../../helpers/constants";


export default function LiquidityMakerCard({project, liquidityMaker}) {

    const wallet = useWallet();

    const [rewardTokenWalletBalance, setRewardTokenWalletBalance] = useState("0");
    const [amountRewardTokenToStake, setAmountRewardTokenToStake] = useState("0");

    const [liquidityAddress, setLiquidityAddress] = useState("");
    const [liquidityRewardTokenWalletBalance, setLiquidityRewardTokenWalletBalance] = useState("0");
    const [amountLiquidityRewardTokenToStake, setAmountLiquidityRewardTokenToStake] = useState("0");


    const [baseTotalSupply, setBaseTotalSupply] = useState('0');
    const [pairedTotalSupply, setPairedTotalSupply] = useState('0');
    const [lockingPeriod, setLockingPeriod] = useState('0');
    const [rewardPerToken, setRewardPerToken] = useState('0');
    const [liquidityRewardPerToken, setLiquidityRewardPerToken] = useState('0');


    useEffect(() => {
        if (wallet.status === "connected" && liquidityMaker.address) {
            const initWalletConnected = async () => {

                setRewardPerToken(
                    await helper.web3.liquidityMaker.rewardPerToken(wallet, liquidityMaker.address)
                );
                setLiquidityRewardPerToken(
                    await helper.web3.liquidityMaker.liquidityRewardPerToken(wallet, liquidityMaker.address)
                );
                setLockingPeriod(
                    Number(await helper.web3.liquidityMaker.getLockingPeriod(wallet, liquidityMaker.address))
                );

                setLiquidityAddress(
                    await helper.web3.liquidityMaker.getPairAddress(wallet, liquidityMaker.address)
                );

                let TVL = await helper.web3.liquidityMaker.getTVL(wallet, liquidityMaker.address, project.token, liquidityMaker.paired_token)
                setBaseTotalSupply(helper.formatting.web3Format(TVL.baseValue));
                setPairedTotalSupply(helper.formatting.web3Format(TVL.pairedValue));


                setRewardTokenWalletBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(wallet, AVATEA_TOKEN, wallet.account)
                    )
                );

            };
            initWalletConnected();
        }
    }, [wallet, liquidityMaker, project]);

    const addReward = useCallback(async () => {
        const wei = ethers.utils.parseEther(amountRewardTokenToStake);
        let success = await helper.web3.liquidityMaker.addReward(wallet, liquidityMaker.address, wei);
    }, [amountRewardTokenToStake, wallet, liquidityMaker]);


    const addLiquidityReward = useCallback(async () => {
        const wei = ethers.utils.parseEther(amountLiquidityRewardTokenToStake);
        let success = await helper.web3.liquidityMaker.addLiquidityReward(wallet, liquidityMaker.address, wei);
    }, [amountLiquidityRewardTokenToStake, wallet, liquidityMaker]);


    useEffect(() => {
        if (wallet.status === "connected" && liquidityAddress) {
            const LiquidityRewardToken = async () => {
                setLiquidityRewardTokenWalletBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(wallet, liquidityAddress, wallet.account)
                    )
                );
            };
            LiquidityRewardToken();
        }
    }, [wallet, liquidityMaker, liquidityAddress]);

    const setLiquidityRewardTokenWalletBalanceCallBack = useCallback(async () => {
        setLiquidityRewardTokenWalletBalance(
            helper.formatting.web3Format(
                await helper.token.balanceOf(wallet, liquidityAddress, wallet.account)
            )
        );
    }, [liquidityAddress]);


    const setMax = useCallback(async (amount, setter) => {
        setter(amount);
    }, []);

    return (

        <Card className={'col-span-full md:col-span-1'}>
            {liquidityMaker.address ? (
                <div className="flex flex-col p-3.75 space-y-4">
                    <h2 className="text-2xl"><i className="fa-solid fa-nfc-lock"/> Liquidity Maker</h2>
                    <div className="flex justify-between">
                        <span className="text-sm"><i className="fa-solid fa-clock"/> Locking Period</span>
                        <span className="text-base font-medium">{moment(lockingPeriod).fromNow()}</span>
                    </div>
                    <div className="flex justify-between">
                                <span className="text-sm"><i
                                    className="fa-solid fa-treasure-chest"/> Total Value Locked</span>
                        <span className="flex text-base font-medium">
                        <img src={project.image} className="w-6 h-6 mr-2.5"/>
                            {baseTotalSupply}
                            <img
                                src={liquidityMaker.paired_token_image}
                                className="w-6 h-6 ml-2.5 mr-2.5"
                            />{" "}
                            {pairedTotalSupply}
                      </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm"><i
                            className="fa-solid fa-hands-holding-dollar"/> Reward Per Token</span>
                        <span className="text-base font-medium">{rewardPerToken}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm"><i className="fa-solid fa-hands-holding-dollar"/> Liquidity Reward Per Token</span>
                        <span className="text-base font-medium">{liquidityRewardPerToken}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between text-base">
                        <div>
                            <i className="fa-solid fa-coin"/> Add rewards
                        </div>
                        <span>
                            <MaxButton
                                handleClick={() =>
                                    setMax(
                                        rewardTokenWalletBalance,
                                        setAmountRewardTokenToStake
                                    )
                                }
                            /> <span className={'pr-0.5'}></span>
                            {rewardTokenWalletBalance}

                      </span>
                    </div>
                    <InputApproveWithIconSubmit
                        id="cash"
                        name="cash"
                        type="number"
                        icon="fa-light fa-circle-plus"
                        submitName="Deposit"
                        image={AVATEA_TOKEN_IMAGE}
                        submitFunction={addReward}
                        value={amountRewardTokenToStake}
                        setValue={setAmountRewardTokenToStake}
                        address={liquidityMaker.address}
                        token={AVATEA_TOKEN}
                    />
                    <div className="flex flex-row items-center justify-between text-base">
                        <div>
                            <i className="fa-solid fa-coin"/> Add Liquidity rewards
                        </div>
                        <span>
                            <MaxButton
                                handleClick={() =>
                                    setMax(
                                        liquidityRewardTokenWalletBalance,
                                        setAmountLiquidityRewardTokenToStake
                                    )
                                }
                            /> <span className={'pr-0.5'}></span>
                            {liquidityRewardTokenWalletBalance}

                      </span>
                    </div>
                    <InputApproveWithIconSubmit
                        id="cash"
                        name="cash"
                        type="number"
                        icon="fa-light fa-circle-plus"
                        submitName="Deposit"
                        image={PAIRED_TOKEN_DEFAULT_IMAGE}
                        submitFunction={addLiquidityReward}
                        value={amountLiquidityRewardTokenToStake}
                        setValue={setAmountLiquidityRewardTokenToStake}
                        address={liquidityMaker.address}

                        token={liquidityAddress && liquidityAddress}

                    />
                </div>
            ) : (
                <div className="flex flex-col p-3.75 space-y-4">
                    <h1 className="text-2xl text-center"><i className="fa-solid fa-nfc-lock"/> liquidityMaker</h1>
                    <div className="bg-gray-200 border border-gray-400 px-4 py-3 rounded relative text-center"
                         role="alert">
                        <span>No liquidity maker created yet</span>

                    </div>
                    <Button name="Request a liquidity maker"/>
                </div>
            )}
        </Card>

    )
}