import {useWallet} from "use-wallet";
import {useState, useEffect, useCallback} from "react";
import {useRouter} from "next/router";
import helper from "../../src/helpers";
import {ethers} from "ethers";

// core components
import Button from "../../src/components/core/Button/Button";
import Tab from "../../src/components/core/Tab/Tab";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Card from "../../src/components/pages/projectDetail/Card/Card";
import Vault from "../../src/components/pages/projects/Vault";
import {Chart} from "../../src/components/pages/projects/Vesting/Chart";
import MarketMaking from "../../src/components/pages/projects/MarketMaking";

const tabItems = ["Vault", "Market Making", "Vesting"];

export default function ProjectDetail(props) {
    //@Todo add min buy limit and max buy limit fields (stop-loss)
    const wallet = useWallet();
    const router = useRouter();
    const {slug} = router.query;
    const [project, setProject] = useState({});
    const [vault, setVault] = useState({});
    const [marketMakingPool, setMarketMakingPool] = useState({});
    const [tab, setTab] = useState(0); // 0 - Vault(News), 1 - Market Making, 2 - Vesting
    const [releaseAbleAmount, setReleaseAbleAmount] = useState(0);
    const [amountVested, setAmountVested] = useState(0);
    const [amountReleased, setAmountReleased] = useState(0);
    const [cliff, setCliff] = useState('0')
    const [start, setStart] = useState('0')
    const [duration, setDuration] = useState('0')
    const [slicePeriodSeconds, setSlicePeriodSeconds] = useState('0')


    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        if (props.marketMakingPool) setMarketMakingPool(props.marketMakingPool);
        if (props.vault) setVault(props.vault);
        else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
                setMarketMakingPool(result?.marketMakingPool);
                setVault(result?.vault);
            };
            fetchProject();
        }
    }, []);

    useEffect(() => {
        //@TODO Error handling if empty market making pool or vault
        if (Object.keys(project).length !== 0) {
            const fetchProject = async () => {
                const result = await helper.project.getProject(project.slug);

                setMarketMakingPool(result?.marketMakingPool);
                setVault(result?.vault);
            };
            fetchProject();
        }
    }, [props.projectDetail]);

    useEffect(() => {
        if (wallet.status === "connected" && marketMakingPool.paired_token) {
            const initWalletConnected = async () => {


                setReleaseAbleAmount(
                    helper.formatting.web3Format(
                        await helper.web3.marketMaker.computeReleasableAmount(
                            wallet,
                            marketMakingPool.address
                        ))
                );

                const {
                    available,
                    amountVested,
                    released,
                    baseAmountBought,
                    pairedAmountBought,
                    baseAmountSold,
                    pairedAmountSold,
                    cliff,
                    start,
                    duration,
                    slicePeriodSeconds,
                    projectOwner,
                    revocable
                } =
                    await helper.web3.marketMaker.fetchHoldersMapping(
                        wallet,
                        marketMakingPool.address
                    );
                setAmountReleased(helper.formatting.web3Format(released));
                setAmountVested(helper.formatting.web3Format(amountVested));
                // setBaseAmountBought(helper.formatting.web3Format(baseAmountBought));
                // setPairedAmountBought(helper.formatting.web3Format(pairedAmountBought));
                // setBaseAmountSold(helper.formatting.web3Format(baseAmountSold));
                // setPairedAmountSold(helper.formatting.web3Format(pairedAmountSold));
                setCliff(cliff);
                setStart(start);
                setDuration(duration);
                setSlicePeriodSeconds(slicePeriodSeconds);
            };
            initWalletConnected();
        }
    }, [wallet, vault, marketMakingPool]);


    const releaseVesting = async () => {
        await helper.marketMaker.release(
            wallet,
            marketMakingPool.address,
        );
    };

    return (
        <div className="space-y-7.5">
            <Banner {...project} />
            {/* Tab menu */}
            <div className="flex justify-center">
                <Tab items={tabItems} tab={tab} setTab={setTab}/>
            </div>
            {/* Staked Avatea in vaults & News Feed */}
            {tab == 0 && (
                <Vault vault={vault} wallet={wallet} project={project} marketMakingPool={marketMakingPool}/>
            )}

            {/* Activity & Settings */}
            {tab == 1 && (
                <MarketMaking wallet={wallet} marketMakingPool={marketMakingPool} vault={vault} project={project}/>
            )}

            {tab == 2 && (
                <Card>
                    <div className="vesting-header">
                        <h1 className="text-2xl">Vesting</h1>

                        <div className="py-5.5 space-y-4.5">
                            <div className="flex justify-between">
                                <span className="text-sm">Total Vested</span>
                                <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5"/>
                                    {amountVested}
                </span>
                            </div>
                            <div className="py-5.5 space-y-4.5">
                                <div className="flex justify-between">
                                    <span className="text-sm">Released</span>
                                    <span className="flex text-base font-medium">
                    <img
                        src="/coins/maticIcon.png"
                        className="w-6 h-6 mr-2.5"
                    />
                                        {amountReleased}
                  </span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Releaseable Amount</span>
                                <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5"/>
                                    {releaseAbleAmount}
                </span>
                            </div>
                        </div>
                    </div>
                    <Chart
                        amountVested={amountVested}
                        cliff={cliff}
                        start={start}
                        duration={duration}
                        slicePeriodSeconds={slicePeriodSeconds}
                        ticker={project.ticker}
                    />
                    <div className="pt-9">
                        <Button name="Release Tokens" handleClick={releaseVesting}/>
                    </div>
                </Card>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const {slug} = context.query;
    if (slug !== "undefined") {
        let projectDetails;
        try {
            projectDetails = await helper.project.getProject(slug);
        } catch (e) {
            console.log(e);
            projectDetails = null;
        }
        return {
            props: {
                projectDetail: projectDetails?.project,
                marketMakingPool: projectDetails?.marketMakingPool,
                vault: projectDetails?.vault,
            },
        };
    } else {
        return {
            props: {
                projectDetail: null,
                marketMakingPool: null,
                vault: null,
            },
        };
    }
}
