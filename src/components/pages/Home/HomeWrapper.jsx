import * as React from "react";

export default function HomeWrapper(props) {
    return (
        <div className="flex flex-col gap-5">
            {props.children}
        </div>
    )
}