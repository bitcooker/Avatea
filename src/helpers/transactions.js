import axios from 'axios';
import {API_URL, DEFAULT_CHAIN_ID} from "./constants";


const getTransactions = async ({userAddress,contract, network = DEFAULT_CHAIN_ID,type,project, callback = () => {}} = {}) => {

    let parameters = "?";
    if (userAddress) parameters += `user_address=${userAddress}&`
    if (contract) parameters += `contract=${contract}&`
    if (network) parameters += `network=${network}&`
    if (type) parameters += `type=${type}&`
    if (project) parameters += `project=${project}&`

    try {
        const {data} = await axios.get(`${API_URL}Transaction/${parameters}`);
        return data;
    } catch (e) {
        console.log('getTransactions error:', e);
    }
}




export default {
    getTransactions
}