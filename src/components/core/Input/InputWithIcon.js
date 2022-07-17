import * as React from "react";
import Image from "next/image";

export default function Input(props) {
  return (
    <div className="flex items-center shadow-sm h-12.5 w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5 gap-2">
      <div className="w-6 h-6">
        <Image src={props.image ? props.image : "/avatea-token.png"} alt="tokenImage" className="mr-3.75" layout="fixed" width={24} height={24}/>
      </div>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
        className="w-full bg-gray-100"
        placeholder={props.placeholder}
      />
    </div>
  );
}
