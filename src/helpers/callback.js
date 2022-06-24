import axios from 'axios';
import {API_URL} from "./constants";
import {ethers} from 'ethers';

//@Todo check register method, temp done with extra fields because of error
const hook = async ({type, data, callback = () => {}}) => {
    try {
        let event;
        switch (type) {
            case 'AR':
                event = data.receipt.events.find(x => x.event === "Claimed").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event.claimed),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'VD':
                event = data.receipt.events.find(x => x.event === "Staked").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event.amount),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'VW':
                event = data.receipt.events.find(x => x.event === "Withdrawn").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event.amount),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'VR':
                event = data.receipt.events.find(x => x.event === "RewardPaid").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event.reward),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                })
                callback()
                break;
            case 'VE':
                event = data.receipt.events.find(x => x.event === "Withdrawn").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event.amount),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                })
                callback()
                break;
            case 'MMBD':
                event = data.receipt.events.find(x => x.event === "Staked").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event._amount),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'MMPD':
                event = data.receipt.events.find(x => x.event === "StakedInPairedToken").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event._amount),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'MMBW':
                event = data.receipt.events.find(x => x.event === "WithdrawnBaseToken").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event._amount),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'MMPW':
                event = data.receipt.events.find(x => x.event === "WithdrawnPairedToken").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event._amount),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'MMVR':
                event = data.receipt.events.find(x => x.event === "AmountReleased").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: ethers.utils.formatEther(event._amount),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'MMCD':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
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

const batchHook = async ({type, data, callback = () => {}}) => {
    try {
        switch (type) {
            case 'MMBD':
                await axios.post(`${API_URL}Transaction/bulk_create/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amounts: data.amounts,
                    user_addresses: data.user_addresses,
                    network: data.wallet.chainId
                })
                callback()
                break;
            case 'MMVD':
                await axios.post(`${API_URL}Transaction/bulk_create/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amounts: data.amounts,
                    user_addresses: data.user_addresses,
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
    hook,
    batchHook
}