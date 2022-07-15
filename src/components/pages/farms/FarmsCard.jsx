import * as React from "react";

export default function FarmsCard(props) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {props.children}
        </div>
    )
}