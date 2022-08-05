import axios from 'axios';
import {API_URL} from "./constants";
import helpers from "./index";
import {toast} from "react-toastify";


const getMessages = async ({recipient,project, callback = () => {}} = {}) => {

    let parameters = "?";
    if (recipient) parameters += `recipient=${recipient}&`
    if (project) parameters += `project=${project}&`

    try {
        const {data} = await axios.get(`${API_URL}Message/${parameters}`);
        return data;
    } catch (e) {
        console.log('getTransactions error:', e);
    }
}

const createMessage = async ({wallet, subject, body, user_addresses,project, callback = () => {}} = {}) => {
    try {
        const signature = await helpers.web3.authentication.getSignature(wallet);
        await axios(
            {
                method: 'post',
                url: `${API_URL}Message/bulk_create/`,
                data: {
                    body,
                    subject,
                    project,
                    user_addresses,
                    signature,
                    sender: wallet.account
                }
            }
        )
        return true
    } catch (e) {
        console.log('createMessage error:', e);
        toast.error('Something wen\'t wrong.')
        return false

    }
};


const readMessage = async ({id, callback = () => {}} = {}) => {
    try {
        const {data} = await axios(
            {
                method: 'post',
                url: `${API_URL}Message/${id}/read/`,
            }
        )
        return data
    } catch (e) {
        console.log('readMessage error:', e);
    }
};

const getMessage = async ({id, callback = () => {}} = {}) => {
    try {
        const {data} = await axios(
            {
                method: 'get',
                url: `${API_URL}Message/${id}/`,
            }
        )
        return data
    } catch (e) {
        console.log('getMessage error:', e);
    }
};

const markMessageAsDeleted = async ({wallet, id, callback = () => {}} = {}) => {
    try {
        const signature = await helpers.web3.authentication.getSignature(wallet);
        await axios(
            {
                method: 'post',
                url: `${API_URL}Message/${id}/delete/`,
                data: {
                    signature,
                    user_address: wallet.account
                }
            }
        )
        return true
    } catch (e) {
        console.log('markMessageAsDeleted error:', e);
        return false
    }
};


export default {
    getMessages,
    createMessage,
    readMessage,
    getMessage,
    markMessageAsDeleted
}