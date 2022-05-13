import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import {API_URL, CLOUD_2_TOKEN_ADDRESS} from "./constants";


const getVaults = async ({invested, saved, live, network, callback} = {}) => {
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

const getMarketMakingPools = async ({invested, saved, live, network, callback} = {}) => {

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

const getProjects = async ({live, network} = {}) => {

    let parameters = "?";
    if (live) parameters += `live=${live}&`
    if (network) parameters += `network=${network}&`

    try {
        const {data} = await axios.get(`${API_URL}Project/${parameters}`);
        return data;
    } catch (e) {
        console.log('getProjects error:', e);
    }
}

//@TODO CHECK DEFAULT NETWORK
const getProject = async (slug, network = "RTN") => {
    try {
        const { data } = await axios.get(`${API_URL}ProjectWithNetwork/${slug}/?network=${network}`);
        const { project, vault, marketMakingPool } = data;
        return {project, vault, marketMakingPool};
    } catch (e) {
        console.log('getProject error:', e);
    }
}

const getVault = async (id) => {
    try {
        const {data} = await axios.get(`${API_URL}Vault/${id}/`);
        return data;
    } catch (e) {
        console.log('getVault error:', e);
    }
}

const getMarketMakingPool = async (id) => {
    try {
        const {data} = await axios.get(`${API_URL}MarketMakingPool/${id}/`);
        return data;
    } catch (e) {
        console.log('getMarketMakingPool error:', e);
    }
}

const fetchTotalSupply = async (wallet, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(TokenContract.address.testnet, TokenContract.abi, signer);
    // tokenContract.connect(signer)
    try {
        return await tokenContract.totalSupply();
    } catch (e) {
        alert(e)
        console.log('fetchTotalSupply error', e);
    }
}

const approveToken = async (wallet, addressToApprove, supplyToApprove) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(CLOUD_2_TOKEN_ADDRESS, TokenContract.abi, signer);
    try {
        const allowanceTx = await tokenContract.approve(addressToApprove, supplyToApprove);
        await allowanceTx.wait();
    } catch (e) {
        alert(e.message)
        console.log('approveToken error', e);
    }
}

const approveCustomToken = async (wallet, addressToApprove, supplyToApprove, tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(tokenAddress, TokenContract.abi, signer);
    try {
        const allowanceTx = await tokenContract.approve(addressToApprove, supplyToApprove);
        await allowanceTx.wait();
    } catch (e) {
        alert(e.message)
        console.log('approveToken error', e);
    }
}

export default {
    fetchTotalSupply,
    approveToken,
    getVaults,
    getProjects,
    getProject,
    getMarketMakingPools,
    getVault,
    getMarketMakingPool,
    approveCustomToken
}