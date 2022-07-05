import * as React from "react";
import Image from "next/image";

import { uploadIcon } from "../../SVG";

export default function FileInput(props) {
  const [fileName, setFileName] = React.useState("");

  const handleFileSelect = (event) => {
    props.setValue(event.target.files[0]);
    setFileName(event.target.files[0]);
  };

  return (
    <label htmlFor={props.id} className="flex flex-col h-full space-y-3.75">
      <h1 className="text-xl">{props.label}</h1>
      <div className="">
        {props.image 
            ? 
            <div className="hover:cursor-pointer hover:blur-[2px]">
                <input
                    id={props.id}
                    type="file"
                    accept={props.type}
                    className="hidden"
                    onChange={handleFileSelect}
                />
                <Image src={props.image} alt="image" className="overflow-hidden rounded-2.5xl" layout="responsive" width="100%" height="50"/>
            </div> 
            : 
            <div className="grow flex flex-col h-auto p-7.5 items-center justify-center border-2 border-dashed border-indigo-500/40 rounded-2.5xl space-y-12.5 hover:cursor-pointer hover:border-solid">
                {uploadIcon}
                <div className="Crop-Controls">
                <input
                    id={props.id}
                    type="file"
                    accept={props.type}
                    className="hidden"
                    onChange={handleFileSelect}
                />
                </div>

                <p className="w-full truncate">{fileName && fileName.name}</p>

                <div className="text-base">
                Drop files here or <span className="text-indigo-500">Browse</span>
                </div>
            </div>
        }
      </div>
    </label>
  );
}
