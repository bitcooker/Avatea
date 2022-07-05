import {ethers} from 'ethers';
import {toast} from "react-toastify";
import helpers from "../index";
import {DEFAULT_SLIPPAGE} from "../constants";


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
        console.log(receipt);
        await helpers.callback.hook({
            type: "LMW",
            data: {
                receipt,
                wallet,
                full_withdrawal
            }
        })
        console.log('withdraw success')
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
        console.log(receipt);
        await helpers.callback.hook({
            type: "LMR",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('getReward success')
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
        console.log(receipt);
        await helpers.callback.hook({
            type: "LMC",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('compoundLPReward success')
    } catch (e) {
        console.log('compoundLPReward error', e);
        toast.error(e.reason);
    }
}

const exit = async (wallet, liquidityMakerAddress, full_withdrawal, slippage = DEFAULT_SLIPPAGE) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);

    try {
        const tx = await liquidityMaker.exit(slippage);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "LME",
            data: {
                receipt,
                wallet,
                full_withdrawal
            }
        })
        console.log('exit success')
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
        console.log(receipt);
        await helpers.callback.hook({
            type: "LMA",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('addReward success')
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
        console.log(receipt);
        await helpers.callback.hook({
            type: "LML",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('addLiquidityReward success')
    } catch (e) {
        console.log('addLiquidityReward error', e);
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
        console.log('rewardEarned error', e);
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
        console.log('liquidityRewardEarned error', e);
        toast.error(e.reason);
        return 0;
    }
}

const totalSupply = async (wallet, liquidityMakerAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        return await vaultContract.totalSupply();
    } catch (e) {
        console.log('totalSupply error', e);
        toast.error(e.reason);
        return 0;
    }
}

const rewardPerToken = async (wallet, liquidityMakerAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        let rewardRate = await liquidityMaker.rewardRate();
        let totalSupply = await liquidityMaker.totalSupply();
        let daily_reward = (rewardRate * 3600 * 24) / totalSupply
        return daily_reward.toFixed(2);
    } catch (e) {
        console.log('rewardPerToken error', e);
        toast.error(e.reason);
        return 0;
    }
}

const liquidityRewardPerToken = async (wallet, liquidityMakerAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const liquidityMaker = await new ethers.Contract(liquidityMakerAddress, LiquidityMaker.abi, signer);
        let rewardRate = await liquidityMaker.liquidityRewardRate();
        let totalSupply = await liquidityMaker.totalSupply();
        let daily_reward = (rewardRate * 3600 * 24) / totalSupply
        return daily_reward.toFixed(2);
    } catch (e) {
        console.log('rewardPerToken error', e);
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
            liquidityBalance,
            lastLiquidityProvidingTime,
            userRewardPerTokenPaid,
            rewards,
            userLiquidityRewardPerTokenPaid,
            liquidityRewards,
            stakedInBaseToken,
            stakedInPairedToken
        }
    } catch (e) {
        console.log('holdersMapping error', e);
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
    rewardPerToken,
    totalSupply,
    addReward
}