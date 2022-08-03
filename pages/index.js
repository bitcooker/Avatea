import * as React from "react";
import Image from "next/image";

// core components
import ButtonFit from "../src/components/core/Button/ButtonFit";

// page components
import HomeWrapper from "../src/components/pages/Home/HomeWrapper";
import HomeCard from "../src/components/pages/Home/HomeCard";

// SVG
import {Installation, ArchitectureGuide, Plugins, APIReference} from "../src/components/SVG";

import { usePageTitleContext } from "../src/context/PageTitleContext";

export default function Home() {
  const { setTitle } = usePageTitleContext();

  React.useEffect(() => {
    setTitle("Home")
  }, [setTitle])

  return (
    <HomeWrapper>
        {/* header */}
        <div className="grid grid-cols-1 md-lg:grid-cols-2 rounded-xl p-5">
            <div className="flex flex-col items-center justify-center gap-10 mr-25">
                <h1 className="text-4xl md-lg:text-5xl leading-[64px]">Buy, trade, and hold 600+ cryptocurrencies on Binance</h1>
                
                <ButtonFit name="Get Started" classNames="!h-12.5"/>
            </div>

            <div className="p-5">
                <Image src="/landing.png" alt="" width="500" height="500" />
            </div>
        </div>  

        {/* features */}
        <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-5">
            <HomeCard icon={Installation} title="Installation" content="Step-by-step guides to setting up your system and installing the library."/>
            <HomeCard icon={ArchitectureGuide} title="Architecture guide" content="Learn how the internals work and contribute." />
            <HomeCard icon={Plugins} title="Plugins" content="Extend the library with third-party plugins or write your own." />
            <HomeCard icon={APIReference} title="API reference" content="Learn to easily customize and modify your app's visual design to fit your brand." />
        </div>
    </HomeWrapper>
  );
}