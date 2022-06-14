import axios from 'axios';
import { API_URL } from "./constants";
import {ethers} from 'ethers';

//@Todo check register method, temp done with extra fields because of error
const hook = async({type, data, callback = () => {}}) => {
    try {
        let event;
        switch(type) {
            case 'MMBD':
                event = data.receipt.events.find(x => x.event === "Staked").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount:ethers.utils.formatEther( event._amount ),
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
                    amount:ethers.utils.formatEther( event._amount ),
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