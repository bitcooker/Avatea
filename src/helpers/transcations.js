import axios from 'axios';
import {API_URL, DEFAULT_CHAIN_ID} from "./constants";
import helpers from '../helpers';
import {toast} from 'react-toastify';


const getTransactions = async ({user_address,contract, network = DEFAULT_CHAIN_ID, callback} = {}) => {

    let parameters = "?";
    if (user_address) parameters += `user_address=${user_address}&`
    if (contract) parameters += `contract=${contract}&`
    if (saved) parameters += `saved=${saved}&`
    if (network) parameters += `network=${network}&`

    try {
        const {data} = await axios.get(`${API_URL}Transaction/${parameters}`);
        callback(data)
    } catch (e) {
        console.log('getMarketMakingPools error:', e);
    }
}




export default {
    getTransactions
}