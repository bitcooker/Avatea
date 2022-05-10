import axios from 'axios';
import { ethers } from 'ethers';
import TokenContract from '../abi/token.json';

const getVaults = async (wallet, callback) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/Vault/?invested=${wallet}`, {});
        callback(data)
    } catch(e) {
        console.log('getVault error:', e);
    }

}

const fetchTotalSupply = async(wallet,callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(TokenContract.address.testnet, TokenContract.abi,signer);
    // tokenContract.connect(signer)
    try {
        const result = await tokenContract.totalSupply();
        callback(result)
        console.log('fetchTotalSupply success')
    } catch(e) {
        alert(e)
        console.log('fetchTotalSupply error',e);
    }
}

const approveToken = async(wallet,addressToApprove,supplyToApprove,callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(TokenContract.address.testnet, TokenContract.abi,signer);
    try {
        const allowanceTx = await tokenContract.approve(addressToApprove, supplyToApprove);
        await allowanceTx.wait();
        console.log('approveToken success')
    } catch(e) {
        alert(e)
        console.log('fetchTotalSupply error',e);
    }
}

export {
    fetchTotalSupply,
    approveToken,
    getVaults
}