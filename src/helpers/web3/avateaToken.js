import {ethers} from 'ethers';
import AvateaToken from '../../abi/AvateaToken.json';
import { AVATEA_TOKEN_ADDRESS } from '../constants';

const claim = async (wallet) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const avateaToken = await new ethers.Contract(AVATEA_TOKEN_ADDRESS, AvateaToken.abi, signer);

    try {
        const allowanceTx = await avateaToken.claim(wallet.account);
        await allowanceTx.wait();
    } catch (e) {
        alert(e)
        console.log('claim error', e);
    }
}

const getClaimableAmount = async (wallet, address) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const avateaToken = await new ethers.Contract(AVATEA_TOKEN_ADDRESS, AvateaToken.abi, signer);
    try {
        return await avateaToken.getClaimableAmount(address);
    } catch (e) {
        alert(e)
        console.log('fetchTotalSupply error', e);
    }
}

export default {
    claim,
    getClaimableAmount,
}