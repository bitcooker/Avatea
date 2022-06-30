import * as React from "react";
import Image from "next/image";

import ButtonOutlineFit from "../../../../core/Button/ButtonOutlineFit";

export default function ListItem(props) {
  return (
    <div className="flex flex-row p-2.5 !pr-5 items-center justify-between bg-white rounded-2xl hover:cursor-pointer hover:shadow-lg transition">
      <div className="flex flex-row items-center space-x-2.5">
        <Image
          src={props.projectImage}
          alt="token"
          width={70}
          height={70}
          className="rounded-2xl"
        />
        <h1 className="text-base">{props.projectName}</h1>
      </div>
      <ButtonOutlineFit name="View Information" />
    </div>
  );
}
