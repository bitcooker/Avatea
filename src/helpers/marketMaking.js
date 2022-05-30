import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import {API_URL, CLOUD_2_TOKEN_ADDRESS, DEFAULT_CHAIN_ID} from "./constants";



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
        return data.MarketMakingPoolUserSettings;
    } catch (e) {
        console.log('getMarketMakingSettings error:', e);
    }
}

//@Todo check api to allow API method and how to fix authentication
const updateMarketMakingSettings = async ({network = DEFAULT_CHAIN_ID, marketMakingSettings, wallet, fresh}) => {
    try {
        const { marketMakingType, amountSettings, pressure, volume, marketMakingPoolId, id } = marketMakingSettings;
        if (fresh) {
            //Consider it as a new post
            await axios(
                {
                    method: 'post',
                    url: `${API_URL}MarketMakingPoolUserSettings/?network=${network}`,
                    data:  {
                        market_making_type: marketMakingType,
                        amount: amountSettings,
                        buy_sell_pressure: pressure,
                        volume,
                        market_making_pool: marketMakingPoolId,
                        user_address: wallet.account
                    }
                }
            )
        } else {
            await axios(
                {
                    method: 'put',
                    url: `${API_URL}MarketMakingPoolUserSettings/${id}/?network=${network}`,
                    data:  {
                        market_making_type: marketMakingType,
                        amount: amountSettings,
                        buy_sell_pressure: pressure,
                        volume,
                        market_making_pool: marketMakingPoolId,
                        user_address: wallet.account
                    }
                }
            )
        }



    } catch (e) {

        console.log('updateMarketMakingSettings error:', e);
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
    getMarketMakingSettings
}