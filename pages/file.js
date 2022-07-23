import {useState} from "react";
import {API_URL} from "../src/helpers/constants";
import helpers from "../src/helpers";
import {useWallet} from "@albs1/use-wallet";
import axios from 'axios';

export default function File() {

    const wallet = useWallet();
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const signature = await helpers.web3.authentication.getSignature(wallet);

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("project", "mercor-finance");
        formData.append("title", 'my-title');
        formData.append("description", 'my-description');
        formData.append("signature", signature);
        try {
            const response = await axios({
                method: "post",
                url: `${API_URL}Article/`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch(error) {
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileSelect}/>
            <input type="submit" value="Upload File" />
        </form>
    )
}
