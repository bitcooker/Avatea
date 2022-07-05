import Card from "../projectDetail/Card/Card";
import MaxButton from "./Button/MaxButton";
import Button from "../../core/Button/Button";
import {ethers} from "ethers";
import helper from "../../../helpers";
import {useEffect, useState} from "react";
import SkeletonMarketMaking from "./Skeleton/SkeletonMarketMaking";

export default function LiquidityMaker({ liquidityMaker, wallet }) {


    const [rewardEarned, setRewardEarned] = useState('0');
    const [liquidityRewardEarned, setLiquidityRewardEarned] = useState('0');
    const [totalSupply, setTotalSupply] = useState('0');
    const [rewardPerToken, setRewardPerToken] = useState('0');
    const [liquidityRewardPerToken, setLiquidityRewardPerToken] = useState('0');
    const [holdersMapping, setHoldersMapping] = useState();
    const [load, setLoad] = useState(false);


    useEffect(() => {
        if (wallet.status === "connected" && liquidityMaker.address) {
            const initWalletConnected = async () => {
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
                setTotalSupply(
                    helper.formatting.web3Format(
                        await helper.web3.liquidityMaker.totalSupply(wallet, liquidityMaker.address)
                    )
                );
                setHoldersMapping(
                    await helper.web3.liquidityMaker.fetchHoldersMapping(wallet, liquidityMaker.address,wallet.account)
                );
                setLoad(true)

            };
            initWalletConnected();
        }
    }, [wallet, liquidityMaker]);


    const setMax = async (amount, setter) => {
        setter(amount);
    };


    const withdrawLiquidity = async () => {
        //@Todo inspect full_withdrawal here if it makes sense? Because no wei value or something is passed
        let full_withdrawal = false;
        // let full_withdrawal = parseFloat(vaultBalance) === parseFloat(stakedVaultBalance);
        await helper.web3.liquidityMaker.withdraw(
            wallet,
            liquidityMaker.address,
            full_withdrawal
        );
    };

    const claimReward = async () => {
        await helper.web3.liquidityMaker.getReward(wallet, liquidityMaker.address);
    };

    const compoundReward = async () => {
        await helper.web3.liquidityMaker.compoundLPReward(wallet, liquidityMaker.address);
    };

    const exitLiquidity = async () => {
        //@Todo inspect full_withdrawal here if it makes sense? Because no wei value or something is passed
        let full_withdrawal = false;
        await helper.web3.liquidityMaker.exit(wallet, liquidityMaker.address);
    };

    const addReward = async () => {
        //@Todo declare the right value amount
        const wei = ethers.utils.parseEther(0);
        await helper.web3.liquidityMaker.addReward(wallet, liquidityMaker.address,wei);
    };

    const addLiquidityReward = async () => {
        //@Todo declare the right value amount
        const wei = ethers.utils.parseEther(0);
        await helper.web3.liquidityMaker.addLiquidityReward(wallet, liquidityMaker.address,wei);
    };

    return  !load ? <SkeletonMarketMaking/> : (
        <div className="grid md-lg:grid-cols-2 gap-7.5">
            <Card>
                <div className="divide-y">
                    {/* Card Header */}
                    <div className="card-header">
                        <h1 className="text-2xl"><i className="fa-solid fa-nfc-lock"/> Liquidity Stats</h1>

                        <div className="py-5.5 space-y-4.5">
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-users"/> Users</span>
                                <span className="text-base font-medium">
                                    {liquidityMaker.num_invested}
                    </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-treasure-chest"/> Generated Rewards</span>
                                <span className="text-base font-medium">{rewardEarned}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-treasure-chest"/> Total Supply</span>
                                <span className="text-base font-medium">{totalSupply}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-money-bill-transfer"/> Liquidity Rewards </span>
                                <span className="text-base font-medium">{liquidityRewardEarned}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-hands-holding-dollar"/> Reward Per Token</span>
                                <span className="text-base font-medium">{rewardPerToken}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-hands-holding-dollar"/> Liquidity Reward Per Token</span>
                                <span className="text-base font-medium">{liquidityRewardPerToken}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-content pt-5 space-y-3.75">
                        <div>
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-regular fa-sack-dollar mr-1"></i> Invest
                                </div>
                                &nbsp;
                                <span>
                      {0} &nbsp;
                                    <MaxButton
                                        handleClick={() =>
                                            setMax(0, console.log())
                                        }
                                    />
                    </span>
                            </div>

                        </div>
                        <div>
                            <div className="flex flex-row items-center justify-between text-base">
                                <div>
                                    <i className="fa-regular fa-circle-minus mr-1" />
                                    Staked
                                </div>
                                <span>
                      {holdersMapping?.stakedInBaseToken} /  {holdersMapping?.stakedInPairedToken}
                    </span>
                            </div>

                        </div>

                    </div>
                </div>
            </Card>
            <Card title="Liquidity & Reward Management">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-newspaper"/> Liquidity & Reward Management</h1>
                </div>

                <div className="card-content pt-5.5">
                    <div className="grid md-lg:grid-cols-2 gap-3.75">
                        <Button
                            name="Withdraw Liquidity"
                            handleClick={withdrawLiquidity}
                        >
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                        <Button name="Withdraw Liquidity & Claim Rewards" handleClick={exitLiquidity}>
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                        <Button name="Claim Rewards" handleClick={claimReward}>
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                        <Button name="Compound Reward" handleClick={compoundReward}>
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>

    )
}