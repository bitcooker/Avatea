import axios from 'axios';
import { API_URL } from "./constants";

//@Todo check register method, temp done with extra fields because of error
const hook = async({type, data, callback = () => {}}) => {
    try {
        switch(type) {
            case 'TRANSACTION':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    from: data.receipt.from,
                    type: 'withdrawal',
                    contract: data.receipt.to,
                    amount:0,
                    currency: data.currency,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'NONE':
                break;
            default:
                return
        }
    } catch (e) {
        console.log('Hook error:', e)
    }
}

export default {
    hook
}