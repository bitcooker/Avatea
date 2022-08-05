import {useWallet} from "@albs1/use-wallet";
import {useEffect, useState, useRef} from "react";
import {useRouter} from "next/router";
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
import Info from "../../src/components/pages/projects/Info";
import { usePageTitleContext } from '../../src/context/PageTitleContext';
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import moment from "moment/moment";
import Button from "../../src/components/core/Button/Button";
import ConnectYourWallet from "../../src/components/core/ConnectYourWallet";
import * as React from "react";

const tabItems = ["Info","Market Making", "Liquidity", "Vault", "Vesting"];

export default function ProjectDetail(props) {
    //@Todo add min buy limit and max buy limit fields (stop-loss)
    const { setTitle } = usePageTitleContext();

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
        setTitle("Project Detail");
        if (props.projectDetail) setProject(props.projectDetail);
        if (props.marketMakingPool) setMarketMakingPool(props.marketMakingPool);
        if (props.vault) setVault(props.vault);
        if (props.liquidityMaker) setLiquidityMaker(props.liquidityMaker);
        else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
                setMarketMakingPool(result?.marketMakingPool);
                setVault(result?.vault);
                setLiquidityMaker(result?.liquidityMaker)

            };
            fetchProject();
        }
    }, [props, slug, setTitle]);

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
        <motion.div initial={{ opacity: 0 }} transition={{ duration: .7 }} animate={{ opacity: 1 }} className="space-y-7.5">
            <Banner {...project} />
            {/* Tab menu */}
            <div ref={tabRef} className="flex justify-center">
                <Tab items={tabItems} tab={tab} setTab={setTab}/>
            </div>
            
            {tab === 0 &&   
                <div className="min-h-[800px] md-lg:min-h-[500px]">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                        <Info
                            project={project}
                            setTab={setTab}
                        />
                    </motion.div>
                </div>
            }
            {tab === 1 &&
                <div className="min-h-[800px] md-lg:min-h-[600px]">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                        <>
                            {
                                wallet.status === "connected" ? (
                                    <MarketMaking
                                        wallet={wallet}
                                        marketMakingPool={marketMakingPool}
                                        project={project}
                                    />
                                ) : <ConnectYourWallet/>
                            }
                        </>

                    </motion.div>
                </div>
            }
            {tab === 2 &&
                <div className="min-h-[500px] md-lg:min-h-[300px]">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                        <>
                            {
                                wallet.status === "connected" ? (
                                    <Liquidity
                                        wallet={wallet}
                                        project={project}
                                        marketMakingPool={marketMakingPool}
                                        liquidityMaker={liquidityMaker}
                                    />
                                ) : <ConnectYourWallet/>
                            }
                        </>

                    </motion.div>
                </div>
            }
            {tab === 3 &&
                <div className="min-h-[550px] md-lg:min-h-[350px]">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                        <>
                            {
                                wallet.status === "connected" ? (
                                    <Vault
                                        vault={vault}
                                        wallet={wallet}
                                        project={project}
                                        setTab={setTab}
                                    />
                                ) : <ConnectYourWallet/>
                            }
                        </>

                    </motion.div>
                </div>
            }
            {tab === 4 &&
                <div className="md-lg:min-h-[500px]">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                        <>
                            {
                                wallet.status === "connected" ? (
                                    <Vesting
                                        wallet={wallet}
                                        marketMakingPool={marketMakingPool}
                                        project={project}
                                        setTab={setTab}
                                    />
                                ) : <ConnectYourWallet/>
                            }
                        </>

                    </motion.div>
                </div>
            }
        </motion.div>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
