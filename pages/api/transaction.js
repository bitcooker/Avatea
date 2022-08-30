import axios from 'axios';
import {API_URL} from "../../src/helpers/constants";

export default async function handler(req, res) {
    console.log(process.env)
    if (req.method === "POST" && req.headers.host === "localhost:3000" || req.headers.host === "staging.avatea.io" || req.headers.host === "app.avatea.io") {
        try {
            await axios.post(`${API_URL}Transaction/`, req.body, {
                headers: {
                    'Authorization': `Token ${process.env.DJANGO_TOKEN}`
                }
            })
            res.status(200).json({ status: 200 })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    } else {
        res.status(200).json({status: 'OK'})
    }

}