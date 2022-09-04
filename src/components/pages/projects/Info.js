import {useEffect, useState} from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

import helper from "../../../helpers";

// core components
import KPIWrapper from "../../core/KPIWrapper";
import KPICard from "../../core/KPICard";

// page components
import Card from "../projectDetail/Card/Card";
import Feed from "../projectDetail/Feed/Feed";
import PriceAreaChart from "./Charts/PriceAreaChart";
import helpers from "../../../helpers";
import {useWallet} from "@albs1/use-wallet";

export default function Info({project, marketMakingPool}) {
    const wallet = useWallet();
    const [tab, setTab] = useState(0);
    const [articles, setArticles] = useState([]);
    const [tickerData, setTickersData] = useState([]);
    const [tvl,setTvl] = useState(0);
    const [totalSupply,setTotalSupply] = useState(0);
    const [price,setPrice] = useState(0);
    const [vested,setVested] = useState(0);

    useEffect(() => {
        console.log(project, marketMakingPool)
        if (project?.token) {
            (async () => {

                setTotalSupply(helpers.formatting.web3Format(await helpers.web3.token.fetchTotalSupply(wallet,project?.token)))
                setVested(helpers.formatting.web3Format(await helpers.web3.marketMaker.getTotalVested(wallet, marketMakingPool.address)))
                setPrice(await helpers.web3.uniswap.getPrice(wallet, project.token, marketMakingPool.paired_token));
            })()
        }
    },[project,marketMakingPool])

    useEffect(() => {
        const fetchArticles = async () => {
            if (project.slug) {
                setArticles(
                    await helper.article.getArticles({project: project.slug})
                );
            }
        };
        fetchArticles();
    }, [project]);


    useEffect(() => {
        const fetchArticles = async () => {
            if (marketMakingPool.id) {
                setTickersData(
                    await helper.marketMaking.getMarketMakingTickers(marketMakingPool.id)
                );
            }
        };
        fetchArticles();
    }, [marketMakingPool]);


    return (
        // <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-7.5 max-w-[900px] lg:max-w-[1000px] mx-auto">
        <div className="flex flex-col gap-5 max-w-[700px] lg:max-w-[800px] mx-auto">
            {(project?.image && marketMakingPool?.paired_token_image) &&

                <Card>
                    <KPIWrapper cols={4}>
                        <KPICard images={[project.image, marketMakingPool?.paired_token_image]} end={tvl}
                                 label={'TVL'}/>
                        <KPICard image={project.image} end={totalSupply} label={'Tot. Supply'}/>
                        <KPICard image={marketMakingPool?.paired_token_image} end={price}  label={'Price'}/>
                        <KPICard image={project.image} end={vested} label={'Vested'}/>
                    </KPIWrapper>
                </Card>
            }

            <Card title="Project Info">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-memo"/> Information</h1>
                </div>

                <div className="card-content pt-5.5">
                    <div className="break-all">{
                        typeof window === 'undefined' ? "" : parse(DOMPurify.sanitize(project?.description))
                    }</div>
                </div>
            </Card>

            {articles.length > 0 &&
                <Card title="News Feed" className={'col-span-full'}>
                    {/* Card Header */}
                    <div className="card-header">
                        <h1 className="text-2xl"><i className="fa-solid fa-newspaper"/> News</h1>
                    </div>

                    <div className="card-content pt-5.5">
                        <Feed articles={articles}/>
                    </div>
                </Card>
            }

            <Card title="Price Chart" className="md-lg:col-span-2">
                <div className="card-header flex justify-between">
                    <h1 className="text-2xl"><i className="fa-solid fa-chart-area"></i> Price Chart</h1>
                    <div className="flex gap-2">
                        <div
                            className={`px-2 py-1 rounded-md ${tab === 0 ? 'bg-gray-200 text-gray-500 hover:cursor-not-allowed' : 'bg-gray-300 hover:cursor-pointer'} hover:bg-gray-200/80 transition`}
                            onClick={() => setTab(0)}>H
                        </div>
                        <div
                            className={`px-2 py-1 rounded-md ${tab === 1 ? 'bg-gray-200 text-gray-500 hover:cursor-not-allowed' : 'bg-gray-300 hover:cursor-pointer'} hover:bg-gray-200/80 transition`}
                            onClick={() => setTab(1)}>D
                        </div>
                        <div
                            className={`px-2 py-1 rounded-md ${tab === 2 ? 'bg-gray-200 text-gray-500 hover:cursor-not-allowed' : 'bg-gray-300 hover:cursor-pointer'} hover:bg-gray-200/80 transition`}
                            onClick={() => setTab(2)}>W
                        </div>
                    </div>
                </div>
                <PriceAreaChart tickerData={tickerData} baseTicker={project.ticker}
                                pairedTicker={marketMakingPool.paired_token_ticker}/>
            </Card>
        </div>
    )
}