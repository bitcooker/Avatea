import * as React from "react";

export default function Spinner(props) {
  return (
    <div
      className={`relative w-${props.size} h-${props.size} rounded-full bg-indigo-500`}
    >
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
    </div>
  );
}
