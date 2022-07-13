import * as React from "react";
import Carousel from "react-multi-carousel";

import helpers from "../../../helpers";

// core components
import Spinner from "../../core/Spinner";

// activity components
import MyActivityCardItem from "./MyActivityCardItem";

const projects = [
    {
        address: "0xE869262027ffCDbD115290605cd21261eA501fE9",
        banner: "https://avatea-bucket.s3.amazonaws.com/media/images/k0n4r6b9y77cys8ndq2s0fkuggy3.jpeg",
        name: "Thunderstrike",
        project: "thunderstrike",
        image: "https://avatea-bucket.s3.amazonaws.com/media/images/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png",
        type: "vested"
    },
    {
        address: "0x6EE5a4063c29629390085d20C97272b5Eba48fE4",
        banner: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-banner-matic-coin-cryptocurrency-concept-banner-background_32996-1268.webp",
        name: "Cloud Project",
        project: "cloud-project",
        image: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-logo.png",
        type: "invested"
    },
    {
        address: "0xE869262027ffCDbD115290605cd21261eA501fE9",
        banner: "https://avatea-bucket.s3.amazonaws.com/media/images/k0n4r6b9y77cys8ndq2s0fkuggy3.jpeg",
        name: "Thunderstrike",
        project: "thunderstrike",
        image: "https://avatea-bucket.s3.amazonaws.com/media/images/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png",
        type: ""
    },
    {
        address: "0x6EE5a4063c29629390085d20C97272b5Eba48fE4",
        banner: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-banner-matic-coin-cryptocurrency-concept-banner-background_32996-1268.webp",
        name: "Cloud Project",
        project: "cloud-project",
        image: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-logo.png",
        type: "vault"
    },
]

export default function Projects(props) {
    return <div className="my-10">
                {projects?.length === 0 && loaded === false ? (
                    <div className="flex items-center justify-center w-full h-[85vh]">
                        <Spinner size={5} />
                    </div>
                ) : (projects.length === 0 && loaded === true ? "No vested project" :
                        <div className="flex flex-col space-y-5">
                            <h2 className={'text-2xl col-span-full'}>Active Market Making Pools</h2>
                            <div className="w-full flex snap-x snap-mandatory overflow-x-auto scrollbar-none sm-md:grid sm-md:grid-cols-2 xl-2xl:grid-cols-3 gap-5">
                                {projects.map((project, index) =>
                                    <div className="w-full snap-center shrink-0" key={index}>
                                        <MyActivityCardItem {...project}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
}