import * as React from "react";

export default function TextArea(props) {
  return (
    <div className={`flex shadow-sm h-48 block w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5 ${props.classNames}`}>
      <textarea
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
        className="block w-full bg-gray-100 max-h-44"
        placeholder={props.placeholder}
      />
    </div>
  );
}
