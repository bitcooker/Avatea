import * as React from "react";

import Image from "next/image";
import BannerContent from "./BannerContent";

export default function Preview(props) {
    console.log(props)
  return (
    <div
      className="relative w-full h-85 md-lg:h-100 rounded-2.5xl"
      style={{
        backgroundImage: `url("${props.banner}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BannerContent {...props}/>
    </div>
  );
}
