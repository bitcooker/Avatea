import {ethers} from 'ethers';
import LiquidityMaker from '../../abi/LiquidityMaker.json';
import {toast} from "react-toastify";
import helpers from "../index";
import {DEFAULT_CHAIN_ID, DEFAULT_SLIPPAGE, RPC_URL} from "../constants";


const withdraw = async (wallet, liquidityMakerAddress, full_withdrawal, slippage = DEFAULT_SLIPPAGE) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.withdrawLP(slippage);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        await helpers.callback.hook({
            type: "LMW",
            data: {
                receipt,
                wallet,
                full_withdrawal
            }
        })
    } catch (e) {
        console.log('withdraw error', e);
        toast.error(e.reason);
    }
}

const getReward = async (wallet, liquidityMakerAddress, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.getReward();
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        await helpers.callback.hook({
            type: "LMR",
            data: {
                receipt,
                wallet,
            }
        })
    } catch (e) {
        console.log('getReward error', e);
        toast.error(e.reason);
    }
}


const compoundLPReward = async (wallet, liquidityMakerAddress, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.getLiquidityReward();
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        await helpers.callback.hook({
            type: "LMC",
            data: {
                receipt,
                wallet,
            }
        })
    } catch (e) {
        console.log('compoundLPReward error', e);
        toast.error(e.reason);
    }
}

const exit = async (wallet, liquidityMakerAddress, slippage = DEFAULT_SLIPPAGE) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.exitTokens(slippage);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        await helpers.callback.hook({
            type: "LME",
            data: {
                receipt,
                wallet,
            }
        })
    } catch (e) {
        console.log('exit error', e);
        toast.error(e.reason);
    }
}


const exitInLP = async (wallet, liquidityMakerAddress) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.exit();
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        await helpers.callback.hook({
            type: "LME",
            data: {
                receipt,
                wallet,
            }
        })
    } catch (e) {
        console.log('exit error', e);
        toast.error(e.reason);
    }
}


const addReward = async (wallet, liquidityMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.addReward(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        await helpers.callback.hook({
            type: "LMA",
            data: {
                receipt,
                wallet,
            }
        })
    } catch (e) {
        console.log('addReward error', e);
        toast.error(e.reason);
    }
}


const addLiquidityReward = async (wallet, liquidityMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.addLiquidityReward(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        await helpers.callback.hook({
            type: "LML",
            data: {
                receipt,
                wallet,
            }
        })
    } catch (e) {
        console.log('addLiquidityReward error', e);
        toast.error(e.reason);
    }
}

const stake = async (wallet, liquidityMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.stake(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        await helpers.callback.hook({
            type: "LMD",
            data: {
                receipt,
                wallet,
            }
        })
    } catch (e) {
        console.log('stake error', e);
        toast.error(e.reason);
    }
}


const setMaxTotalSupply = async (wallet, liquidityMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.setMaxTotalSupply(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        await tx.wait();
    } catch (e) {
        console.log('setMaxTotalSupply error', e);
        toast.error(e.reason);
    }
}


const setLockingPeriod = async (wallet, liquidityMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.setLockingPeriod(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        await tx.wait();
    } catch (e) {
        console.log('setLockingPeriod error', e);
        toast.error(e.reason);
    }
}


const rewardEarned = async (wallet, liquidityMakerAddress, address) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        return await liquidityMaker.rewardEarned(address);
    } catch (e) {
        console.log('Liquidity rewardEarned error', e);
        toast.error(e.reason);
        return 0;
    }
}


const liquidityRewardEarned = async (wallet, liquidityMakerAddress, address) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        return await liquidityMaker.liquidityRewardEarned(address);
    } catch (e) {
        console.log('Liquidity rewardEarned error', e);
        toast.error(e.reason);
        return 0;
    }
}

const totalSupply = async (wallet, liquidityMakerAddress, chainId = DEFAULT_CHAIN_ID) => {
    try {
        const { signer } = helpers.web3.authentication.getSigner(wallet,chainId)
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        return await liquidityMaker.totalSupply();
    } catch (e) {
        console.log('Liquidity totalSupply error', e);
        toast.error(e.reason);
        return 0;
    }
}

const maxTotalSupply = async (wallet, liquidityMakerAddress, chainId = DEFAULT_CHAIN_ID) => {
    try {
        const { signer } = helpers.web3.authentication.getSigner(wallet,chainId)
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        return await liquidityMaker.maxTotalSupply();
    } catch (e) {
        console.log('Liquidity maxTotalSupply error', e);
        toast.error(e.reason);
        return 0;
    }
}

const getLockingPeriod = async (wallet, liquidityMakerAddress, chainId = DEFAULT_CHAIN_ID) => {
    try {
        const { signer } = helpers.web3.authentication.getSigner(wallet,chainId)
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        return await liquidityMaker.lockingPeriod();
    } catch (e) {
        console.log('getLockingPeriod error', e);
        toast.error(e.reason);
        return 0;
    }
}

const getPairAddress = async (wallet, liquidityMakerAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        return await liquidityMaker.pair();
    } catch (e) {
        console.log('getPairAddress error', e);
        toast.error(e.reason);
        return 0;
    }
}

