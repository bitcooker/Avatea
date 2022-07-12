import * as React from "react";

import TabItem from "./TabItem";

export default function Tab(props) {
  return (
    <span 
        className="flex flex-row items-center rounded-[24px] bg-white inline-flex p-2 space-x-2 overflow-scroll scrollbar-none"
    >
      {props.items.map((item, index) => (
        <TabItem
          label={item}
          key={index}
          value={index}
          handleSetTab={props.setTab}
          selected={props.tab == index}
        />
      ))}
    </span>
  );
}
