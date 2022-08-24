import Card from "../projectDetail/Card/Card";
import Feed from "../projectDetail/Feed/Feed";
import helper from "../../../helpers";
import {useEffect, useState} from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import KPIWrapper from "../../core/KPIWrapper";
import KPICard from "../../core/KPICard";
import {PriceChart} from "./Charts/PriceChart";

export default function Vault({project, marketMakingPool}) {

    const [articles, setArticles] = useState([]);
    const [tickerData, setTickersData] = useState([]);

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
        <div className="grid md-lg:grid-cols-2 gap-7.5 max-w-[900px] lg:max-w-[1000px] mx-auto">
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
            {
                project?.image ? <Card>
                    <KPIWrapper cols={2}>
                        <KPICard image={project.image} end={100} label={'TLV'}/>
                        <KPICard image={project.image} end={100} label={'TLV'}/>
                        <KPICard image={project.image} end={100} label={'Price'}/>
                        <KPICard image={project.image} end={100} label={'Users'}/>

                    </KPIWrapper>

                </Card> : ''
            }

            <Card title="News Feed" className={'col-span-full'}>
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-newspaper"/> News</h1>
                </div>

                <div className="card-content pt-5.5">
                    <Feed articles={articles}/>
                </div>
            </Card>
            <PriceChart tickerData={tickerData} baseTicker={project.ticker} pairedTicker={marketMakingPool.paired_token_ticker} />

        </div>

    )
}