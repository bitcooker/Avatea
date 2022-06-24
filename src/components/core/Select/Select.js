import * as React from "react";

import SelectIcon from "./SelectIcon";

export default function Select(props) {
  const [open, setOpen] = React.useState(false);
  const [currentOption, setCurrentOption] = React.useState(
    props.options[0].name
  );

  return (
    <div
      className="relative flex items-center shadow-sm h-12.5 block w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5 justify-between hover:cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <span>{currentOption}</span>
      <SelectIcon />
      <div
        className={
          open
            ? "absolute z-10 top-14 left-0 flex flex-col w-full bg-white p-4 rounded-2xl shadow-xl"
            : "hidden absolute z-10 top-14 left-0 flex flex-col w-full bg-white p-4 rounded-2xl shadow-xl"
        }
      >
        {props.options?.map((option, index) => (
          <div
            className="flex items-center w-full text-base px-4 py-2 rounded-md hover:bg-gray-100"
            key={index}
            onClick={() => {
              props.setValue(index);
              setCurrentOption(props.options[index].name);
            }}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}
