import * as React from "react";
import Image from "next/image";

import { uploadIcon } from "../../SVG";

export default function FileInput(props) {
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
    } else if(e.type === "dragleave") {
        setDragActive(false);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if(e.dataTransfer.files && e.dataTransfer.files[0]) {
        props.setValue(e.dataTransfer.files[0]);
    }
  }

  const handleFileSelect = (e) => {
    e.preventDefault();
    props.setValue(e.target.files[0]);
  };

  return (
    <label htmlFor={props.id} className="flex flex-col h-full space-y-3.75">
      <h1 className="text-xl">{props.label}</h1>
      
      <div className="relative p-3 bg-gray-100 rounded-xl">
        {dragActive && 
            <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-gray-100/30 rounded-xl z-10" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            </div>
        }
        <div className="relative hover:cursor-pointer h-48" onDragEnter={handleDrag}>
            <input
                id={props.id}
                type="file"
                accept={props.type}
                className="hidden"
                onChange={handleFileSelect}
            />
            {props.image ? 
                <Image src={props.image} alt="image" className="overflow-hidden rounded-2.5xl w-auto h-auto" layout="fill" objectFit='contain'/>
                :
                <div className="flex flex-col h-full items-center justify-between p-5   ">
                    {uploadIcon}

                    <div className="text-base">
                        Drop files here or <span className="text-indigo-500">Browse</span>
                    </div>
                </div>
            }
        </div>
      </div>
    </label>
  );
}
