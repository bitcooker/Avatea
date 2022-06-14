import * as React from "react";

export default function InputEmpty(props) {
  const [value, setValue] = React.useState(props.value);

  const onChange = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <div className="flex shadow-sm h-12.5 block w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5">
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={value}
        onChange={onChange}
        className="block w-full bg-gray-100"
        placeholder={props.placeholder}
        readOnly={props.readOnly}
      />
    </div>
  );
}
