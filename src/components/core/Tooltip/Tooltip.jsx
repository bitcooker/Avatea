import * as React from "react";

export default function Tooltip(props) {
    return <div 
                className={`z-[50] absolute flex flex-col items-center w-50 ${props.className ? props.className : 'top-8 py-1'}  px-3 mb-6 text-sm text-white bg-gray-900 rounded-md shadow-sm transition opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 pointer-events-none`}>
                <div className="text-xs whitespace-no-wrap">{props.title}</div>
                <div className="absolute w-3 h-3 -mt-2 rotate-45 bg-black"></div>
            </div>
}