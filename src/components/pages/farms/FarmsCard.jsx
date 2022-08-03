import * as React from "react";

export default function FarmsCard(props) {
    return (
        <div className="grid md-lg:grid-cols-2 lg-xl:grid-cols-3 items-baseline gap-5">
            {props.children}
        </div>
    )   
}