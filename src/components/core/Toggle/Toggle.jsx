import * as React from "react";

export default function Toggle(props) {
    return  <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" value="" id={props.id} className="sr-only peer" onChange={props.handleClick} checked={props.checked} disabled={props.disabled}/>
                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none hover:ring-2 hover:ring-indigo-500/50 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500 transition`}></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{props.label}</span>
            </label>
}