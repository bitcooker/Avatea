import axios from 'axios';
import {API_URL} from "../../../../src/helpers/constants";

export default async function handler(req, res) {
    if (req.method === "POST" && req.headers.host === "localhost:3000" || req.headers.host === "staging.avatea.io" || req.headers.host === "app.avatea.io") {
        try {
            await axios.post(`${API_URL}Transaction/bulk_create/`, req.body, {
                headers: {
                    'Authorization': `Token e2db9a80510adeefc33485fbab404519de2c32a4`
                }
            })
            res.status(200).json({ status: 200 })
        } catch (e) {
            res.status(500).json({ error: 'Error, check logs' })
        }
    } else {
        res.status(200).json({status: 'OK'})
    }

}