import {ethers} from 'ethers';
import marketMaker from '../../abi/MarketMaker.json';
import {toast} from "react-toastify";
import helpers from "../index";
import {API_URL, DEPLOYMENT_GAS_COST, MARKET_MAKER_DEPLOYER_ADDRESS} from "../constants";
import MarketMakerDeployer from "../../abi/MarketMakerDeployer.json";
import axios from "axios";

const deploy = async (wallet,
                      baseToken,
                      pairedToken,
                      revocable,
                      paused,
                      projectSlug,
                      volume,
                      maxBuyingAmount,
                      maxSellingAmount,
                      maxPreferredDrawdown,
                      lowerPreferredPriceRange,
                      upperPreferredPriceRange,
                      pairedTokenImage) => {
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

        const {
            _controllerWallet,
            _marketMaker
        } = receipt.events.find(x => x.event === "CreatedMarketMakingContract").args;

        await axios.post(`${API_URL}MarketMakingPool/`, {
            address: _marketMaker,
            controller_wallet: _controllerWallet,
            paired_token: pairedToken,
            project: projectSlug,
            network: String(wallet.chainId),
            max_selling_amount: maxSellingAmount,
            max_buying_amount: maxBuyingAmount,
            max_preferred_drawdown: maxPreferredDrawdown,
            lower_preferred_price_range: lowerPreferredPriceRange,
            upper_preferred_price_range: upperPreferredPriceRange,
            paired_token_image: pairedTokenImage,
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
        toast.error(e.reason);
        return false;
    }
}

const stake = async (wallet, marketMakerAddress, amount) => {
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
        toast.error(e.reason);
        return false;
    }
}

const stakeBatch = async (wallet, marketMakerAddress, user_addresses, amountsInWei, amounts, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.stakeBatch(amountsInWei, user_addresses);
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
            type: "MMBB",
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
        toast.error(e.reason);
        return false;
    }
}

const createVesting = async (wallet,
                             marketMakerAddress,
                             user_addresses,
                             start,
                             cliff,
                             duration,
                             slicePeriodSeconds,
                             revocable,
                             amountsInWei,
                             amounts,
                             batchName,
                             projectName) => {
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
        toast.error(e.reason);
        return false;
    }
}

const stakePairedToken = async (wallet, marketMakerAddres, amount) => {
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
        toast.error(e.reason);
        return false;
    }
}

const stakePairedTokenInETH = async (wallet, marketMakerAddress, amount) => {
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
        toast.error(e.reason);
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
        toast.error(e.reason);
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
        toast.error(e.reason);
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
        toast.error(e.reason);
        return false;
    }
}

const revoke = async (wallet, marketMakerAddress, user_address, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

        const tx = await marketMakerContract.revoke(user_address);
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
            type: "MMRT",
            data: {
                receipt,
                wallet,
                user_address
            }
        })
        console.log('revoke success')
        return true;
    } catch (e) {
        console.log('revoke error', e);
        toast.error(e.reason);
        return false;
    }
}


const computeReleasableAmount = async (wallet, marketMakerAddress, userAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        const result = await marketMakerContract.computeReleasableAmount(userAddress);
        console.log('computeReleasableAmount success')
        return result
    } catch (e) {
        console.log('computeReleasableAmount error', e);
        toast.error(e.reason);
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
        toast.error(e.reason);
        return 0;
    }
}

const fetchHoldersMapping = async (wallet, marketMakerAddress, address) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        const data = await marketMakerContract.holdersMapping(address);

        const {
            balanceInPairedToken,
            available,
            stakedInBaseToken,
            stakedInPairedToken,
            baseAmountBought,
            pairedAmountBought,
            baseAmountSold,
            pairedAmountSold,
            projectOwner,
            allowSelling,
            maxBaseStakingRatio,
            maxPairedStakingRatio
        } = data;
        return {
            balanceInPairedToken,
            available,
            stakedInBaseToken,
            stakedInPairedToken,
            baseAmountBought,
            pairedAmountBought,
            baseAmountSold,
            pairedAmountSold,
            projectOwner,
            allowSelling,
            maxBaseStakingRatio,
            maxPairedStakingRatio
        }
    } catch (e) {
        console.log('holdersMapping error', e);
        toast.error(e.reason);
        return 0;
    }
}


const fetchHoldersVestingMapping = async (wallet, marketMakerAddress, address) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        const data = await marketMakerContract.holdersVestingMapping(address);
        const {
            amountVested,
            released,
            cliff,
            start,
            duration,
            slicePeriodSeconds,
            revocable,
            allowReleasing
        } = data;
        return {
            amountVested,
            released,
            cliff,
            start,
            duration,
            slicePeriodSeconds,
            revocable,
            allowReleasing
        }
    } catch (e) {
        console.log('fetchHoldersVestingMapping error', e);
        toast.error(e.reason);
        return 0;
    }
}

const setAllowSelling = async (wallet, marketMakerAddress, allowSelling, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

        const tx = await marketMakerContract.setAllowSelling(allowSelling);
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
            type: "MMAS",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('setAllowSelling success')
        return true;
    } catch (e) {
        console.log('setAllowSelling error', e);
        toast.error(e.reason);
        return false;
    }
}


const setAllowReleasing = async (wallet, marketMakerAddress, allowReleasing, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

        const tx = await marketMakerContract.setAllowReleasing(allowReleasing);
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
            type: "MMAR",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('setAllowReleasing success')
        return true;
    } catch (e) {
        console.log('setAllowReleasing error', e);
        toast.error(e.reason);
        return false;
    }
}

const setMaxBaseStakingRatio = async (wallet, marketMakerAddress, maxBaseStakingRatio, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

        const tx = await marketMakerContract.setMaxBaseStakingRatio(maxBaseStakingRatio);
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
            type: "MMBR",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('setMaxBaseStakingRatio success')
        return true;
    } catch (e) {
        console.log('setMaxBaseStakingRatio error', e);
        toast.error(e.reason);
        return false;
    }
}

const setMaxPairedStakingRatio = async (wallet, marketMakerAddress, maxPairedStakingRatio, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

        const tx = await marketMakerContract.setMaxPairedStakingRatio(maxPairedStakingRatio);
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
            type: "MMPR",
            data: {
                receipt,
                wallet,
            }
        })
        console.log('setMaxPairedStakingRatio success')
        return true;
    } catch (e) {
        console.log('setMaxPairedStakingRatio error', e);
        toast.error(e.reason);
        return false;
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
    fetchHoldersVestingMapping,
    createVesting,
    stakeBatch,
    revoke,
    setAllowSelling,
    setAllowReleasing,
    setMaxBaseStakingRatio,
    setMaxPairedStakingRatio
}