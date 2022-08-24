import Card from "../projectDetail/Card/Card";
import MaxButton from "./Button/MaxButton";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";
import {AVATEA_TOKEN} from "../../../helpers/constants";
import InputWithIconSubmit from "../../core/Input/InputWithIconSubmit";
import Button from "../../core/Button/Button";
import Feed from "../projectDetail/Feed/Feed";
import {ethers} from "ethers";
import helper from "../../../helpers";
import {useEffect, useState} from "react";
import SkeletonVault from "./Skeleton/SkeletonVault";
import CenteredContent from "../../core/CenteredContent";
import Image from "next/image";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import KPIWrapper from "../../core/KPIWrapper";
import KPICard from "../../core/KPICard";

export default function Vault({project, setTab }) {

    const [articles, setArticles] = useState([]);

    console.log(project)
    useEffect(() => {
        const fetchArticles = async () => {
            if (project.slug) {
                setArticles(
                    await helper.article.getArticles({ project: project.slug })
                );
            }
        };
        fetchArticles();
    }, [project]);



    return  (
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
                project?.image ?  <Card>
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
                    <Feed articles={articles} />
                </div>
            </Card>
        </div>

    )
}