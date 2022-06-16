import {ethers} from 'ethers';


const web3_format =  (web3RetunValue) => {
        return Number(ethers.utils.formatEther(web3RetunValue)).toFixed(2);
}


export default {
    web3_format
}