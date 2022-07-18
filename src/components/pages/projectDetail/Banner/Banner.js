import * as React from "react";

import Image from "next/image";
import BannerContent from "./BannerContent";

export default function Banner(props) {
  return (
    <div
      className="relative w-full h-85 md-lg:h-100 rounded-2.5xl"
      style={{
        backgroundImage: `url("${props.banner}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute flex items-center justify-center top-2 right-2 w-16 h-16 bg-white/20 rounded-0.5xl">
        <Image src="https://avatea-bucket.s3.amazonaws.com/media/images/Binance-coin-bnb-logo_s1xsqhX.png" alt="chainImage" width={48} height={48}/>
      </div>
      <BannerContent {...props}/>
    </div>
  );
}
