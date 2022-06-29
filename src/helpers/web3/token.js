import {ethers} from 'ethers';
import TokenContract from '../../abi/Token.json';
import { CLOUD_2_TOKEN_ADDRESS} from "../constants";
import {toast} from "react-toastify";

const fetchTotalSupply = async (wallet, tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(tokenAddress, TokenContract.abi, signer);
    try {
        return await tokenContract.totalSupply();
    } catch (e) {
        toast.error(e.reason);
        console.log('fetchTotalSupply error', e);
    }
}

const balanceOf = async (wallet, tokenAddress, address) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(tokenAddress, TokenContract.abi, signer);
    try {
        return await tokenContract.balanceOf(address);
    } catch (e) {
        toast.error(e.reason);
        console.log('balanceOf error', e);
    }
}

const fetchApprovedAmount = async (wallet,addressToApprove, tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(tokenAddress, TokenContract.abi, signer);
    try {
        return await tokenContract.allowance(wallet.account, addressToApprove);
    } catch (e) {
        toast.error(e.reason);
        console.log('fetchApprovedAmount error', e);
    }
}

const approveToken = async (wallet, addressToApprove, supplyToApprove) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(CLOUD_2_TOKEN_ADDRESS, TokenContract.abi, signer);
    try {
        const tx = await tokenContract.approve(addressToApprove, supplyToApprove);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            },
            {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            }
        )
    } catch (e) {
        toast.error(e.reason);
        console.log('approveToken error', e);
    }
}

const approveCustomToken = async (wallet, addressToApprove, supplyToApprove, tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(tokenAddress, TokenContract.abi, signer);
    try {
        const tx = await tokenContract.approve(addressToApprove, supplyToApprove);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            },
            {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        )
    } catch (e) {
        toast.error(e.reason);
        console.log('approveToken error', e);
    }
}

export default {
    fetchTotalSupply,
    approveToken,
    approveCustomToken,
    fetchApprovedAmount,
    balanceOf
}