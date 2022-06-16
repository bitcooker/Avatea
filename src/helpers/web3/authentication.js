import axios from "axios";
import {API_URL} from "../constants";
import {ethers} from "ethers";

async function getNonce(wallet) {
    const {data} = await axios.get(`${API_URL}UserAddress/${wallet}/`);
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

export default {
   getSignature
}