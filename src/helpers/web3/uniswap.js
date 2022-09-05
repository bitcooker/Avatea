import {ethers} from 'ethers';
import IUniswapV2Router from '../../abi/IUniswapV2Router.json';
import {toast} from "react-toastify";
import {DEFAULT_CHAIN_ID, DEX_ROUTER, RPC_URL} from "../constants";
import helpers from "../index";


const getPrice = async (wallet, baseToken, pairedToken, chainId = DEFAULT_CHAIN_ID) => {

    try {
        const { signer } = await helpers.web3.authentication.getSigner(wallet, chainId)
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