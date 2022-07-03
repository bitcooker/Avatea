import React, {useEffect, useState} from "react";
import helper from "../../../helpers";
import Spinner from "../../core/Spinner";
import CardItem from "../projects/Card/CardItem";
import helpers from "../../../helpers";

export default function MyVestedPools({wallet}) {
    const [vestedPools, setVestedPools] = useState([]);
    const [loaded,setLoaded] = useState(false);

    useEffect(() => {
        if  (wallet.status === "connected") {
            const initWallet = async () => {
                const result = await helpers.marketMaking.getMarketMakingPools({
                    vested: wallet.account
                })
                setVestedPools(result)
                setLoaded(true);
            };
            initWallet();
        }
    }, [wallet]);

    console.log('Vested Pools', vestedPools)
    return (
        <div>
            {vestedPools?.length === 0 && loaded === false ? (
                <div className="flex items-center justify-center w-full h-[85vh]">
                    <Spinner size={5} />
                </div>
            ) : (vestedPools.length === 0 && loaded === true ? <div className="grid sm-md:grid-cols-2 xl-2xl:grid-cols-3 gap-5">
                        <h2 className={'text-2xl col-span-full'}>Vested Projects</h2>
                    <p>No active vested projects</p>
                    </div> :
                <div className="grid sm-md:grid-cols-2 xl-2xl:grid-cols-3 gap-5">
                    <h2 className={'text-2xl col-span-full'}>Vested Projects</h2>

                    {vestedPools?.map((project) => {
                        return <CardItem disableDetails={true} name={project.project_name} image={project.project_image} banner={project.project_banner} key={project.slug} {...project} />;
                    })}
                </div>
            )

            }
        </div>
    );
}