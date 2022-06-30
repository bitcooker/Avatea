import React from "react";
import ActItem from "./ActItem";
import { ActModul } from "./ActModul";

export default function Act() {

  return (
    <div className="act">
      <div className="act__inner">
        <h2>Activity</h2>
        {ActModul.map((ActItems) => {
          return <ActItem key={ActItems.id} {...ActItems} />;
        })}
      </div>
    </div>
  );
}
