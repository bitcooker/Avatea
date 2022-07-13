import React, {useEffect, useState} from "react";
import Carousel from "react-multi-carousel";

import helpers from "../../../helpers";

// core components
import Spinner from "../../core/Spinner";

// activity components
import MyActivityCardItem from "./MyActivityCardItem";

import { responsive } from "./CarouselSetting";

const projects = [
    {
        address: "0xE869262027ffCDbD115290605cd21261eA501fE9",
        banner: "https://avatea-bucket.s3.amazonaws.com/media/images/k0n4r6b9y77cys8ndq2s0fkuggy3.jpeg",
        name: "Thunderstrike",
        project: "thunderstrike",
        image: "https://avatea-bucket.s3.amazonaws.com/media/images/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png",
    },
    {
        address: "0x6EE5a4063c29629390085d20C97272b5Eba48fE4",
        banner: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-banner-matic-coin-cryptocurrency-concept-banner-background_32996-1268.webp",
        name: "Cloud Project",
        project: "cloud-project",
        image: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-logo.png",
    },
    {
        address: "0xE869262027ffCDbD115290605cd21261eA501fE9",
        banner: "https://avatea-bucket.s3.amazonaws.com/media/images/k0n4r6b9y77cys8ndq2s0fkuggy3.jpeg",
        name: "Thunderstrike",
        project: "thunderstrike",
        image: "https://avatea-bucket.s3.amazonaws.com/media/images/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png",
    },
    {
        address: "0x6EE5a4063c29629390085d20C97272b5Eba48fE4",
        banner: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-banner-matic-coin-cryptocurrency-concept-banner-background_32996-1268.webp",
        name: "Cloud Project",
        project: "cloud-project",
        image: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-logo.png",
    },
]

export default function MyMarketMakingPools({wallet}) {
    const [marketMakingPools, setMarketMakingPools] = useState([]);
    const [loaded,setLoaded] = useState(false);

    useEffect(() => {
        if  (wallet.status === "connected") {
            const initWallet = async () => {
                const result = await helpers.marketMaking.getMarketMakingPools({
                    invested: wallet.account
                })
                setMarketMakingPools(result);
                setLoaded(true);
            };
            initWallet();
        }
    }, [wallet]);

    return (
        <div>
            {marketMakingPools?.length === 0 && loaded === false ? (
                <div className="flex items-center justify-center w-full h-[85vh]">
                    <Spinner size={5} />
                </div>
            ) : (marketMakingPools.length === 0 && loaded === true ? "No vested project" :
                <div className="flex flex-col">
                    <h2 className={'text-2xl col-span-full'}>Active Market Making Pools</h2>
                    <Carousel
                            showDots
                            responsive={responsive}
                            ssr // means to render carousel on server-side.
                            infinite
                            autoPlay={false}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["mobile"]}
                            deviceType="desktop"
                            dotListClass=""
                            itemClass="px-1 py-3 carousel-item-padding-40-px"
                        >
                        {projects?.map((project) => {
                            return <MyActivityCardItem key={project.project} {...project}></MyActivityCardItem>;
                        })}
                    </Carousel>
                </div>
            )
            }
        </div>
    );
}