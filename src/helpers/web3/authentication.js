import axios from "axios";
import {API_URL, DEFAULT_CHAIN_ID, RPC_URL} from "../constants";
import {ethers} from "ethers";

async function getNonce(wallet) {
    const {data} = await axios.post(`${API_URL}UserAddress/${wallet}/retrieve_nonce/`);
    return data.nonce
}

async function getSignature(wallet) {
    let nonce = await getNonce(wallet.account)
    let msg = "Signature in order to authenticate:  " + nonce
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    let signature = await signer.signMessage(msg)
    return signature
}

async function getSigner(wallet, chainId = DEFAULT_CHAIN_ID) {
    let provider, signer;

    if(wallet.isConnected()) {
        provider = await new ethers.providers.Web3Provider(wallet.ethereum);
        signer = await provider.getSigner();
    } else {
        provider = await new ethers.providers.JsonRpcProvider(RPC_URL[chainId]);
        signer = provider;
    }

    return {
        provider, signer
    }
}

export default {
   getSignature,
    getSigner
}