const rewardPerToken = async (wallet, liquidityMakerAddress, chainId = DEFAULT_CHAIN_ID) => {
    try {
        const { signer } = helpers.web3.authentication.getSigner(wallet,chainId)
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        let rewardRate = await liquidityMaker.rewardRate();
        let totalSupply = await liquidityMaker.totalSupply();
        let daily_reward = (rewardRate * 3600 * 24) / totalSupply
        return daily_reward.toFixed(2);
    } catch (e) {
        console.log('Liquidity rewardPerToken error', e);
        toast.error(e.reason);
        return 0;
    }
}

const liquidityRewardPerToken = async (wallet, liquidityMakerAddress,chainId = DEFAULT_CHAIN_ID) => {
    try {
        const { signer } = helpers.web3.authentication.getSigner(wallet,chainId)

        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        let rewardRate = await liquidityMaker.liquidityRewardRate();
        let totalSupply = await liquidityMaker.totalSupply();
        let daily_reward = (rewardRate * 3600 * 24) / totalSupply
        return daily_reward.toFixed(2);
    } catch (e) {
        console.log('Liquidity rewardPerToken error', e);
        toast.error(e.reason);
        return 0;
    }
}

const fetchHoldersMapping = async (wallet, liquidityMakerAddress, address) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        const data = await liquidityMaker.holdersMapping(address);

        const {
            liquidityBalance,
            lastLiquidityProvidingTime,
            userRewardPerTokenPaid,
            rewards,
            userLiquidityRewardPerTokenPaid,
            liquidityRewards,
            stakedInBaseToken,
            stakedInPairedToken
        } = data;
        return {
            liquidityBalance: helpers.formatting.web3Format(liquidityBalance),
            lastLiquidityProvidingTime: Number(lastLiquidityProvidingTime),
            userRewardPerTokenPaid: helpers.formatting.web3Format(userRewardPerTokenPaid),
            rewards: helpers.formatting.web3Format(rewards),
            userLiquidityRewardPerTokenPaid: helpers.formatting.web3Format(userLiquidityRewardPerTokenPaid),
            liquidityRewards: helpers.formatting.web3Format(liquidityRewards),
            stakedInBaseToken: helpers.formatting.web3Format(stakedInBaseToken),
            stakedInPairedToken: helpers.formatting.web3Format(stakedInPairedToken)
        }
    } catch (e) {
        console.log('Liquidity holdersMapping error', e);
        toast.error(e.reason);
        return 0;
    }
}

const getTVL = async (wallet, liquidityMakerAddress, baseTokenAddress, pairedTokenAddress, chainId = DEFAULT_CHAIN_ID) => {
    let provider, signer;
    if (wallet.isConnected()) {
        provider = new ethers.providers.Web3Provider(wallet.ethereum);
        signer = provider.getSigner();
    } else {
        provider = await new ethers.providers.JsonRpcProvider(RPC_URL[chainId]);
        signer = provider;
    }

    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
    let pairAddress = await liquidityMaker.pair();

    let contractBalance = await liquidityMaker.totalSupply();

    let baseBalance = await helpers.web3.token.balanceOf(wallet, baseTokenAddress, pairAddress)
    let pairedBalance = await helpers.web3.token.balanceOf(wallet, pairedTokenAddress, pairAddress)
    let totalSupply = await helpers.web3.token.fetchTotalSupply(wallet, pairAddress)

    let baseValue = baseBalance.mul(contractBalance).div(totalSupply)
    let pairedValue = pairedBalance.mul(contractBalance).div(totalSupply)

    return {baseValue, pairedValue}
}

const getCurrentValue = async (wallet, liquidityMakerAddress, address, baseTokenAddress, pairedTokenAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        const data = await liquidityMaker.holdersMapping(address);
        let liquidityBalance = data.liquidityBalance
        let liquidityRewardEarned = await liquidityMaker.liquidityRewardEarned(address);
        let pairAddress = await liquidityMaker.pair();

        let baseBalance = await helpers.web3.token.balanceOf(wallet, baseTokenAddress, pairAddress)
        let pairedBalance = await helpers.web3.token.balanceOf(wallet, pairedTokenAddress, pairAddress)
        let totalSupply = await helpers.web3.token.fetchTotalSupply(wallet, pairAddress)

        let currentBaseValue = helpers.formatting.web3Format(baseBalance.mul(liquidityBalance).div(totalSupply))
        let currentPairedValue = helpers.formatting.web3Format(pairedBalance.mul(liquidityBalance).div(totalSupply))

        let currentRewardBaseValue = helpers.formatting.web3Format(baseBalance.mul(liquidityRewardEarned).div(totalSupply))
        let currentRewardPairedValue = helpers.formatting.web3Format(pairedBalance.mul(liquidityRewardEarned).div(totalSupply))

        return {currentBaseValue, currentPairedValue, currentRewardBaseValue, currentRewardPairedValue}
    } catch (e) {
        console.log('Liquidity holdersMapping error', e);
        toast.error(e.reason);
        return 0;
    }
}

export default {
    withdraw,
    getReward,
    addLiquidityReward,
    compoundLPReward,
    rewardEarned,
    liquidityRewardEarned,
    liquidityRewardPerToken,
    fetchHoldersMapping,
    exit,
    exitInLP,
    stake,
    rewardPerToken,
    totalSupply,
    getLockingPeriod,
    addReward,
    getCurrentValue,
    getTVL,
    maxTotalSupply,
    setMaxTotalSupply,
    setLockingPeriod,
    getPairAddress
}