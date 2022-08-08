import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {useWallet} from "@albs1/use-wallet";
import {ethers} from "ethers";
import moment from "moment";

import helper from "../../../helpers";
import {AVATEA_TOKEN, AVATEA_TOKEN_IMAGE, PAIRED_TOKEN_DEFAULT_IMAGE} from "../../../helpers/constants";

// core components
import Button from "../../core/Button/Button";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";
import InputTime from "../../core/Input/InputTime";

// page components
import MaxButton from "../projects/Button/MaxButton";
import Card from "../projectDetail/Card/Card";


export default function LiquidityMakerCard({project, liquidityMaker}) {

    const wallet = useWallet();

    const [rewardTokenWalletBalance, setRewardTokenWalletBalance] = useState("0");
    const [amountRewardTokenToStake, setAmountRewardTokenToStake] = useState("0");

    const [liquidityRewardTokenWalletBalance, setLiquidityRewardTokenWalletBalance] = useState("0");
    const [amountLiquidityRewardTokenToStake, setAmountLiquidityRewardTokenToStake] = useState("0");

    const [baseTotalSupply, setBaseTotalSupply] = useState('0');
    const [pairedTotalSupply, setPairedTotalSupply] = useState('0');
    const [lockingPeriod, setLockingPeriod] = useState('0');
    const [newLockingPeriod, setNewLockingPeriod] = useState('0');
    const [newLockingPeriodInDays, setNewLockingPeriodInDays] = useState('0');
    const [maxTotalSupply, setMaxTotalSupply] = useState('0');
    const [newMaxTotalSupply, setNewMaxTotalSupply] = useState('0');

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

                let lockingPeriod = Number(await helper.web3.liquidityMaker.getLockingPeriod(wallet, liquidityMaker.address));
                setLockingPeriod(lockingPeriod);
                setNewLockingPeriod(lockingPeriod);

                let maxTotalSupply = helper.formatting.web3Format((await helper.web3.liquidityMaker.maxTotalSupply(wallet, liquidityMaker.address)));
                setMaxTotalSupply(maxTotalSupply);
                setNewMaxTotalSupply(maxTotalSupply);

                let TVL = await helper.web3.liquidityMaker.getTVL(wallet, liquidityMaker.address, project.token, liquidityMaker.paired_token)
                setBaseTotalSupply(helper.formatting.web3Format(TVL.baseValue));
                setPairedTotalSupply(helper.formatting.web3Format(TVL.pairedValue));


                setRewardTokenWalletBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(wallet, AVATEA_TOKEN, wallet.account)
                    )
                );

                setLiquidityRewardTokenWalletBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(wallet, liquidityMaker.pair_address, wallet.account)
                    )
                );

            };
            initWalletConnected();
        }
    }, [wallet, liquidityMaker, project]);

    useEffect(() => {
        setNewLockingPeriodInDays(helper.formatting.secondFormat(newLockingPeriod, true))
    }, [newLockingPeriod]);


    const addReward = async () => {
        const wei = ethers.utils.parseEther(amountRewardTokenToStake);
        let success = await helper.web3.liquidityMaker.addReward(wallet, liquidityMaker.address, wei);
    };

    const addLiquidityReward = async () => {
        const wei = ethers.utils.parseEther(amountLiquidityRewardTokenToStake);
        let success = await helper.web3.liquidityMaker.addLiquidityReward(wallet, liquidityMaker.address, wei);
    };


    const setMax = useCallback(async (amount, setter) => {
        setter(amount);
    }, []);

    const updateMaxTotalSupply = async () => {
        const wei = ethers.utils.parseEther(newMaxTotalSupply);
        let success = await helper.web3.liquidityMaker.setMaxTotalSupply(wallet, liquidityMaker.address, wei);
    };


    const updateLockingPeriod = async () => {
        let success = await helper.web3.liquidityMaker.setLockingPeriod(wallet, liquidityMaker.address, newLockingPeriod);
    };


    return (

        <Card className={'col-span-full md:col-span-1'}>
            {liquidityMaker.address ? (
                <div className="flex flex-col p-3.75 space-y-4">
                    <h2 className="text-2xl"><i className="fa-solid fa-nfc-lock"/> Liquidity Maker</h2>
                    <div className="flex justify-between">
                        <span className="text-sm"><i className="fa-solid fa-users"/> Users Staked</span>
                        <span className="text-base font-medium">
                      {liquidityMaker.num_invested}
                    </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm"><i className="fa-solid fa-clock"/> Locking Period</span>
                        <span
                            className="text-base font-medium">{parseInt(moment.duration(lockingPeriod, 'seconds').asDays())} days and
                            {" "}{parseInt(moment.duration(lockingPeriod, 'seconds').asHours()) % 24} hours
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm">
                            <i className="fa-solid fa-treasure-chest"/> Total Value Locked</span>
                        <span className="flex text-base font-medium">
                        <div className="flex items-center">
                            <Image src={project.image} alt="tokenImage" width={24} height={24}/>
                            <span className="mx-2.5">{baseTotalSupply}</span>
                            <Image src={liquidityMaker.paired_token_image} alt="tokenImage" width={24} height={24}/>
                            <span className="mx-2.5">{pairedTotalSupply}</span>
                        </div>
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
                                balance={rewardTokenWalletBalance}
                                handleClick={() =>
                                    setMax(
                                        rewardTokenWalletBalance,
                                        setAmountRewardTokenToStake
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
                                balance={liquidityRewardTokenWalletBalance}
                                handleClick={() =>
                                    setMax(
                                        liquidityRewardTokenWalletBalance,
                                        setAmountLiquidityRewardTokenToStake
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
                        image={PAIRED_TOKEN_DEFAULT_IMAGE}
                        submitFunction={addLiquidityReward}
                        value={amountLiquidityRewardTokenToStake}
                        setValue={setAmountLiquidityRewardTokenToStake}
                        address={liquidityMaker.address}
                        token={liquidityMaker.pair_address}
                    />
                    <div className="flex flex-row items-center justify-between text-base">
                        <div>
                            <i className="fa-solid fa-coin"/> Update Max total LP Amount
                        </div>
                    </div>
                    <InputWithIconSubmit
                        id="cash"
                        name="cash"
                        type="number"
                        icon="fa-light fa-wrench"
                        submitName="Update"
                        image={PAIRED_TOKEN_DEFAULT_IMAGE}
                        submitFunction={updateMaxTotalSupply}
                        value={newMaxTotalSupply}
                        setValue={setNewMaxTotalSupply}
                        hideButton={parseFloat(maxTotalSupply) === parseFloat(newMaxTotalSupply)}
                    />
                    <div className="flex flex-row items-center justify-between text-base">
                        <div>
                            <i className="fa-solid fa-clock"/> Update Locking Period {newLockingPeriodInDays}
                        </div>
                    </div>
                    <InputTime
                        id="cash"
                        name="cash"
                        icon="fa-light fa-wrench"
                        submitName="Update"
                        image={PAIRED_TOKEN_DEFAULT_IMAGE}
                        submitFunction={updateLockingPeriod}
                        value={newLockingPeriod}
                        setValue={setNewLockingPeriod}
                        hideButton={parseFloat(lockingPeriod) === parseFloat(newLockingPeriod)}
                        hideIcon={true}
                    />
                </div>
            ) : (
                <div className="flex flex-col p-3.75 space-y-4">
                    <h1 className="text-2xl text-center"><i className="fa-solid fa-nfc-lock"/> Liquidity Maker</h1>
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