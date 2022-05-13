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
            const fetchMarketMakingPool = async () => {
                setMarketMakingPool(await helper.utilities.getMarketMakingPool(project?.project_MarketMakingPool[0]))
            }
            const fetchVault = async () => {
                setVault(await helper.utilities.getVault(project?.project_Vault[0]))
            }
            fetchMarketMakingPool();
            fetchVault();
        }
    }, [project])

    useEffect(() => {
        if(wallet.isConnected()) {
            const fetchWithdrawableTokens = async () => {
                setAmountBaseToken((await helper.marketMaker.available(wallet,marketMakingPool.address,wallet.account)).toString())
                setAmountPairToken((await helper.marketMaker.getWithdrawablePairedTokens(wallet,marketMakingPool.address,wallet.account)).toString())
                setVaultBalance((await helper.vault.balanceOf(wallet,vault.address,wallet.account)).toString());
            }
            fetchWithdrawableTokens();
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
        const wei = ethers.utils.parseEther(vaultBalance);
        await helper.vault.withdraw(wallet,vault.address,wei);
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
    const projectDetails = await helper.utilities.getProject(slug);
    console.log(projectDetails)
    return {
        props: {
            projectDetail: projectDetails.project,
            marketMakingPool: projectDetails.marketMakingPool,
            vault: projectDetails.vault
        }
    }
}