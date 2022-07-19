import axios from 'axios';
import {API_URL} from "./constants";

const registerUser = async(wallet,setter,setUnreadMessages) => {
    try {
        const {data} = await axios.post(`${API_URL}UserAddress/`, {
            address: wallet.account,
        });
        setUnreadMessages(data.num_unread_messages);
        setter(true);
    } catch (e) {
        setter(true);
    }
}

export default {
    registerUser
}