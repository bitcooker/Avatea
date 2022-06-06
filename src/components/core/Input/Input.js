import * as React from "react";
import InputSubmit from "./InputSubmit";

export default function Input(props) {
  const [value, setValue] = React.useState(props.value);

  const onChange = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <div className="flex shadow-sm h-12.5 block w-full bg-gray-100 rounded-0.5xl px-5 py-2.5">
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={value}
        onChange={onChange}
        className="block w-full bg-gray-100"
        placeholder={props.placeholder}
      />
      <InputSubmit name={props.submitName} />
    </div>
  );
}
