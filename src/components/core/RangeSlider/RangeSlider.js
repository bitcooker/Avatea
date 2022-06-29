import * as React from "react";

export default function RangeSlider(props) {
  const [bgSize, setBgSize] = React.useState(props.percent + "% 100%");

  React.useEffect(() => {
    setBgSize(props.percent + "% 100%");
  }, [props.percent]);

  const handleOnInput = React.useCallback((e) => {
    props.setPercent(e.target.value);
  }, [props]);

  return (
    <div className="relative group w-full bg-gray-200 h-2.5 rounded-full">
      <input
        type="range"
        value={props.percent}
        className="absolute w-full h-2.5 appearance-none rounded-full hover:cursor-pointer"
        onInput={handleOnInput}
        style={{ backgroundSize: bgSize }}
      />
      <div
        className="absolute w-8 transform -translate-x-1/2 border bottom-5 transition-all ease-in-out duration-200 bg-indigo-500 text-center rounded-md p-1 text-white z-50 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 pointer-events-none"
        style={{ left: props.percent + "%" }}
      >
        <span>{props.percent}</span>
        <div className="absolute left-[5px] border-[10px] border-x-transparent border-b-transparent border-t-indigo-500" />
      </div>
    </div>
  );
}
