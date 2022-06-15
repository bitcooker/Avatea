import * as React from "react";

export default function Radio(props) {
  const radioRef = React.useRef(null);
  const [isSelected, setIsSelected] = React.useState(props.isSelected || false);

  const handleClick = React.useCallback(
    (e) => {
      radioRef.current.checked = true;
      props.handleSetMode(radioRef.current.value);
    },
    [props]
  );

  return (
    <div
      className="flex items-center shadow-sm h-12.5 block w-full bg-gray-100 rounded-0.5xl p-3.75 space-x-3 hover:cursor-pointer hover:ring-1 hover:ring-purple-500 transition"
      onClick={handleClick}
    >
      <input
        className="w-5 h-5 bg-purple-500"
        name={props.name}
        value={props.value}
        type="radio"
        ref={radioRef}
        defaultChecked={props.checked}
      />
      <span className="text-sm">{props.label}</span>
    </div>
  );
}
