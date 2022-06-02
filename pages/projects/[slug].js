import axios from 'axios';
import {useWallet} from "use-wallet";
import {useState, useEffect} from "react";
import { useRouter } from 'next/router'
import helper from "../../src/helpers";
import {ethers} from 'ethers';
import {AVATEA_TOKEN_ADDRESS, CLOUD_2_TOKEN_ADDRESS} from "../../src/helpers/constants";


export default function ProjectDetail({projectDetail}) {

    const wallet = useWallet();
    const router = useRouter()
    const { slug } = router.query;
    const [project, setProject] = useState({});
    const [vault, setVault] = useState({});
    const [marketMakingPool, setMarketMakingPool] = useState({});
    const [amountToStake, setAmountToStake] = useState(0);
    const [amountBaseToken,setAmountBaseToken] = useState(0);
    const [amountPairToken,setAmountPairToken] = useState(0);
    const [amountToVaultStake, setAmountToVaultStake] = useState(0);
    const [vaultBalance, setVaultBalance] = useState(0);
    const [marketMakingType,setMarketMakingType] = useState(null);
    const [amountSettings,setAmountSetting] = useState(null);
    const [pressure,setPressure] = useState(null);
    const [priceLimit,setPriceLimit] = useState(null);
    const [fresh,setFresh] = useState(false);
    const [marketMakingSettingsId, setMarketMakingSettingsId]  = useState(null);


    useEffect(() => {
        if (projectDetail) setProject(projectDetail);
        else {
            const fetchProject = async () => {
                const result = await helper.utilities.getProject(slug);
                setProject(result?.project);
                setMarketMakingPool(result?.marketMakingPool);
                setVault(result?.vault);
            }
            fetchProject();
        }
    }, [])

    useEffect(() => {
        //@TODO Error handling if empty market making pool or vault
        if (Object.keys(project).length !== 0) {
            const fetchProject = async () => {
                const result = await helper.utilities.getProject(project.slug);

                setMarketMakingPool(result?.marketMakingPool);
                setVault(result?.vault);
            }
            fetchProject();
        }
    }, [project])

    useEffect(() => {
        if(wallet.isConnected()) {
            const initWalletConnected = async () => {
                //@TODO Wire Chain ID for production
                const marketMakingSettings = await helper.utilities.getMarketMakingSettings({
                    slug: project.slug,
                    user_address: wallet.account
                });
                if (marketMakingSettings) {

                    const { market_making_type, amount, buy_sell_pressure, priceLimit, id } = marketMakingSettings;
                    if (!market_making_type) setFresh(true);
                    setMarketMakingSettingsId(id)
                    setMarketMakingType(market_making_type);
                    setAmountSetting(amount);
                    setPressure(buy_sell_pressure);
                    setPriceLimit(priceLimit);
                }
                setAmountBaseToken((await helper.marketMaker.available(wallet,marketMakingPool.address,wallet.account)).toString())
                setAmountPairToken((await helper.marketMaker.getWithdrawablePairedTokens(wallet,marketMakingPool.address,wallet.account)).toString())
                setVaultBalance((await helper.vault.balanceOf(wallet,vault.address,wallet.account)).toString());
            }
            initWalletConnected();
        }
    },[wallet])

    const stakeMarketMaker = async () => {
        const wei = ethers.utils.parseEther(amountToStake);
        await helper.marketMaker.stake(wallet,marketMakingPool.address,wei);
    }

    const approve = async (address,tokenAddress) => {
        console.log(address)
        const totalSupply = await helper.utilities.fetchTotalSupply(wallet);
        console.log(totalSupply);
        await helper.utilities.approveCustomToken(wallet,address,totalSupply,tokenAddress);
    }

    const withdrawBaseToken = async () => {
        await helper.marketMaker.withdrawBaseToken(wallet,marketMakingPool.address,amountBaseToken);
    }

    const withdrawPairToken = async () => {
        await helper.marketMaker.withdrawPairToken(wallet,marketMakingPool.address,amountPairToken);
    }

    const stakeVault = async () => {
        console.log(amountToVaultStake)
        const wei = ethers.utils.parseEther(amountToVaultStake);
        await helper.vault.stake(wallet,vault.address,wei);
    }

    const withdrawVault = async () => {
        await helper.vault.withdraw(wallet,vault.address,vaultBalance);
    }

    const updateSettings = async () => {
        console.log(fresh)
        const marketMakingSettings = {
            marketMakingType,
            amountSettings,
            pressure,
            priceLimit,
            marketMakingPoolId: marketMakingPool.id,
            id: marketMakingSettingsId ? marketMakingSettingsId : ""
        }
            await helper.utilities.updateMarketMakingSettings({
                marketMakingSettings,
                wallet,
                fresh
            });

    }


    return (
        <div>
            <h1>Project Detail page {project.name}</h1>
            <p>{project.slug}</p>
            <button onClick={() => approve(marketMakingPool.address,CLOUD_2_TOKEN_ADDRESS)}>Approve</button>
            <div style={{border: "2px solid black"}}>
                <input type="number" onChange={(e) => setAmountToStake(e.target.value)}/>
                <button onClick={() => stakeMarketMaker()}>Stake</button>
            </div>
            <p>Available base tokens {ethers.utils.formatEther(amountBaseToken)}</p>
            <button onClick={() => withdrawBaseToken()}>Withdraw base token</button>
            <p>Available pair tokens {ethers.utils.formatEther(amountPairToken)}</p>
            <button onClick={() => withdrawPairToken()}>Withdraw pair token</button>
            <pre>
                <small>MMPool </small>
            {JSON.stringify(marketMakingPool, null, 2) }
            </pre>
            <pre>
                <small>Vault </small>
            {JSON.stringify(vault, null, 2) }
            </pre>
            <button onClick={() => approve(vault.address,AVATEA_TOKEN_ADDRESS)}>Approve</button>
            <div style={{border: "2px solid black"}}>
                <input type="number" onChange={(e) => setAmountToVaultStake(e.target.value)}/>
                <button onClick={() => stakeVault()}>Stake</button>
            </div>
            <p>Balance of vault: {ethers.utils.formatEther(vaultBalance)} </p>
            <div style={{border: "2px solid black"}}>
                <button onClick={() => withdrawVault()}>Withdraw Vault</button>
            </div>

            <hr/>
            {
                wallet.isConnected() ? (<>
                        <h2>Settings</h2>
                            <div>
                                <label htmlFor="pressure">Pressure</label>
                                <input type="text" name="pressure" placeholder={'Pressure'} value={pressure ? pressure : "Empty Pressure"} onChange={e => setPressure(e.target.value)}/>
                            </div>
                        <div>
                            <label htmlFor="marketmakingtype">MM Type</label>
                            <input type="text" name="marketmakingtype" placeholder={'Market Making Type'} value={marketMakingType ? marketMakingType : "Empty MM Type"} onChange={e => setMarketMakingType(e.target.value)}/>
                        </div>

                    <div>
                    <label htmlFor="priceLimit">price Limit</label>
                    <input type="text" name="priceLimit" placeholder={'PriceLimit'} value={priceLimit ? priceLimit : "Empty PriceLimit"} onChange={e => setPriceLimit(e.target.value)}/>
                    </div>

                    <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" placeholder={'Amount'} value={amountSettings ? amountSettings : "Empty amount"} onChange={e => setAmountSetting(e.target.value)}/>
                    </div>

                    <button onClick={() => updateSettings()}>Change Settings</button>
                    </>
                ) : ""
            }


        </div>
    )
}

// ProjectDetail.getInitialProps = async (ctx) => {
//     console.log(ctx);
//     // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     // const json = await res.json()
//      return { test: 'test' }
// }

export async function getServerSideProps(context) {
    const { slug } = context.query;
    let projectDetails;
    try {
        projectDetails = await helper.utilities.getProject(slug);
        console.log(projectDetails)
    } catch (e) {
        console.log(e);
        projectDetails = {}
    }
    return {
        props: {
            projectDetail: projectDetails?.project,
            marketMakingPool: projectDetails?.marketMakingPool,
            vault: projectDetails?.vault
        }
    }
}