import {ethers} from 'ethers';
import vault from '../../abi/Vault.json';
import {toast} from "react-toastify";
import helpers from "../index";
import helper from "../index";


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
      }
    )
    const receipt = await tx.wait();
    console.log(receipt);
    await helpers.callback.hook({
      type: "VD",
      data: {
        receipt,
        wallet,
      }
    })
    console.log('stake success')
  } catch (e) {
    alert(e)
    console.log('stake error', e);
  }
}

const withdraw = async (wallet, vaultAddress, amount, full_withdrawal) => {
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
      }
    )
    const receipt = await tx.wait();
    console.log(receipt);
    await helpers.callback.hook({
      type: "VW",
      data: {
        receipt,
        wallet,
        full_withdrawal
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
    const tx = await vaultContract.getReward();
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
      type: "VR",
      data: {
        receipt,
        wallet,
      }
    })
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
      }
    )
    const receipt = await tx.wait();
    console.log(receipt);
    await helpers.callback.hook({
      type: "VE",
      data: {
        receipt,
        wallet,
      }
    })
    console.log('exit success')
  } catch (e) {
    alert(e)
    console.log('exit error', e);
  }
}

const balanceOf = async (wallet, vaultAddress, address) => {
  try {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);
    return await vaultContract.balanceOf(address);
  } catch (e) {
    console.log('balanceOf error', e);
    return 0;
  }
}

const earned = async (wallet, vaultAddress, address) => {
  try {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);
    return await vaultContract.earned(address);
  } catch (e) {
    console.log('earned error', e);
    return 0;
  }
}

const totalSupply = async (wallet, vaultAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);
    return await vaultContract.totalSupply();
  } catch (e) {
    console.log('totalSupply error', e);
    return 0;
  }
}

const rewardPerToken = async (wallet, vaultAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const vaultContract = await new ethers.Contract(vaultAddress, vault.abi, signer);
    let rewardRate = await vaultContract.rewardRate();
    let totalSupply = await vaultContract.totalSupply();
    let daily_reward = (rewardRate * 3600 * 24) / totalSupply
    return daily_reward.toFixed(2);
  } catch (e) {
    console.log('rewardPerToken error', e);
    return 0;
  }
}

export default {
  stake,
  withdraw,
  balanceOf,
  getReward,
  exit,
  earned,
  rewardPerToken,
  totalSupply
}