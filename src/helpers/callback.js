import axios from 'axios';
import { API_URL } from "./constants";

//@Todo check register method, temp done with extra fields because of error
const hook = async({type, data, callback = () => {}}) => {
    try {
        switch(type) {
            case 'WITHDRAWAL':
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
            case 'DEPOSIT':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    from: data.receipt.from,
                    type: 'deposit',
                    contract: data.receipt.to,
                    amount:0,
                    currency: data.currency,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'INVESTMENT':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    from: data.receipt.from,
                    type: 'investment',
                    contract: data.receipt.to,
                    amount:0,
                    currency: data.currency,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'TRANSACTION':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    from: data.receipt.from,
                    type: 'transaction',
                    contract: data.receipt.to,
                    amount:0,
                    currency: data.currency,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'RELEASE':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    from: data.receipt.from,
                    type: 'release',
                    contract: data.receipt.to,
                    amount:0,
                    currency: data.currency,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'VESTING':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    from: data.receipt.from,
                    type: 'vesting',
                    contract: data.receipt.to,
                    amount:0,
                    currency: data.currency,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'DEPLOYMENT':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    from: data.receipt.from,
                    type: 'deployment',
                    contract: data.receipt.to,
                    amount:0,
                    currency: data.currency,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
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