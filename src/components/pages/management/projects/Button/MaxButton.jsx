import * as React from "react";

export default function MaxButton(props) {
  return (
    <button
      className="text-pink-500 bg-fuchsia-200 rounded-full px-2 my-1"
      onClick={props.handleClick}
    >
      <span className="text-xs">MAX</span>
    </button>
  );
}
