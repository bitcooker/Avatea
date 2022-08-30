import axios from 'axios';
import {API_URL} from "./constants";

const registerUser = async (wallet, setter, setUnreadMessages, setIsAdmin) => {
    try {
        const {data} = await axios.post(`${API_URL}UserAddress/`, {
            address: wallet.account,
        });
        setUnreadMessages(data.num_unread_messages);
        setter(true);
        if (data?.Project_of_admin) {
            setIsAdmin(true);
        }
    } catch (e) {
        setter(true);
    }
}

const userActivity = async (wallet) => {
    try {
        const {
            data: {
                projects,
                user_data
            }
        } = await axios.get(`${API_URL}UserAddress/${wallet.account}/get_user_projects/`)
        const newArray = projects.map(project => {
            for (const [key, value] of Object.entries(user_data)) {
                if (key === project.slug) {
                    project.type = value;
                }
            }
            return project
        })
        return newArray
    } catch (e) {
        console.log('userActivity', e)
    }
}

export default {
    registerUser,
    userActivity
}