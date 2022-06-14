import * as React from "react";

import { uploadIcon } from "../../SVG";

export default function ImageDropdown(props) {
  return (
    <div className="flex flex-col space-y-3.75">
      <h1 className="text-xl">{props.label}</h1>
      <div className="flex flex-col h-auto p-7.5 items-center border-2 border-dashed border-indigo-500/40 rounded-2.5xl space-y-12.5 hover:cursor-pointer hover:border-solid">
        {uploadIcon}
        <div className="text-base">
          Drop files here or <span className="text-indigo-500">Browse</span>
        </div>
      </div>
    </div>
  );
}
