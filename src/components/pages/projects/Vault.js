import {useEffect, useState} from "react";
import Image from "next/image";
import {ethers} from "ethers";

import helper from "../../../helpers";
import {AVATEA_TOKEN, AVATEA_TOKEN_IMAGE} from "../../../helpers/constants";

// core components
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";
import CenteredContent from "../../core/CenteredContent";
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";
import Button from "../../core/Button/Button";

// page components
import SkeletonVault from "./Skeleton/SkeletonVault";
import MaxButton from "./Button/MaxButton";
import Card from "../projectDetail/Card/Card";
import KPIWrapper from "../../core/KPIWrapper";
import KPICard from "../../core/KPICard";

export default function Vault({vault, wallet, project, setTab}) {

    const [amountToVaultStake, setAmountToVaultStake] = useState('0');
    const [stakedVaultBalance, setStakedVaultBalance] = useState('0');
    const [vaultBalance, setVaultBalance] = useState('0');
    const [avateaBalance, setAvateaBalance] = useState('0');
    const [earnedTokens, setEarnedTokens] = useState('0');
    const [vaultTLV, setVaultTLV] = useState('0');
    const [rewardPerToken, setRewardPerToken] = useState('0');
    const [load, setLoad] = useState(false);

    const initWalletConnected = async () => {

        setStakedVaultBalance(helper.formatting.web3Format(await helper.web3.vault.balanceOf(wallet, vault.address, wallet.account)));
        setAvateaBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, AVATEA_TOKEN, wallet.account)));
        setEarnedTokens(helper.formatting.web3Format(await helper.web3.vault.earned(wallet, vault.address, wallet.account)));
        setVaultTLV(helper.formatting.web3Format(await helper.web3.vault.totalSupply(wallet, vault.address)));
        setRewardPerToken(await helper.web3.vault.rewardPerToken(wallet, vault.address));
        setLoad(true);
    };

    useEffect(() => {
        if (wallet.status === "connected" && vault.address) {
            initWalletConnected();
        }
    }, [wallet.status, vault]);


    const setMax = async (amount, setter) => {
        setter(amount);
    };


    const stakeVault = async () => {
        const wei = ethers.utils.parseEther(amountToVaultStake);
        await helper.web3.vault.stake(wallet, vault.address, wei);
        initWalletConnected();
    };

    const withdrawVault = async () => {
        let full_withdrawal = parseFloat(vaultBalance) === parseFloat(stakedVaultBalance);
        const wei = ethers.utils.parseEther(vaultBalance);
        await helper.web3.vault.withdraw(wallet, vault.address, wei, full_withdrawal);
        initWalletConnected();
    };

    const claimVaultRewards = async () => {
        await helper.web3.vault.getReward(wallet, vault.address);
        initWalletConnected();
    };

    const exitVault = async () => {
        await helper.web3.vault.exit(wallet, vault.address);
        initWalletConnected();
    };

    if (!vault.address) return (<CenteredContent>
        <span className={'text-2xl'}>No Vault Available</span>
        <div className={'w-[70%] mx-auto'}>
            <Image src={'/vault.png'} alt="vaultImage" layout={'responsive'} height={594} width={1181}/>
        </div>
        <Button handleClick={() => setTab(0)}>Return to project</Button>
    </CenteredContent>)

    return !load ? <SkeletonVault/> : (
        <div className="grid md-lg:grid-cols-1 gap-7.5 max-w-[700px] lg:max-w-[800px] mx-auto">

            <Card>
                <KPIWrapper cols={3}>
                    <KPICard image={project.image} end={earnedTokens} label={'Earned'}/>
                    <KPICard image={project.image} end={rewardPerToken} label={'APY'} postFix={'%'}/>
                    <KPICard image={AVATEA_TOKEN_IMAGE} end={vaultBalance} label={'Staked'}/>
                </KPIWrapper>
            </Card>
            <Card title="News Feed">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-gear"/> Rewards Management</h1>
                </div>
                <div className="card-content pt-5 space-y-3.75">
                    <div>
                        <div className="flex flex-row items-center justify-between text-base">
                            <div>
                                <i className="fa-regular fa-sack-dollar mr-1"></i> Invest
                            </div>
                            <MaxButton
                                balance={avateaBalance}
                                handleClick={() => setMax(avateaBalance, setAmountToVaultStake)}
                            />
                        </div>
                        <InputApproveWithIconSubmit
                            id="max"
                            name="max"
                            type="number"
                            submitName="Stake"
                            icon="fa-light fa-gauge-max"
                            submitFunction={stakeVault}
                            value={amountToVaultStake}
                            setValue={setAmountToVaultStake}
                            address={vault.address}
                            token={AVATEA_TOKEN}
                        />
                    </div>
                    <div>
                        <div className="flex flex-row items-center justify-between text-base">
                            <div>
                                <i className="fa-regular fa-circle-minus mr-1"/>
                                Withdraw Avatea
                            </div>
                            <MaxButton
                                balance={stakedVaultBalance}
                                handleClick={() => setMax(stakedVaultBalance, setVaultBalance)}
                            />
                        </div>
                        <InputWithIconSubmit
                            id="withdrawAvatea"
                            name="withdrawAvatea"
                            type="number"
                            submitName="Withdraw"
                            icon="fa-light fa-circle-minus"
                            submitFunction={withdrawVault}
                            value={vaultBalance}
                            setValue={setVaultBalance}
                        />
                    </div>
                    <div className="grid md-lg:grid-cols-2 gap-3.75">
                        <Button
                            name="Withdraw Rewards"
                            handleClick={claimVaultRewards}
                        >
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                        <Button name="Withdraw Both" handleClick={exitVault}>
                            <i className="pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>

    )
}