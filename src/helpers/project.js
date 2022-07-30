import axios from 'axios';
import {API_URL, DEFAULT_CHAIN_ID} from "./constants";
import helpers from "./index";
import Swal from "sweetalert2";


const getProjects = async ({live = 'True', admin} = {}) => {

    let parameters = "?";
    if (live) parameters += `live=${live}&`
    if (admin) parameters += `admin=${admin}&`

    try {
        const {data} = await axios.get(`${API_URL}Project/${parameters}`);
        return data;
    } catch (e) {
        console.log('getProjects error:', e);
    }
}

//@TODO Handle error for market maker settings if no wallet is available
const getProject = async (slug, network = DEFAULT_CHAIN_ID, user_address = "none") => {
    try {
        const {data} = await axios.get(`${API_URL}Project/${slug}/?network=${network}&user_address=${user_address}`);
        const {project, vault, marketMakingPool, UserSettings, liquidityMaker} = data;
        return {project, vault, marketMakingPool, UserSettings, liquidityMaker};
    } catch (e) {
        console.log('getProject error:', e);
    }
}

const getProjectServerSide = async (context, network = DEFAULT_CHAIN_ID, user_address = "none") => {
    const {slug} = context.query;
    if (slug !== "undefined") {
        try {
            const {data} = await axios.get(`${API_URL}Project/${slug}/?network=${network}&user_address=${user_address}`);
            const {project, vault, marketMakingPool, liquidityMaker, UserSettings} = data;
            return {
                props: {
                    projectDetail: project, marketMakingPool, vault, liquidityMaker
                }
            }
        } catch (e) {
            console.log('getProject error:', e);
            return {
                props: {
                    projectDetail: null, marketMakingPool: null, vault: null, liquidityMaker: null
                }
            }
        }
    } else {
        return {
            props: {
                projectDetail: null, marketMakingPool: null, vault: null,
            },
        };
    }
}


//@TODO Handle error for market maker settings if no wallet is available
const getArticles = async (slug) => {
    try {
        const data = await axios.get(`${API_URL}Article/?project=${slug}`);
        return data
    } catch (e) {
        console.log('getArticles error:', e);
    }
}

const getVestingBatches = async (slug) => {
    try {
        const data = await axios.get(`${API_URL}VestingBatch/?project=${slug}`);
        return data
    } catch (e) {
        console.log('getVestingBatches error:', e);
    }
}

const getVesting = async (id) => {
    try {
        const data = await axios.get(`${API_URL}Vesting/?vesting_batch=${id}`);
        return data
    } catch (e) {
        console.log('getVesting error:', e);
    }
}

const updateProjectInformation = async (formData, projectId, wallet) => {
    const signature = await helpers.web3.authentication.getSignature(wallet);
    formData.append("signature", signature);
    try {
        const response = await axios({
            method: "patch",
            url: `${API_URL}Project/${projectId}/`,
            data: formData,
            headers: {"Content-Type": "multipart/form-data"},
        });
        if (response.status === 200) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Your project has been updated",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    } catch (e) {
        console.log('updateProjectInformation', e);
    }
};

export default {
    updateProjectInformation,
    getProjects,
    getProject,
    getArticles,
    getProjectServerSide,
    getVestingBatches,
    getVesting
}