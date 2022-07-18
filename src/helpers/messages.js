import axios from 'axios';
import {API_URL, DEFAULT_CHAIN_ID} from "./constants";
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
        toast.success('Message sent successfully.')

    } catch (e) {
        console.log('createMessage error:', e);
        toast.error('Something wen\'t wrong.')
    }
};


const markMessageAsRead = async ({wallet, id, callback = () => {}} = {}) => {
    try {
        const signature = await helpers.web3.authentication.getSignature(wallet);
        await axios(
            {
                method: 'post',
                url: `${API_URL}Message/${id}/read/`,
            }
        )
        toast.success('Message marked as read successfully.')

    } catch (e) {
        console.log('markMessageAsRead error:', e);
        toast.error('Something wen\'t wrong.')
    }
};

const markMessageAsDeleted = async ({wallet, id, callback = () => {}} = {}) => {
    try {
        const signature = await helpers.web3.authentication.getSignature(wallet);
        await axios(
            {
                method: 'post',
                url: `${API_URL}Message/${id}/delete/`,
            }
        )
        toast.success('Message marked as deleted successfully.')

    } catch (e) {
        console.log('markMessageAsDeleted error:', e);
        toast.error('Something wen\'t wrong.')
    }
};



export default {
    getMessages,
    createMessage,
    markMessageAsRead,
    markMessageAsDeleted
}