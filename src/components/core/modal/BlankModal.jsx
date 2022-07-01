import * as React from "react";

export default function BlankModal(props) {
    return <div
                className={
                    props.open
                        ? "fixed z-50 w-[100vw] h-[100vh] top-0 left-0 bg-black/20 backdrop-blur-[1px] px-5 md-lg:px-60 overflow-y-auto md-lg:overflow-y-hidden transition"
                        : "fixed -z-50 w-[100vw] md-lg:h-[100vh] top-0 left-0 bg-black/20 backdrop-blur-[1px] px-40 opacity-0"
                    }
            >
                <div
                    className="w-full bg-white mt-[40vh] rounded-3xl p-8"
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
        </div>;
}