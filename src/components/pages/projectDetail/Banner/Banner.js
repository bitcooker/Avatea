import * as React from "react";

import Image from "next/image";
import BannerContent from "./BannerContent";

export default function Preview(props) {
  return (
    <div
      className="relative w-full h-85 md:h-100 rounded-2.5xl"
      style={{
        backgroundImage: `url("/projects/cloud-project.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BannerContent />
    </div>
  );
}
