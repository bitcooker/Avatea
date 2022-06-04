import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import {API_URL, CLOUD_2_TOKEN_ADDRESS, DEFAULT_CHAIN_ID} from "./constants";
import {toast} from "react-toastify";
import helpers from "./index";

const fetchTotalSupply = async (wallet, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(TokenContract.address.testnet, TokenContract.abi, signer);
    // tokenContract.connect(signer)
    try {
        return await tokenContract.totalSupply();
    } catch (e) {
        alert(e)
        console.log('fetchTotalSupply error', e);
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
        alert(e.message)
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
        alert(e.message)
        console.log('approveToken error', e);
    }
}

export default {
    fetchTotalSupply,
    approveToken,
    approveCustomToken
}