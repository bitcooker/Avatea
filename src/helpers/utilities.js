import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import { API_URL } from "./constants";


const getVaults = async ({invested, saved, live, network , callback} = {}) => {
    let parameters = "?";
    if (invested) parameters += `invested=${invested}&`;
    if (saved) parameters += `saved=${saved}&`;
    if (live) parameters += `live=${live}&`;
    if (network) parameters += `network=${network}&`;
    try {
        const {data} = await axios.get(`${API_URL}Vault/${parameters}`);
        callback(data)
    } catch (e) {
        console.log('getVault error:', e);
    }
}

const getMarketMakingPools = async ({invested, saved, live, network , callback} = {}) => {

    let parameters = "?";
    if (invested) parameters += `invested=${invested}&`
    if (saved) parameters += `saved=${saved}&`
    if (live) parameters += `live=${live}&`
    if (network) parameters += `network=${network}&`

    try {
        const {data} = await axios.get(`${API_URL}MarketMakingPool/${parameters}`);
        callback(data)
    } catch (e) {
        console.log('getMarketMakingPools error:', e);
    }
}

const fetchTotalSupply = async (wallet, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(TokenContract.address.testnet, TokenContract.abi, signer);
    // tokenContract.connect(signer)
    try {
        const result = await tokenContract.totalSupply();
        callback(result)
        console.log('fetchTotalSupply success')
    } catch (e) {
        alert(e)
        console.log('fetchTotalSupply error', e);
    }
}

const approveToken = async (wallet, addressToApprove, supplyToApprove, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(TokenContract.address.testnet, TokenContract.abi, signer);
    try {
        const allowanceTx = await tokenContract.approve(addressToApprove, supplyToApprove);
        await allowanceTx.wait();
        callback(supplyToApprove)
        console.log('approveToken success')
    } catch (e) {
        alert(e.message)
        console.log('approveToken error', e);
    }
}

export default {
    fetchTotalSupply,
    approveToken,
    getVaults,
    getMarketMakingPools
}