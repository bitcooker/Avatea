import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import {API_URL, CLOUD_2_TOKEN_ADDRESS, DEFAULT_CHAIN_ID} from "./constants";
import helpers from '../helpers';
import {toast} from 'react-toastify';


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

const getMarketMakingSettings = async ({slug, network = DEFAULT_CHAIN_ID, user_address = "none"}) => {
    try {
        const {data} = await axios.get(`${API_URL}Project/${slug}/?network=${network}&user_address=${user_address}`);
        return data.UserSettings;
    } catch (e) {
        console.log('getMarketMakingSettings error:', e);
    }
}


//@Todo check api to allow API method and how to fix authentication
const updateMarketMakingPool = async ({settings, wallet}) => {
    try {
        const {volume, max_selling_amount, max_buying_amount, id} = settings;
        const signature = await helpers.web3.authentication.getSignature(wallet);
        console.log(wallet.account)
        console.log(signature)
            await axios(
                {
                    method: 'patch',
                    url: `${API_URL}MarketMakingPool/${id}/`,
                    data: {
                        volume,
                        max_selling_amount,
                        max_buying_amount,
                        signature
                    }
                }
            )
            toast.success('Settings saved succesfully.')

    } catch (e) {
        console.log('updateMarketMakingSettings error:', e);
        toast.error('Something wen\'t wrong.')
    }
}


//@Todo check api to allow API method and how to fix authentication
const updateMarketMakingSettings = async ({marketMakingSettings, wallet, fresh}) => {
    try {
        const {marketMakingType, amountSettings, pressure, priceLimit, marketMakingPoolId, id} = marketMakingSettings;
        const signature = await helpers.web3.authentication.getSignature(wallet);
        if (fresh) {
            //Consider it as a new post
            await axios(
                {
                    method: 'post',
                    url: `${API_URL}UserSettings/`,
                    data: {
                        market_making_type: marketMakingType,
                        amount: amountSettings,
                        buy_sell_pressure: pressure,
                        price_limit: priceLimit,
                        market_making_pool: marketMakingPoolId,
                        user_address: wallet.account,
                        signature
                    }
                }
            )
            toast.success('Settings saved succesfully.')
        } else {
            await axios(
                {
                    method: 'put',
                    url: `${API_URL}UserSettings/${id}/`,
                    data: {
                        market_making_type: marketMakingType,
                        amount: amountSettings,
                        buy_sell_pressure: pressure,
                        price_limit: priceLimit,
                        market_making_pool: marketMakingPoolId,
                        user_address: wallet.account,
                        signature
                    }
                }
            )
            toast.success('Settings saved succesfully.')
        }


    } catch (e) {
        console.log('updateMarketMakingSettings error:', e);
        toast.error('Something wen\'t wrong.')
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

export default {
    getMarketMakingPools,
    getMarketMakingPool,
    updateMarketMakingSettings,
    getMarketMakingSettings,
    updateMarketMakingPool
}