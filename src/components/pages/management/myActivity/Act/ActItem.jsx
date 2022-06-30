import React from "react";
import Image from "next/image";

export default function ActItem(props) {
  return (
    <div className="actItem">
      <div className="actItem__image">
        <Image src={`/${props.image}`} alt={props.id} width={80} height={80} />
      </div>
      <div className="actItem__content">
        <div className="actItem__content-info">
          {props.title}
          <small>{props.date}</small>
        </div>
        <div className="actItem__content-number">{props.number} </div>
      </div>
    </div>
  );
}
