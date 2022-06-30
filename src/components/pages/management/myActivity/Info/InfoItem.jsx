import React from "react";
import { dots } from "../../../../SVG";
import Progress from "./Progress";

export default function InfoItem(props) {
  return (
    <div className="infoItem">
      <div className="infoItem__more">{dots}</div>
      <div className="infoItem__info">
        <div className="infoItem__info-type">
          <div className={`infoItem__info-type-icon ${props.id}`}>
            {props.icon}
          </div>
          <div className="infoItem__info-type-title">{props.title}</div>
        </div>
        <div className="infoItem__info-number">
          <div className="infoItem__info-number-price">{props.number}</div>
          <div className="infoItem__info-number-time">
            {props.time} This Week
          </div>
        </div>
      </div>
      <div className="progress">
        <Progress strokeWidth="9" sqSize="100" percentage={props.percent} />
      </div>
    </div>
  );
}
