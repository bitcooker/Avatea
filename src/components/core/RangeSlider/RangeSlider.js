import * as React from "react";

export default function RangeSlider(props) {
  const contentRef = React.useRef(null);
  const [percent, setPercent] = React.useState(props.percent);
  const [widthStyle, setWidthStyle] = React.useState("0px");

  React.useEffect(() => {
    const handleResize = () => {
      if (contentRef.current.offsetWidth)
        setWidthStyle((contentRef.current.offsetWidth * percent) / 100 + "px");
      else {
        setWidthStyle("0px");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [percent]);

  const handleOnInput = React.useCallback((e) => {
    setPercent(e.target.value);
  }, []);

  return (
    <div
      className="relative w-full bg-gray-200 h-2.5 rounded-full"
      ref={contentRef}
    >
      <input
        type="range"
        value={percent}
        className="absolute w-full h-2.5 bg-transparent appearance-none rounded-full hover:cursor-pointer"
        onInput={handleOnInput}
      />
      <div
        className="absolute h-2.5 bg-indigo-500 rounded-full hover:cursor-pointer"
        style={{ width: widthStyle }}
      />
      {/* <div className="absolute w-6 h-6 bg-indigo-500"></div> */}
    </div>
  );
}
