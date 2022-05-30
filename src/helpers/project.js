import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import {API_URL, CLOUD_2_TOKEN_ADDRESS, DEFAULT_CHAIN_ID} from "./constants";


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


export default {
    getProjects,
    getProject
}