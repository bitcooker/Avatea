import {useWallet} from "use-wallet";
import {useEffect, useState, useRef} from "react";
import {useRouter} from "next/router";
import { Motion, spring } from "react-motion"
import { motion } from "framer-motion"

import helper from "../../src/helpers";

// core components
import Tab from "../../src/components/core/Tab/Tab";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Vault from "../../src/components/pages/projects/Vault";
import MarketMaking from "../../src/components/pages/projects/MarketMaking";
import Vesting from "../../src/components/pages/projects/Vesting";
import Liquidity from "../../src/components/pages/projects/LiquidityMaker";

const tabItems = ["Market Making", "Liquidity", "Vault", "Vesting"];

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
    const tabRef = useRef(null);

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

    return (
        <div className="space-y-7.5">
            <Banner {...project} />
            {/* Tab menu */}
            <div ref={tabRef} className="flex justify-center">
                <Tab items={tabItems} tab={tab} setTab={setTab}/>
            </div>
            
                {tab === 0 &&   
                    <div className="min-h-[800px] md-lg:min-h-[600px]">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                            <MarketMaking
                                wallet={wallet}
                                marketMakingPool={marketMakingPool}
                                project={project}
                            />
                        </motion.div>
                    </div>
                }
                {tab === 1 &&
                    <div className="min-h-[500px] md-lg:min-h-[300px]">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                            <Liquidity
                                wallet={wallet}
                                project={project}
                                marketMakingPool={marketMakingPool}
                                liquidityMaker={liquidityMaker}
                            />
                        </motion.div>
                    </div>
                }
                {tab === 2 && 
                    <div className="md-lg:min-h-[550px]">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                            <Vault
                                vault={vault}
                                wallet={wallet}
                                project={project}
                                setTab={setTab}
                            />
                        </motion.div>
                    </div>
                }
                {tab === 3 && 
                    <div className="md-lg:min-h-[680px]">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                            <Vesting
                                wallet={wallet}
                                marketMakingPool={marketMakingPool}
                                project={project}
                                setTab={setTab}
                            />
                        </motion.div>
                    </div>
                }
            </div>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
