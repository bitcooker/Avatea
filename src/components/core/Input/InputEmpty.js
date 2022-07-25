import * as React from "react";

export default function InputEmpty(props) {
  return (
    <div className={`flex gap-2 items-center justify-center shadow-sm h-12.5 w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5 ${props.classNames}`}>
      {props.icon && (
        <div className="flex items-center w-6 h-6">
            <i className={`${props.icon} text-xl`} />
        </div>
      )}
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value === undefined || props.value === null ? "" : props.value}
        onChange={e => props.setValue(e.target.value)}
        className={`block w-full bg-gray-100`}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
      />
    </div>
  );
}
