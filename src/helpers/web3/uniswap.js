import {ethers} from 'ethers';
import IUniswapV2Router from '../../abi/IUniswapV2Router.json';
import {toast} from "react-toastify";
import {DEFAULT_CHAIN_ID, DEX_ROUTER, RPC_URL} from "../constants";


const getPrice = async (wallet, baseToken, pairedToken, chainId = DEFAULT_CHAIN_ID) => {

    try {
        let provider, signer;
        if(wallet.isConnected()) {
            provider = new ethers.providers.Web3Provider(wallet.ethereum);
            signer = provider.getSigner();
            console.log(signer,baseToken, pairedToken)
        } else {
            provider = await new ethers.providers.JsonRpcProvider(RPC_URL[chainId]);
            signer = provider;
            console.log(signer, baseToken, pairedToken)
        }

        let path = [baseToken, pairedToken]
        const router = await new ethers.Contract(DEX_ROUTER[wallet.isConnected() ? wallet.chainId : chainId], IUniswapV2Router.abi, signer);
        let amountsOut = await router.getAmountsOut(ethers.utils.parseUnits('1', 'gwei'), path);
        let amountOut = await amountsOut[1]
        let price = ethers.utils.formatUnits(amountOut, 'gwei')
        return Math.floor(price * 100) / 100
    } catch (e) {
        console.log('getPrice error', e);
        toast.error(e.reason);
        return 0;
    }
}

export default {
    getPrice,
}