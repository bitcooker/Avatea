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

const getVault = async (id) => {
    try {
        const {data} = await axios.get(`${API_URL}Vault/${id}/`);
        return data;
    } catch (e) {
        console.log('getVault error:', e);
    }
}

export default {
    getVaults,
    getVault
}