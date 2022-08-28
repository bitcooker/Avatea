import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ethers} from "ethers";

import helper from "../../../helpers";
import {WETH_ADDRESS} from "../../../helpers/constants";

// core components
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";

// page components
import MaxButton from "./Button/MaxButton";
import Card from "../projectDetail/Card/Card";
import SkeletonWithdraw from "./Skeleton/SkeletonWithdraw";
import HomeCard from "../../pages/Home/HomeCard";
import KPIWrapper from "../../core/KPIWrapper";
import KPICard from "../../core/KPICard";

export default function Withdraw({wallet, project, marketMakingPool, setTab}) {
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

    }, [marketMakingPool.address, marketMakingPool.paired_token, project.token, wallet]);


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

    return !load ? <SkeletonWithdraw/> : (
        <div className="flex flex-col gap-5 max-w-[700px] lg:max-w-[800px] mx-auto">
            <Card>
                <KPIWrapper cols={4}>
                    <KPICard image={project.image} end={baseTokenWalletBalance} label={'Wallet'}/>
                    <KPICard image={marketMakingPool.paired_token_image} end={pairedTokenWalletBalance}
                             label={'Wallet'}/>
                    <KPICard image={project.image} end={amountBaseTokenBalance} label={'contract'}/>
                    <KPICard image={marketMakingPool.paired_token_image} end={amountPairTokenBalance}
                             label={'contract'}/>
                </KPIWrapper>
            </Card>
            <Card title="Activity">
                {/* Card Header */}
                <div className=" card-content space-y-5 ">
                    <div className="space-y-2.5">
                        <div className="flex flex-row items-center justify-between text-base">
                            <div>
                                Withdraw {project.ticker}
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

                    <div className="space-y-2.5">
                        <div className="flex flex-row items-center justify-between text-base">
                            <div>
                                Withdraw {marketMakingPool.paired_token_ticker}

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
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <HomeCard
                    icon={<i className="fa-solid fa-circle-minus text-2xl text-indigo-500"></i>}
                    title="Withdraw Liquidity"
                    content="Step-by-step guides to setting up your system and installing the library."
                    handleClick={() => setTab(4)}
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
                    handleClick={() => setTab(5)}
                />
            </div>
        </div>
    )
}