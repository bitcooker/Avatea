import * as React from "react";

import Button from "../../core/Button/Button";

export default function Step(props) {
  return (
    <div className="flex flex-col grow">
      {/* content */}
      <div className="grow">{props.children}</div>
      {/* Action */}
      <div className="flex">
        <div className="flex flex-row w-full justify-between">
          <span className="text-xl">{props.title}</span>
          <span className="text-xl">
            <span className=" font-semibold">{props.step}/</span>
            <span className="text-sm">4</span>
          </span>
        </div>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full my-5">
        <div
          className="h-2.5 bg-indigo-500 rounded-full"
          style={{ width: `${props.step * 25}%` }}
        ></div>
      </div>
      <Button name="Next" />
    </div>
  );
}
