import * as React from "react";

import InputSubmit from "./InputSubmit";

const timeOptions = [
    {
        label: "SEC",
        unit: 1
    },
    {
        label: "MIN",
        unit: 60
    },
    {
        label: "HOUR",
        unit: 3600
    },
    {
        label: "DAY",
        unit: 24 * 3600
    },
    {
        label: "WEEK",
        unit: 7 * 24 * 3600
    },
]

const reg = /^\d+$/;

export default function InputTime(props) {
    const [open, setOpen] = React.useState(false);
    const [currentOption, setCurrentOption] = React.useState(timeOptions[0]);

    return (
        <div className={`flex gap-2 items-center justify-center shadow-sm h-12.5 w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5 ${props.classNames}`}>
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                value={props.value === undefined || props.value === null ? "" : props.value / currentOption.unit}
                onChange={e => reg.test(e.target.value) && props.setValue(e.target.value * currentOption.unit)}
                className={`block w-full bg-gray-100`}
                placeholder={props.placeholder}
                readOnly={props.readOnly}
            />
            <div className="relative group flex items-center justify-center w-fit px-3 h-10 rounded-lg text-gray-500 bg-gray-200 gap-2 hover:cursor-pointer hover:bg-gray-200/80" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                {currentOption.label} <i className="fa-solid fa-chevron-down"></i>

                {/* time option dropdown */}
                <div className="absolute w-full top-full z-10">
                    <div className = {`${open ? 'flex' : 'hidden'} flex-col p-2 mt-1 rounded-lg shadow-lg bg-white hover:cursor-auto`}>
                        {timeOptions.map((option, index) => {
                            return <TimeOptionItem option={option} key={index} handleSetCurrentOption={setCurrentOption} handleClose={() => setOpen(false)}/>
                        })}
                    </div>
                </div>
            </div>
            {
                props.hideButton ? "" : <InputSubmit
                    name={props.submitName}
                    icon={props.icon}
                    submitFunction={props.submitFunction}
                />
            }
        </div>
    )
}

const TimeOptionItem = (props) => {
    return (
        <div className="flex items-center justify-center p-1 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={() => {props.handleSetCurrentOption(props.option); props.handleClose();}}>
            {props.option.label}
        </div>
    )
}