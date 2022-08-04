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
        <div className="grid grid-cols-1 md-lg:grid-cols-2 rounded-xl p-5 bg-white">
            <div className="flex flex-col items-center justify-between gap-5 md-lg:p-10">
                <div>
                    <h1 className="text-4xl md-lg:text-5xl leading-[64px]">Buy, trade, and hold 600+ cryptocurrencies on Binance</h1>
                    <p>
                        Polygon is committed to fostering the growth of Web3 applications by providing the infrastructure needed for Web3.
                    </p>
                </div>
                
                <div className="self-start">
                    <ButtonFit name="Get Started" classNames="!h-12.5"/>
                </div>
            </div>

            <div className="hidden md-lg:block relative p-5">
                <div className="absolute top-0 left-0 z-10 h-full w-50" style={{ background: "linear-gradient(90deg,#fff,hsla(0,0%,100%,.98) 18.23%,hsla(0,0%,100%,.911052) 37.83%,hsla(0,0%,100%,.776042) 67.38%,hsla(0,0%,100%,0))" }}>
                </div>
                <div className="overflow-hidden">
                    <div className="w-[10000px]">
                        <div className="animate-marquee my-5 grow float-left">
                            <Image src="/dapps.png" alt="" width="779" height="384" objectFit="cover" />
                        </div>
                        <div className="animate-marquee my-5 grow float-left">
                            <Image src="/dapps.png" alt="" width="779" height="384" objectFit="cover" />
                        </div>
                    </div>
                </div>
                <div className="absolute flex items-center justify-center inset-0">
                    <div className="p-10 rounded-full overflow-hidden backdrop-blur-md">
                        <ButtonFit name="Explore All dApps" />
                    </div>
                </div>
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