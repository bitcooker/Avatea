import {ethers} from 'ethers';
import IUniswapV2Router from '../../abi/IUniswapV2Router.json';
import {toast} from "react-toastify";
import {DEX_ROUTER} from "../constants";


const getPrice = async (wallet, baseToken, pairedToken) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();

        let path = [baseToken, pairedToken]
        const router = await new ethers.Contract(DEX_ROUTER[wallet.chainId], IUniswapV2Router.abi, signer);
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