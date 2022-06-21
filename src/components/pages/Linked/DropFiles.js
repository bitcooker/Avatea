import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";


const fileTypes = ["JPEG", "PNG"];

export default function DropFiles(props) {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    props.setValue(file)
      };
  return (
    <div>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      {/*<p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>*/}
    </div>
  );
}