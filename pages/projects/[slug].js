import {useWallet} from "use-wallet";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import helper from "../../src/helpers";

// core components
import Tab from "../../src/components/core/Tab/Tab";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Vault from "../../src/components/pages/projects/Vault";
import MarketMaking from "../../src/components/pages/projects/MarketMaking";
import Vesting from "../../src/components/pages/projects/Vesting";
import Liquidity from "../../src/components/pages/projects/LiquidityMaker";

const tabItems = ["Market Making","Liquidity","Vault","Vesting"];

export default function ProjectDetail(props) {
    //@Todo add min buy limit and max buy limit fields (stop-loss)
    const wallet = useWallet();
    const router = useRouter();
    const {slug} = router.query;
    const [project, setProject] = useState({});
    const [vault, setVault] = useState({});
    const [marketMakingPool, setMarketMakingPool] = useState({});
    const [liquidityMaker, setLiquidityMaker] = useState({})
    const [tab, setTab] = useState(0); // 0 - Vault(News), 1 - Market Making, 2 - Vesting
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        if (props.marketMakingPool) setMarketMakingPool(props.marketMakingPool);
        if (props.vault) setVault(props.vault);
        if (props.liquidityMaker) setLiquidityMaker(props.liquidityMaker);
        else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                console.log(result)
                setProject(result?.project);
                setMarketMakingPool(result?.marketMakingPool);
                setVault(result?.vault);
                setLiquidityMaker(result?.liquidityMaker)
                console.log('Fetch 1')

            };
            fetchProject();
        }
    }, [props, slug]);

    useEffect(() => {
        //@TODO Error handling if empty market making pool or vault
        if (Object.keys(project).length !== 0) {
            const fetchProject = async () => {
                const result = await helper.project.getProject(project.slug);
                setMarketMakingPool(result?.marketMakingPool);
                setVault(result?.vault);
                setLiquidityMaker(result?.liquidityMaker)
            };
            fetchProject();
        }
    }, [project]);

    useEffect(() => {
        setLoad(false);
    }, [tab])


    return (
        <div className="space-y-7.5">
            <Banner {...project} />
            {/* Tab menu */}
            <div className="flex justify-center">
                <Tab items={tabItems} tab={tab} setTab={setTab}/>
            </div>
            {tab == 0 &&
                <MarketMaking
                    wallet={wallet}
                    marketMakingPool={marketMakingPool}
                    project={project}
                />
            }
            {tab == 1 &&

                <Liquidity
                wallet={wallet}
                marketMakingPool={marketMakingPool}
                liquidityMaker={liquidityMaker}
                />
            }
            {tab == 2 &&
                <Vault
                vault={vault}
                wallet={wallet}
                project={project}
                setTab={setTab}
                />
            }

            {tab == 3 &&
                <Vesting
                    wallet={wallet}
                    marketMakingPool={marketMakingPool}
                    project={project}
                    setTab={setTab}
                />
            }

        </div>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
