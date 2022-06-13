import * as React from "react";
import InputSubmit from "./InputSubmit";

export default function Input(props) {
  // const [value, setValue] = React.useState(props.value);

  const onChange = React.useCallback((e) => {
    props.setValue(e.target.value);
  }, []);

  return (
    <div className="flex shadow-sm items-center h-12.5 block w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5">
      <img src="/coins/maticIcon.png" className="w-6 h-6 mr-3.75" />
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={onChange}
        className="block w-full bg-gray-100"
        placeholder={props.placeholder}
      />
      <InputSubmit
        name={props.submitName}
        icon={props.icon}
        submitFunction={props.submitFunction}
      />
    </div>
  );
}
