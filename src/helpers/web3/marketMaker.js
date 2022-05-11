import {ethers} from 'ethers';
import marketMaker from '../../abi/MarketMaker.json';



const stake = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const allowanceTx = await marketMakerContract.stake(amount);
        await allowanceTx.wait();
        console.log('stake success')
    } catch (e) {
        alert(e)
        console.log('stake error', e);
    }
}

const stakePairedToken = async (wallet, marketMakerAddres, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddres, marketMaker.abi, signer);

    try {
        const allowanceTx = await marketMakerContract.stakePairedToken(amount);
        await allowanceTx.wait();
        console.log('stakePairedToken success')
    } catch (e) {
        alert(e)
        console.log('stakePairedToken error', e);
    }
}

const stakePairedTokenInETH = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const allowanceTx = await marketMakerContract.stakePairedTokenInETH({value: amount});
        await allowanceTx.wait();
        console.log('stakePairedTokenInETH success')
    } catch (e) {
        alert(e)
        console.log('stakePairedTokenInETH error', e);
    }
}

const withdrawBaseToken = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const allowanceTx = await marketMakerContract.withdrawBaseToken(amount);
        await allowanceTx.wait();
        console.log('withdrawBaseToken success')
    } catch (e) {
        alert(e)
        console.log('withdrawBaseToken error', e);
    }
}

const withdrawPairedToken = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const allowanceTx = await marketMakerContract.withdrawPairedToken(amount);
        await allowanceTx.wait();
        console.log('withdrawPairedToken success')
    } catch (e) {
        alert(e)
        console.log('withdrawPairedToken error', e);
    }
}


const release = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const allowanceTx = await marketMakerContract.release(amount);
        await allowanceTx.wait();
        console.log('release success')
    } catch (e) {
        alert(e)
        console.log('release error', e);
    }
}


const computeReleasableAmount = async (wallet, marketMakerAddress, address, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
    try {
        const result = await marketMakerContract.computeReleasableAmount(address);
        callback(result)
        console.log('computeReleasableAmount success')
    } catch (e) {
        alert(e)
        console.log('computeReleasableAmount error', e);
    }
}

const getWithdrawablePairedTokens = async (wallet, marketMakerAddress, address, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
    try {
        const result = await marketMakerContract.getWithdrawablePairedTokens(address);
        callback(result)
        console.log('getWithdrawablePairedTokens success')
    } catch (e) {
        alert(e)
        console.log('getWithdrawablePairedTokens error', e);
    }
}
const available = async (wallet, marketMakerAddress, address, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
    try {
        const result = await marketMakerContract.available(address);
        callback(result)
        console.log('available success')
    } catch (e) {
        alert(e)
        console.log('available error', e);
    }
}

export default {
    stake,
    stakePairedToken,
    stakePairedTokenInETH,
    withdrawBaseToken,
    withdrawPairedToken,
    release,
    computeReleasableAmount,
    getWithdrawablePairedTokens,
    available,
}