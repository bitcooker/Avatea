import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import {API_URL, CLOUD_2_TOKEN_ADDRESS, DEFAULT_CHAIN_ID} from "./constants";


const getVaults = async ({invested, saved, live, network = DEFAULT_CHAIN_ID, callback} = {}) => {
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

const getMarketMakingPools = async ({invested, saved, live, network = DEFAULT_CHAIN_ID, callback} = {}) => {

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

const getProjects = async ({live, network = DEFAULT_CHAIN_ID} = {}) => {

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

//@TODO Handle error for market maker settings if no wallet is available
const getProject = async (slug, network = DEFAULT_CHAIN_ID, user_address = "none") => {
    try {
        const {data} = await axios.get(`${API_URL}Project/${slug}/?network=${network}&user_address=${user_address}`);
        const {project, vault, marketMakingPool, MarketMakingPoolUserSettings} = data;
        return {project, vault, marketMakingPool, MarketMakingPoolUserSettings};
    } catch (e) {
        console.log('getProject error:', e);
    }
}

const getMarketMakingSettings = async ({slug, network = DEFAULT_CHAIN_ID, user_address = "none"}) => {
    try {
        const {data} = await axios.get(`${API_URL}Project/${slug}/?network=${network}&user_address=${user_address}`);
        return data.MarketMakingPoolUserSettings;
    } catch (e) {
        console.log('getMarketMakingSettings error:', e);
    }
}

//@Todo check api to allow API method and how to fix authentication
const updateMarketMakingSettings = async ({network = DEFAULT_CHAIN_ID, marketMakingSettings, wallet, fresh}) => {
    try {
        const {marketMakingType, amountSettings, pressure, volume, marketMakingPoolId, id } = marketMakingSettings;
        let signature = await get_signature(wallet)
        if (fresh) {
            //Consider it as a new post
            await axios(
                {
                    method: 'post',
                    url: `${API_URL}MarketMakingPoolUserSettings/?network=${network}`,
                    data: {
                        market_making_type: marketMakingType,
                        amount: amountSettings,
                        buy_sell_pressure: pressure,
                        volume,
                        market_making_pool: marketMakingPoolId,
                        user_address: wallet.account,
                        signature:signature
                    }
                }
            )
        } else {
            await axios(
                {
                    method: 'put',
                    url: `${API_URL}MarketMakingPoolUserSettings/${id}/?network=${network}`,
                    data: {
                        market_making_type: marketMakingType,
                        amount: amountSettings,
                        buy_sell_pressure: pressure,
                        volume,
                        market_making_pool: marketMakingPoolId,
                        user_address: wallet.account,
                        signature:signature
                    }
                }
            )
        }


    } catch (e) {

        console.log('updateMarketMakingSettings error:', e);
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

//@Todo check register method, temp done with extra fields because of error
const registerUser = async(wallet) => {
    try {
        await axios.post(`${API_URL}UserAddress/`, {
            address: wallet.account,
            "MarketMakingPool_of_invested": [],
            "MarketMakingPool_of_saved": [],
            "Vault_of_invested": [],
            "Vault_of_saved": []
        });
    } catch (e) {
        console.log('registerUser error:', e);
    }
}


async function get_nonce(wallet) {
    const {data} = await axios.get(`${API_URL}UserAddress/${wallet}/`);
    return data.nonce
}

async function get_signature(wallet) {
    let nonce = await get_nonce(wallet.account)
    let msg = "Signature in order to authenticate:  " + nonce
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    let signature = await signer.signMessage(msg)
    return signature
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
    approveCustomToken,
    updateMarketMakingSettings,
    getMarketMakingSettings,
    registerUser
}