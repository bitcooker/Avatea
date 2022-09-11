import * as React from "react";
import Image from "next/image";

// core components
import ButtonFit from "../src/components/core/Button/ButtonFit";

// page components
import HomeWrapper from "../src/components/pages/Home/HomeWrapper";
import HomeCard from "../src/components/pages/Home/HomeCard";
import HomeCheckMark from "../src/components/pages/Home/HomeCheckMark";

// SVG
import {APIReference, ArchitectureGuide, Installation, Plugins} from "../src/components/SVG";

import {usePageTitleContext} from "../src/context/PageTitleContext";
import {useRouter} from "next/router";
import Head from "next/head";
import {TITLE_PREFIX} from "../src/helpers/constants";

export default function Home() {

    const router = useRouter();
    const {setTitle} = usePageTitleContext();

    React.useEffect(() => {
        setTitle("Home")
    }, [setTitle])

    return (
        <HomeWrapper>
            <Head>
                <title>{ TITLE_PREFIX }</title>
                <meta property="og:title" content={`${TITLE_PREFIX}`} key="title" />
            </Head>
            {/* header */}
            <div className="grid grid-cols-1 md-lg:grid-cols-2 rounded-xl p-5 bg-white gap-5">
                <div className="flex flex-col items-center justify-between gap-5 md-lg:p-10">
                    <div>
                        <h1 className="text-4xl md-lg:text-5xl leading-[64px]">Sustainably trade, stake, and hold cryptocurrencies on Avatea</h1>
                        <p>
                            Avatea is committed to fostering the growth of Web3 applications by providing the infrastructure needed for Web3.
                        </p>
                    </div>

                    <div className="md-lg:self-start">
                        <ButtonFit name="Get Started" classNames="!h-12.5"/>
                    </div>
                </div>

                <div className="relative md-lg:p-5">
                    <div className="absolute hidden md-lg:block top-0 left-0 z-10 h-full w-50"
                         style={{background: "linear-gradient(90deg,#fff,hsla(0,0%,100%,.98) 18.23%,hsla(0,0%,100%,.911052) 37.83%,hsla(0,0%,100%,.776042) 67.38%,hsla(0,0%,100%,0))"}}>
                    </div>
                    <div className="overflow-hidden">
                        <div className="w-[10000px]">
                            <div className="animate-marquee my-5 grow float-left">
                                <Image src="/dapps.png" alt="" width="779" height="384" objectFit="cover"/>
                            </div>
                            <div className="animate-marquee my-5 grow float-left">
                                <Image src="/dapps.png" alt="" width="779" height="384" objectFit="cover"/>
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex items-center justify-center inset-0">
                        <div className="p-10 rounded-full overflow-hidden backdrop-blur-md">
                            <ButtonFit name="Explore all projects" handleClick={() => router.push(`/projects`)}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Developers */}
            <div className="bg-indigo-500 text-white shadow-lg rounded-xl grid grid-cols-1 md-lg:grid-cols-2 md-lg:p-10 ">
                {/* left */}
                <div className="max-w-lg flex flex-col h-full items-center md-lg:items-start justify-between p-5 gap-5">
                    <div>
                        <h2 className="mb-6 lg:mb-4 md:mb-4 sm:mb-4">
                            Built by developers, for developers
                        </h2>
                        <p className="body-md mb-5 md:mb-4 sm:mb-6 opacity-80">
                            Avatea combines the best of Ethereum and sovereign blockchains into a full-fledged multi-chain system.
                        </p>

                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center opacity-80 gap-3">
                                <div className="w-6 h-6">
                                    <HomeCheckMark/>
                                </div>
                                <span>It is able to fully benefit from Ethereum’s network effects</span>
                            </li>
                            <li className="flex items-center opacity-80 gap-3">
                                <div className="w-6 h-6">
                                    <HomeCheckMark/>
                                </div>
                                <span>It is inherently more secure</span>
                            </li>
                            <li className="flex items-center opacity-80 gap-3">
                                <div className="w-6 h-6">
                                    <HomeCheckMark/>
                                </div>
                                <span>It is more open and powerful</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center w-fit h-12.5 justify-center py-4 px-7.5 bg-white text-black rounded-full hover:cursor-pointer">
                        Get Started
                    </div>
                </div>

                {/* right */}
                <div className="flex justify-center md-lg:justify-end">
                    <Image src="/developer.png" alt="developer" width={550} height={350} objectFit="contain"/>
                </div>
            </div>

            {/* features */}
            <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-5">
                <HomeCard icon={Installation} title="Installation" content="Step-by-step guides to setting up your system and installing the library."/>
                <HomeCard icon={ArchitectureGuide} title="Architecture guide" content="Learn how the internals work and contribute."/>
                <HomeCard icon={Plugins} title="Plugins" content="Extend the library with third-party plugins or write your own."/>
                <HomeCard icon={APIReference} title="API reference" content="Learn to easily customize and modify your app's visual design to fit your brand."/>
            </div>
        </HomeWrapper>
    );
}