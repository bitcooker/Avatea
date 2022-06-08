import axios from 'axios';
import {API_URL} from "./constants";
import helpers from "./index";


const getArticles = async ({project, callback} = {}) => {

    let parameters = "?";
    if (project) parameters += `project=${project}&`;


    try {
        const {data} = await axios.get(`${API_URL}Article/${parameters}`);
        callback(data)
    } catch (e) {
        console.log('getArticles error:', e);
    }
}


const updateArticle = async ({id, title, description, image, link, project, wallet}) => {
    try {
        const signature = await helpers.web3.authentication.getSignature(wallet);

        await axios(
            {
                method: 'put',
                url: `${API_URL}Article/${id}/`,
                data: {
                    id,
                    title,
                    description,
                    image,
                    link,
                    project,
                    signature
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
                data: {
                    title,
                    description,
                    image,
                    link,
                    project,
                    signature
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
    deleteArticle
}