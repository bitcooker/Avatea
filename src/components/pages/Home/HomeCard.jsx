import * as React from "react";

export default function HomeCard(props) {
    const { handleClick } = props;
    return (
        <div 
            className="group relative flex rounded-xl border border-slate-200 bg-white hover:bg-gradient-to-t hover:from-cyan-400 hover:to-sky-500 transition"
            onClick = {() => handleClick()}    
        >
            <div className="grow relative rounded-0.5xl p-6 m-[2px] bg-white hover:bg-sky-50 hover:cursor-pointer transition">
                {/* icon */}
                {props.icon}

                {/* title */}
                <h2 className="mt-4 font-display text-base text-slate-900"><span className="absolute -inset-px rounded-xl"></span>{props.title}</h2>

                {/* content */}
                <p className="mt-1 text-sm text-slate-700">{props.content}</p>
            </div>
        </div>
    )
}