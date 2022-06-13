import {useState} from "react";

export default function File() {

    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        try {
            const response = await axios({
                method: "post",
                url: "/api/upload/file",
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
