import {ethers} from 'ethers';
import marketMaker from '../../abi/MarketMaker.json';
import {toast} from "react-toastify";
import helpers from "../index";
import {API_URL, DEPLOYMENT_GAS_COST, MARKET_MAKER_DEPLOYER_ADDRESS} from "../constants";
import MarketMakerDeployer from "../../abi/MarketMakerDeployer.json";
import axios from "axios";

const deploy = async (wallet, baseToken, pairedToken, revocable, paused, projectSlug, volume, maxBuyingAmount, maxSellingAmount) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const options = {value: ethers.utils.parseEther(DEPLOYMENT_GAS_COST)}
    const MarketMakerDeployerContract = await new ethers.Contract(MARKET_MAKER_DEPLOYER_ADDRESS[wallet.chainId], MarketMakerDeployer.abi, signer);

    try {
        const tx = await MarketMakerDeployerContract.createMarketMaker(baseToken, pairedToken, revocable, paused, options);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();

        const {_controllerWallet, _marketMaker} = receipt.events.find(x => x.event === "CreatedMarketMakingContract").args;

        await axios.post(`${API_URL}MarketMakingPool/`, {
            address: _marketMaker,
            controller_wallet: _controllerWallet,
            paired_token: pairedToken,
            project: projectSlug,
            network: String(wallet.chainId),
            max_selling_amount: maxSellingAmount,
            max_buying_amount: maxBuyingAmount,
            volume,
            live: !paused
        })

        await helpers.callback.hook({
            type: "MMCD",
            data: {
                receipt,
                wallet,
            }
        })

        console.log('deploy success')
        return true;
    } catch (e) {
        console.log('deploy error', e);
        return false;
    }
}

const stake = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.stake(amount);
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
            type: "MMBD",
            data: {
                receipt,
                wallet
            }
        })
        console.log('stake success')
        return true;
    } catch (e) {
        console.log('stake error', e);
        return false;
    }
}

const stakeBatch = async (wallet, marketMakerAddress, user_addresses, amounts, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.stakeBatch(amounts, user_addresses);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();

        await helpers.callback.batchHook({
            type: "MMBD",
            data: {
                receipt,
                wallet,
                user_addresses,
                amounts
            }
        })

        console.log('stakeBatch success')
        return true;
    } catch (e) {
        console.log('stakeBatch error', e);
        return false;
    }
}

const createVesting = async (wallet, marketMakerAddress, user_addresses, start, cliff, duration, slicePeriodSeconds, revocable, amountsInWei, amounts, batchName, projectName) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.createVestingSchedule(
            user_addresses,
            start,
            cliff,
            duration,
            slicePeriodSeconds,
            revocable,
            amountsInWei
        );

        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();

        await helpers.callback.batchHook({
            type: "MMVD",
            data: {
                receipt,
                wallet,
                user_addresses,
                amounts,
                start,
                cliff,
                duration,
                slicePeriodSeconds,
                revocable,
                batchName,
                projectName
            }
        })
        console.log('createVesting success')
        return true;
    } catch (e) {
        console.log('createVesting error', e);
        return false;
    }
}

const stakePairedToken = async (wallet, marketMakerAddres, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddres, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.stakePairedToken(amount);
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
            type: "MMPD",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('stakePairedToken success')
        return true;
    } catch (e) {
        console.log('stakePairedToken error', e);
        return false;
    }
}

const stakePairedTokenInETH = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.stakePairedTokenInETH({value: amount});
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
            type: "MMPD",
            data: {
                receipt,
                wallet,
            }
        })
        return true;
    } catch (e) {
        console.log('stakePairedTokenInETH error', e);
        return false;
    }
}

const withdrawBaseToken = async (wallet, marketMakerAddress, amount, full_withdrawal, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
    try {
        const tx = await marketMakerContract.withdrawBaseToken(amount);
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
            type: "MMBW",
            data: {
                receipt,
                wallet,
                full_withdrawal
            }
        })
        console.log('withdrawBaseToken success')
        return true;
    } catch (e) {
        console.log('withdrawBaseToken error', e);
        return false;
    }
}

const withdrawPairToken = async (wallet, marketMakerAddress, amount, full_withdrawal, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.withdrawPairedToken(amount);
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
            type: "MMPW",
            data: {
                receipt,
                wallet,
                full_withdrawal
            }
        })
        console.log('withdrawPairedToken success')
        return true;
    } catch (e) {
        console.log('withdrawPairedToken error', e);
        return false;
    }
}


const release = async (wallet, marketMakerAddress, full_withdrawal, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

        const tx = await marketMakerContract.release();
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
            type: "MMVR",
            data: {
                receipt,
                wallet,
                full_withdrawal
            }
        })
        console.log('release success')
        return true;
    } catch (e) {
        console.log('release error', e);
        return false;
    }
}


const computeReleasableAmount = async (wallet, marketMakerAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        const result = await marketMakerContract.computeReleasableAmount(wallet.account);
        return result
        console.log('computeReleasableAmount success')
    } catch (e) {
        console.log('computeReleasableAmount error', e);
        return 0;
    }
}

const getWithdrawablePairedTokens = async (wallet, marketMakerAddress, address, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        return await marketMakerContract.getWithdrawablePairedTokens(address);
    } catch (e) {
        console.log('getWithdrawablePairedTokens error', e);
        return 0;
    }
}

const fetchHoldersMapping = async (wallet, marketMakerAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        const data = await marketMakerContract.holdersMapping(wallet.account);
        const {
            available,
            amountVested,
            released,
            baseAmountBought,
            pairedAmountBought,
            baseAmountSold,
            pairedAmountSold,
            cliff,
            start,
            duration,
            slicePeriodSeconds,
            projectOwner,
            revocable
        } = data;
        return {
            available,
            amountVested,
            released,
            baseAmountBought,
            pairedAmountBought,
            baseAmountSold,
            pairedAmountSold,
            cliff,
            start,
            duration,
            slicePeriodSeconds,
            projectOwner,
            revocable
        }
    } catch (e) {
        console.log('fetchVesting error', e);
        return 0;
    }
}

export default {
    stake,
    stakePairedToken,
    stakePairedTokenInETH,
    withdrawBaseToken,
    withdrawPairToken,
    release,
    computeReleasableAmount,
    getWithdrawablePairedTokens,
    deploy,
    fetchHoldersMapping,
    createVesting,
    stakeBatch
}