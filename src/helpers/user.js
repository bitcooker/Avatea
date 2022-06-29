import axios from 'axios';
import {API_URL} from "./constants";

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