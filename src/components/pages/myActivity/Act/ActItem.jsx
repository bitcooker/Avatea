import React from "react";

export default function ActItem(props) {
  const PUBLIC = process.env.PUBLIC_URL;

  return (
    <div className="actItem">
      <div className="actItem__image">
        <img src={PUBLIC + `${props.image}`} alt={props.id} />
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
