import * as React from "react";

export default function InputEmpty(props) {
  return (
    <div className="flex shadow-sm h-12.5 block w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5">
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
        className="block w-full bg-gray-100"
        placeholder={props.placeholder}
        readOnly={props.readOnly}
      />
    </div>
  );
}
