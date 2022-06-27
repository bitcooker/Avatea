import * as React from "react";

export default function News(props) {
  return (
    <div className="flex flex-col h-[85vh] space-y-7.5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">News Edit</h1>
      </div>
      <div className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200"></div>
    </div>
  );
}
