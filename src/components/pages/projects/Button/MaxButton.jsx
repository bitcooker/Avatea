import * as React from "react";

export default function MaxButton(props) {
  return (
    <div className="flex items-center gap-1">
        <span className="text-sm">Balance: {props.balance}</span>
        <button
            className="text-pink-500 bg-fuchsia-200 rounded-full px-2 my-1"
            onClick={props.handleClick}
        >
            <span className="text-xs">MAX</span>
        </button>
    </div>
  );
}
