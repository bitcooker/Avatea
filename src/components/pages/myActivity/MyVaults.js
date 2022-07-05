import React, {useEffect, useState} from "react";
import Carousel from "react-multi-carousel";

import helpers from "../../../helpers";

// core components
import Spinner from "../../core/Spinner";

// activity components
import MyActivityCardItem from "./MyActivityCardItem";

import { responsive } from "./CarouselSetting";

export default function MyVaults({wallet}) {
    const [vaults, setVaults] = useState([]);
    const [loaded,setLoaded] = useState(false);

    useEffect(() => {
        if  (wallet.status === "connected") {
            const initWallet = async () => {
                const result = await helpers.vaultRest.getVaults({
                    invested: wallet.account
                })
                console.log('Vaults', result)
                setVaults(result)
                setLoaded(true);
            };
            initWallet();
        }
    }, [wallet]);

    return (
        <div>
            {vaults?.length === 0 && loaded === false ? (
                <div className="flex items-center justify-center w-full h-[85vh]">
                    <Spinner size={5} />
                </div>
            ) : (vaults?.length === 0 && loaded === true ? 
                <div className="grid sm-md:grid-cols-2 xl-2xl:grid-cols-3 gap-5">
                    <h2 className={'text-2xl col-span-full'}>Vault Projects</h2>
                    <p>No active vault projects</p>
                </div> 
                :
                <div className="flex flex-col">
                    <h2 className={'text-2xl col-span-full'}>Vault Projects</h2>
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
                            dotListClass="custom-dot-list-style"
                            itemClass="px-1 py-3 carousel-item-padding-40-px"
                        >
                        {vaults?.map((project) => {
                            return <MyActivityCardItem key={project.project} {...project}></MyActivityCardItem>;
                        })}
                    </Carousel>
                </div>
            )

            }
        </div>
    );
}