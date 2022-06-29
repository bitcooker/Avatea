import {ethers} from 'ethers';
import AvateaToken from '../../abi/AvateaToken.json';
import { AVATEA_TOKEN_ADDRESS } from '../constants';
import {toast} from "react-toastify";
import helpers from '../../helpers';

const claim = async (wallet) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const avateaToken = await new ethers.Contract(AVATEA_TOKEN_ADDRESS, AvateaToken.abi, signer);
    try {
        const tx = await avateaToken.claim(wallet.account);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "AR",
            data: {
                receipt,
                wallet,
            }
        })
    } catch (e) {
        toast.error(`Application error: ${e}`,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }

        )
        console.log('claim error', e);
    }
}

const getClaimableAmount = async (wallet, address) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const avateaToken = await new ethers.Contract(AVATEA_TOKEN_ADDRESS, AvateaToken.abi, signer);
        return await avateaToken.getClaimableAmount(address);
    } catch (e) {
        console.log('fetchTotalSupply error', e);
        toast.error(e.reason);
        return 0;
    }
}

export default {
    claim,
    getClaimableAmount,
}