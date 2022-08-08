import * as React from "react";
import Image from "next/image";

import InputSubmit from "./InputSubmit";

export default function Input(props) {
  // const [value, setValue] = React.useState(props.value);

  const onChange = React.useCallback(
    (e) => {
      props.setValue(e.target.value);
    },
    [props]
  );

  return (
    <div className="flex shadow-sm items-center h-12.5 w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5">
        {props.hideIcon ? "" :
            <div className="w-6 h-6 mr-3.75">
                <Image src={props.image ? props.image : "/avatea-token.png"} alt="avateaTokenImage" layout="fixed" width={24} height={24} />
            </div>
        }
        <input
            id={props.id}
            name={props.name}
            type={props.type}
            value={props.value === undefined || props.value === null ? "" : props.value}
            onChange={onChange}
            className="block w-full bg-gray-100"
            placeholder={props.placeholder}
        />
        {
            props.hideButton ? "" : <InputSubmit
                name={props.submitName}
                icon={props.icon}
                submitFunction={props.submitFunction}
            />
        }
    </div>
  );
}
