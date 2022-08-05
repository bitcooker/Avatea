import * as React from "react";

export default function MaxButton(props) {
  return (
    <div className="flex items-center gap-1">
        <span className="text-sm text-gray-400">Balance: <span className={'text-balance'}>{props.balance}</span></span>
        <button
            className="text-rose-500 bg-fuchsia-100 rounded-full px-2 my-1"
            onClick={props.handleClick}
        >
            <span className="text-xs">MAX</span>
        </button>
    </div>
  );
}
