import axios from 'axios';
import {API_URL, DEFAULT_CHAIN_ID} from "./constants";


const getLiquidityMakers = async ({
                                      invested, saved, live, network = DEFAULT_CHAIN_ID, callback = () => {
    }
                                  } = {}) => {
    let parameters = "?";
    if (invested) parameters += `invested=${invested}&`;
    if (saved) parameters += `saved=${saved}&`;
    if (live) parameters += `live=${live}&`;
    if (network) parameters += `network=${network}&`;
    try {
        const {data} = await axios.get(`${API_URL}LiquidityMaker/${parameters}`);
        //callback(data)
        return data;
    } catch (e) {
        console.log('getLiquidityMakers error:', e);
    }
}

const getLiquidityMaker = async (id) => {
    try {
        const {data} = await axios.get(`${API_URL}LiquidityMaker/${id}/`);
        return data;
    } catch (e) {
        console.log('getLiquidityMaker error:', e);
    }
}

export default {
    getLiquidityMakers,
    getLiquidityMaker
}