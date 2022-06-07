import {ethers} from 'ethers';
import MarketMakerDeployer from '../../abi/MarketMakerDeployer.json';
import {toast} from "react-toastify";
import helpers from "../index";
import {API_URL, MARKET_MAKER_DEPLOYER_ADDRESS} from '../constants';
import axios from "axios";


const deploy = async (wallet, baseToken, pairedToken, revocable, project, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const MarketMakerDeployerContract = await new ethers.Contract(MARKET_MAKER_DEPLOYER_ADDRESS, MarketMakerDeployer.abi, signer);

    try {
        const tx = await MarketMakerDeployerContract.createMarketMaker(baseToken, pairedToken, revocable);
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

        let marketMaker = receipt.events.CreatedMarketMakingContract.returnValues._marketMaker;
        let controllerWallet = receipt.events.CreatedMarketMakingContract.returnValues._controllerWallet;

        await axios(
            {
                method: 'post',
                url: `${API_URL}MarketMakingPool`,
                data: {
                    address: marketMaker,
                    controller_wallet: controllerWallet,
                    paired_token: pairedToken,
                    project: project,
                }
            }
        )

        console.log('stake success')
    } catch (e) {
        alert(e)
        console.log('stake error', e);
    }
}

export default {
    deploy
}