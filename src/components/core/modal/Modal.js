import * as React from "react";

export default function Modal(props) {
  return (
    <div
      className={
        props.open
          ? "fixed z-50 w-[100vw] h-full md-lg:h-[100vh] top-0 left-0 bg-black/20 backdrop-blur-[1px] px-2 overflow-y-auto transition" +
            (props.size == "sm" ? " pr-4 xl:px-100" : " md-lg:px-40")
          : "fixed -z-50 w-[100vw] md-lg:h-[100vh] top-0 left-0 bg-black/20 backdrop-blur-[1px] px-40 opacity-0"
      }
      onClick={props.handleClose}
    >
      <div
        className="w-full bg-white my-2 mx-auto md-lg:max-w-[900px] md-lg:my-20 rounded-3xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex flex-row justify-between items-center mb-5">
          <h1 className="text-2xl">{props.title}</h1>
          <div
            className="p-5 rounded-full hover:cursor-pointer hover:bg-gray-200 transition"
            onClick={props.handleClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L1 15M15 15L1 1L15 15Z"
                stroke="#00204C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="modal-body">{props.children}</div>
      </div>
    </div>
  );
}
