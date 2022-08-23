import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ethers} from "ethers";

import helper from "../../../helpers";
import {WETH_ADDRESS} from "../../../helpers/constants";

// core components
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";
import Button from "../../core/Button/Button";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";

// page components
import MaxButton from "./Button/MaxButton";
import Card from "../projectDetail/Card/Card";
import SkeletonDepositAndWithdraw from "./Skeleton/SkeletonDepositAndWithdraw";
import HomeCard from "../../pages/Home/HomeCard";

export default function DepositWithdraw({wallet, project, marketMakingPool, setTab}) {

    const router = useRouter();
    const [amountBaseTokenBalance, setAmountBaseTokenBalance] = useState('0');
    const [amountPairTokenBalance, setAmountPairTokenBalance] = useState('0');
    const [amountBaseTokenToWithdraw, setAmountBaseTokenToWithdraw] = useState('0');
    const [amountPairTokenToWithdraw, setAmountPairTokenToWithdraw] = useState('0');
    const [amountBaseTokenToStake, setAmountBaseTokenToStake] = useState('0');
    const [amountPairTokenToStake, setAmountPairTokenToStake] = useState('0');
    const [baseTokenWalletBalance, setBaseTokenWalletBalance] = useState('0');
    const [pairedTokenWalletBalance, setPairedTokenWalletBalance] = useState('0');
    const [pairedTokenIsWeth, setPairedTokenIsWeth] = useState(false);
    const [load, setLoad] = useState(false);


    useEffect(() => {

        if (wallet.isConnected() && marketMakingPool.address) {
            const initWalletConnected = async () => {

                if (marketMakingPool.paired_token === WETH_ADDRESS[wallet.chainId]) {
                    setPairedTokenIsWeth(true)
                    setPairedTokenWalletBalance(helper.formatting.web3Format(await helper.token.wethBalanceOf(wallet, wallet.account)));
                } else {
                    setPairedTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, marketMakingPool.paired_token, wallet.account)));
                }

                setBaseTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, project.token, wallet.account)));
                const {
                    balanceInBaseToken,
                } = await helper.web3.marketMaker.fetchHoldersMapping(wallet, marketMakingPool.address, wallet.account);

                setAmountBaseTokenBalance(helper.formatting.web3Format(balanceInBaseToken));
                setAmountPairTokenBalance(helper.formatting.web3Format(await helper.web3.marketMaker.getWithdrawablePairedTokens(
                    wallet,
                    marketMakingPool.address,
                    wallet.account
                )));
                setLoad(true);
            };
            initWalletConnected();
        }

    }, [wallet]);


    const setMax = async (amount, setter) => {
        setter(amount);
    };


    const stakePairedToken = async () => {
        const wei = ethers.utils.parseEther(amountPairTokenToStake);
        let success;
        if (pairedTokenIsWeth) {
            success = await helper.web3.marketMaker.stakePairedTokenInETH(wallet, marketMakingPool.address, wei);
        } else {
            success = await helper.web3.marketMaker.stakePairedToken(wallet, marketMakingPool.address, wei);
        }
        setAmountPairTokenBalance(parseFloat(amountPairTokenBalance) + parseFloat(amountPairTokenToStake));
    };

    const stakeBaseToken = async () => {
        const wei = ethers.utils.parseEther(amountBaseTokenToStake);
        await helper.marketMaker.stake(wallet, marketMakingPool.address, wei);
    };

    const withdrawPairToken = async () => {
        let full_withdrawal = parseFloat(amountPairTokenToWithdraw) === parseFloat(amountPairTokenBalance) && parseFloat(amountBaseTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountPairTokenToWithdraw);
        let success = await helper.web3.marketMaker.withdrawPairToken(wallet, marketMakingPool.address, wei, full_withdrawal);
    };

    const withdrawBaseToken = async () => {
        let full_withdrawal = parseFloat(amountBaseTokenToWithdraw) === parseFloat(amountBaseTokenBalance) && parseFloat(amountPairTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountBaseTokenToWithdraw);
        let success = await helper.marketMaker.withdrawBaseToken(wallet, marketMakingPool.address, wei, full_withdrawal);
    };


    return !load ? <SkeletonDepositAndWithdraw/> : (
        <div className="grid md-lg:grid-cols-2 gap-7.5">
            <div className="flex flex-col gap-5">
                <Card title="Settings">
                    {/* Card Header */}
                    <div className="card-header">
                        <h1 className="text-2xl"><i className="fa-solid fa-plus-circle"/> Deposit</h1>
                    </div>


                    <div className="pt-10 card-content space-y-5">
                        <div className="space-y-2.5">
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
                        </div>

                        <div className="space-y-2.5">
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
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <HomeCard
                        icon={<i className="fa-solid fa-circle-plus text-2xl text-indigo-500"></i>} 
                        title="Release Vesting" 
                        content="Step-by-step guides to setting up your system and installing the library."
                        handleClick={() => setTab(5)}
                    />

                    <HomeCard
                        icon={<i className="fa-solid fa-hands-holding-dollar text-2xl text-indigo-500"></i>} 
                        title="Deposit LP Tokens" 
                        content="Step-by-step guides to setting up your system and installing the library."
                        handleClick={() => router.push('/farms')}
                    />

                    <HomeCard
                        icon={<i className="fa-solid fa-sack-dollar text-2xl text-indigo-500"></i>} 
                        title="Stake In Vault" 
                        content="Step-by-step guides to setting up your system and installing the library."
                        handleClick={() => setTab(4)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <Card title="Activity">
                    {/* Card Header */}
                    <div className="card-header">
                        <h1 className="text-2xl"><i className="fa-solid fa-circle-minus"></i> Withdraw</h1>
                    </div>

                    <div className="pt-10 card-content space-y-5">
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
                        {/* <div>
                            <Button
                                className={'col-span-full'} name="Withdraw Liquidity" handleClick={() => setTab(3)}>
                                <i className="pl-2 fa-solid fa-circle-minus"/>
                            </Button>
                        </div>
                        <div>
                            <Button
                                className={'col-span-full'} name="Withdraw LP Tokens"
                                handleClick={() => router.push('/farms')}>
                                <i className="pl-2 fa-solid fa-plus-circle"/>
                            </Button>
                        </div>
                        <div className={'grid grid-cols-1 gap-2.5'}>
                            <div>
                                <Button
                                    className={''} name="Withdraw Vault Rewards" handleClick={() => setTab(4)}>
                                    <i className="pl-2 fa-solid fa-circle-minus"/>
                                </Button>
                            </div>
                        </div> */}
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <HomeCard
                        icon={<i className="fa-solid fa-circle-minus text-2xl text-indigo-500"></i>} 
                        title="Withdraw Liquidity"
                        content="Step-by-step guides to setting up your system and installing the library."
                        handleClick={() => setTab(3)}
                    />

                    <HomeCard
                        icon={<i className="fa-solid fa-hand-holding-dollar text-2xl text-indigo-500"></i>} 
                        title="Withdraw LP Tokens"
                        content="Step-by-step guides to setting up your system and installing the library."
                        handleClick={() => router.push('/farms')}
                    />

                    <HomeCard
                        icon={<i className="fa-solid fa-face-tongue-money text-2xl text-indigo-500"></i>} 
                        title="Withdraw Vault Rewards"
                        content="Step-by-step guides to setting up your system and installing the library."
                        handleClick={() => setTab(4)}
                    />
                </div>
            </div>
        </div>)
}