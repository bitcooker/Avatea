import {ethers} from 'ethers';
import vault from '../../abi/Vault.json';
import {toast} from "react-toastify";
import helpers from "../index";


const stake = async (wallet, vaultAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);

    try {
        const tx = await vaultContract.stake(amount);
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
                pauseOnHover: false,
                draggable: false,
                progress: true,
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "DEPOSIT",
            data: {
                receipt,
                wallet,
                currency: "VAULT"
            }
        })
        console.log('stake success')
    } catch (e) {
        alert(e)
        console.log('stake error', e);
    }
}

const withdraw = async (wallet, vaultAddress, amount) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);

    try {
        const tx = await vaultContract.withdraw(amount);
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
                pauseOnHover: false,
                draggable: false,
                progress: true,
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "WITHDRAW",
            data: {
                receipt,
                wallet,
                currency: "VAULT"
            }
        })
        console.log('withdraw success')
    } catch (e) {
        alert(e)
        console.log('withdraw error', e);
    }
}

const getReward = async (wallet, vaultAddress, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);

    try {
        const allowanceTx = await vaultContract.getReward();
        await allowanceTx.wait();
        console.log('getReward success')
    } catch (e) {
        alert(e)
        console.log('getReward error', e);
    }
}

const exit = async (wallet, vaultAddress, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);

    try {
        const tx = await vaultContract.exit();
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
                pauseOnHover: false,
                draggable: false,
                progress: true,
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "WITHDRAW",
            data: {
                receipt,
                wallet,
                currency: "VAULT"
            }
        })
        console.log('exit success')
    } catch (e) {
        alert(e)
        console.log('exit error', e);
    }
}

const balanceOf = async (wallet, vaultAddress, address) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);
    try {
        return await vaultContract.balanceOf(address);
        console.log('balanceOf success')
    } catch (e) {
        alert(e)
        console.log('balanceOf error', e);
    }
}

export default {
    stake,
    withdraw,
    balanceOf,
    getReward,
    exit,
}