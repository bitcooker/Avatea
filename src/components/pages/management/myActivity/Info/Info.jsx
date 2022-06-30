import React from "react";
import InfoItem from "./InfoItem";
import { InfoModul } from "./InfoModul";

export default function Info() {
  return (
    <div className="info__row">
      {InfoModul.map((InfoItems) => {
        return <InfoItem key={InfoItems.id} {...InfoItems} />;
      })}
    </div>
  );
}
