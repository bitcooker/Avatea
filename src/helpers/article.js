import axios from 'axios';
import {API_URL} from "./constants";
import helpers from "./index";


const getArticles = async ({project}) => {

    let parameters = "?";
    if (project) parameters += `project=${project}&`;


    try {
        const { data } = await axios.get(`${API_URL}Article/${parameters}`);
        return data
    } catch (e) {
        console.log('getArticles error:', e);
    }
}

const getArticle = async(id) => {
    try {
        const { data } = await axios.get(`${API_URL}Article/${id}/`);
        return data
    } catch (e) {
        console.log('getArticle error:', e);
    }
}


const updateArticle = async ({id, title, description, image, link, project, wallet}) => {
    try {
        const signature = await helpers.web3.authentication.getSignature(wallet);

        await axios(
            {
                method: 'put',
                url: `${API_URL}Article/${id}/`,
                headers: {"Content-Type": "multipart/form-data"},
                data: {
                    id,
                    title,
                    description,
                    image,
                    link,
                    project,
                    signature,
                    user_address: wallet.account
                }
            }
        )

    } catch (e) {
        console.log('updateArticle error:', e);
    }
}


const deleteArticle = async ({id, wallet}) => {
    try {
        const signature = await helpers.web3.authentication.getSignature(wallet);

        await axios(
            {
                method: 'delete',
                url: `${API_URL}Article/${id}/`,
                data: {
                    signature
                }
            }
        )

    } catch (e) {
        console.log('deleteArticle error:', e);
    }
}


const createArticle = async ({title, description, image, link, project, wallet}) => {
    try {
        const signature = await helpers.web3.authentication.getSignature(wallet);

        await axios(
            {
                method: 'post',
                url: `${API_URL}Article/`,
                headers: {"Content-Type": "multipart/form-data"},
                data: {
                    title,
                    description,
                    image,
                    link,
                    project,
                    signature,
                    user_address: wallet.account
                }
            }
        )

    } catch (e) {
        console.log('createArticle error:', e);
    }
}


export default {
    getArticles,
    updateArticle,
    createArticle,
    deleteArticle,
    getArticle
}