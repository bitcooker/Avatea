import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import {API_URL, CLOUD_2_TOKEN_ADDRESS, DEFAULT_CHAIN_ID} from "./constants";

//@Todo check register method, temp done with extra fields because of error
const registerUser = async(wallet,setter) => {
    try {
        await axios.post(`${API_URL}UserAddress/`, {
            address: wallet.account,
        });
        setter(true);
    } catch (e) {
        setter(true);
    }
}

export default {
    registerUser
}