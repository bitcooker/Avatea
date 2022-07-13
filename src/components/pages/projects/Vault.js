import Card from "../projectDetail/Card/Card";
import MaxButton from "./Button/MaxButton";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";
import {AVATEA_TOKEN, AVATEA_TOKEN_IMAGE} from "../../../helpers/constants";
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";
import Button from "../../core/Button/Button";
import {ethers} from "ethers";
import helper from "../../../helpers";
import {useEffect, useState} from "react";
import SkeletonVault from "./Skeleton/SkeletonVault";
import CenteredContent from "../../core/CenteredContent";
import Image from "next/image";

export default function Vault({vault, wallet, project, setTab}) {

    const [amountToVaultStake, setAmountToVaultStake] = useState('0');
    const [stakedVaultBalance, setStakedVaultBalance] = useState('0');
    const [vaultBalance, setVaultBalance] = useState('0');
    const [avateaBalance, setAvateaBalance] = useState('0');
    const [earnedTokens, setEarnedTokens] = useState('0');
    const [vaultTLV, setVaultTLV] = useState('0');
    const [rewardPerToken, setRewardPerToken] = useState('0');
    const [articles, setArticles] = useState([]);
    const [load, setLoad] = useState(true);

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


    useEffect(() => {
        const fetchArticles = async () => {
            if (project.slug) {
                setArticles(await helper.article.getArticles({project: project.slug}));
            }
        };
        fetchArticles();
    }, [project]);

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
            <Image src={'/vault.png'} layout={'responsive'} height={594} width={1181}/>
        </div>
        <Button handleClick={() => setTab(0)}>Return to project</Button>
    </CenteredContent>)

    return !load ? <SkeletonVault/> : (<div className="grid md-lg:grid-cols-2 gap-7.5">
            <Card>
                <div className="divide-y">
                    {/* Card Header */}
                    <div className="card-header">
                        <h1 className="text-2xl"><i className="fa-solid fa-nfc-lock"/> Vault</h1>

                        <div className="py-5.5 space-y-4.5">
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-users"/> Users</span>
                                <span className="text-base font-medium">
                          {vault.num_invested}
                        </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-treasure-chest"/> Generated Rewards</span>
                                <span className="flex text-base font-medium">
                            <img
                                src={project.image}
                                className="w-6 h-6 ml-2.5 mr-2.5"
                            />{" "}
                                    {earnedTokens}
                          </span>
                            </div>
                            <div className="flex justify-between">
                          <span className="text-sm">
                            <i className="fa-solid fa-money-bill-transfer"/> TVL
                          </span>
                                <span className="flex text-base font-medium">
                            <img
                                src={AVATEA_TOKEN_IMAGE}
                                className="w-6 h-6 ml-2.5 mr-2.5"
                            />{" "}
                                    {vaultTLV}
                          </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-treasure-chest"/> Reward Per Avatea Token Per Day</span>
                                <span className="flex text-base font-medium">
                            <img
                                src={project.image}
                                className="w-6 h-6 ml-2.5 mr-2.5"
                            />{" "}
                                    {rewardPerToken}
                          </span>
                            </div>

                        </div>
                    </div>

                </div>
            </Card>
            <Card title="News Feed">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-newspaper"/> News</h1>
                </div>
                <div className="card-content pt-5 space-y-3.75">
                    <div>
                        <div className="flex flex-row items-center justify-between text-base">
                            <div>
                                <i className="fa-regular fa-sack-dollar mr-1"></i> Invest
                            </div>
                            &nbsp;
                            <span>
                          {avateaBalance} &nbsp;
                                <MaxButton
                                    handleClick={() => setMax(avateaBalance, setAmountToVaultStake)}
                                />
                        </span>
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
                            <span>
                          {stakedVaultBalance} &nbsp;
                                <MaxButton
                                    handleClick={() => setMax(stakedVaultBalance, setVaultBalance)}
                                />
                        </span>
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