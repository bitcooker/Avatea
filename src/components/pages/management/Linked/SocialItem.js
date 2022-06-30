import * as React from "react";

import { socialFacebook, socialTwitter } from "../../../SVG";

export default function SocialItem(props) {
  return (
    <div
      className={
        "relative flex items-center justify-center -mr-1 w-[67px] h-[67px] rounded-full " +
        props.bgColor
      }
    >
      {props.icon}

      <div onClick={() => props.deleteValue(props.name)} className="absolute flex items-center justify-center top-0 right-0 w-[22px] h-[22px] rounded-full bg-rose-500 ring ring-white ring-offset-0 hover:cursor-pointer hover:ring-rose-500/50 transition">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1L1 9M9 9L1 1L9 9Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
