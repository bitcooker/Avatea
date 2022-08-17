import axios from 'axios';
import {API_URL} from "./constants";
import {ethers} from 'ethers';

const hook = async ({
                        type, data, callback = () => {
    }
                    }) => {
    try {
        let event;
        switch (type) {
            case 'AR':
                event = data.receipt.events.find(x => x.event === "Claimed").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.claimed)).toFixed(2),
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
                    amount: Number(ethers.utils.formatEther(event.amount)).toFixed(2),
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
                    amount: Number(ethers.utils.formatEther(event.amount)).toFixed(2),
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
                    amount: Number(ethers.utils.formatEther(event.reward)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                })
                callback()
                break;
            case 'VA':
                event = data.receipt.events.find(x => x.event === "RewardAdded").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.reward)).toFixed(2),
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
                    amount: Number(ethers.utils.formatEther(event.amount)).toFixed(2),
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
                    amount: Number(ethers.utils.formatEther(event._amount)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId
                })
                callback()
                hook({type: "MMAS", data})
                break;
            case 'MMPD':
                event = data.receipt.events.find(x => x.event === "StakedInPairedToken").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event._amount)).toFixed(2),
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
                    amount: Number(ethers.utils.formatEther(event._amount)).toFixed(2),
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
                    amount: Number(ethers.utils.formatEther(event._amount)).toFixed(2),
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
                    amount: Number(ethers.utils.formatEther(event._amount)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'MMRT':
                event = data.receipt.events.find(x => x.event === "VestingRevoked").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event._amount)).toFixed(2),
                    user_address: data.user_address,
                    network: data.wallet.chainId,
                })
                callback()
                await hook({type: "MMVR", data});
                break;
            case 'MMCD':
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.address,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'MMAS':
                event = data.receipt.events.find(x => x.event === "SetAllowSelling").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    value: event._allowSelling.toString(),
                    contract: data.receipt.to,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'MMAR':
                event = data.receipt.events.find(x => x.event === "SetAllowReleasing").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    value: event._allowReleasing.toString(),
                    contract: data.receipt.to,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'MMBR':
                event = data.receipt.events.find(x => x.event === "SetMaxBaseLiquidityRatio").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    value: event._ratio,
                    contract: data.receipt.to,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'MMPR':
                event = data.receipt.events.find(x => x.event === "SetMaxPairedLiquidityRatio").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    value: event._ratio,
                    contract: data.receipt.to,
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'LMW':
                event = data.receipt.events.find(x => x.event === "Withdrawn").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.amount)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                    full_withdrawal: data.full_withdrawal
                })
                callback()
                break;
            case 'LMR':
                event = data.receipt.events.find(x => x.event === "RewardPaid").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.reward)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                })
                callback()
                break;
            case 'LMC':
                event = data.receipt.events.find(x => x.event === "LiquidityRewardPaid").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.reward)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                })
                callback()
                break;
            case 'LMD':
                event = data.receipt.events.find(x => x.event === "Staked").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.amount)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                })
                callback()
                break;
            case 'LMA':
                event = data.receipt.events.find(x => x.event === "RewardAdded").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.reward)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                })
                callback()
                break;
            case 'LML':
                event = data.receipt.events.find(x => x.event === "LiquidityRewardAdded").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.reward)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
                })
                callback()
                break;
            case 'LME':
                event = data.receipt.events.find(x => x.event === "Withdrawn").args;
                await axios.post(`${API_URL}Transaction/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amount: Number(ethers.utils.formatEther(event.amount)).toFixed(2),
                    user_address: data.receipt.from,
                    network: data.wallet.chainId,
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

const batchHook = async ({
                             type, data, callback = () => {
    }
                         }) => {
    try {
        switch (type) {
            case 'MMBB':
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
                await axios.post(`${API_URL}Transaction/bulk_create_vesting/`, {
                    hash: data.receipt.transactionHash,
                    type: type,
                    contract: data.receipt.to,
                    amounts: data.amounts,
                    user_addresses: data.user_addresses,
                    network: data.wallet.chainId,
                    vesting_batch_start: data.start,
                    vesting_batch_cliff: data.cliff,
                    vesting_batch_duration: data.duration,
                    vesting_batch_slice: data.slicePeriodSeconds,
                    vesting_batch_revocable: data.revocable,
                    vesting_batch_name: data.batchName,
                    vesting_batch_created_by: data.receipt.from,
                    vesting_batch_project_id: data.projectName
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