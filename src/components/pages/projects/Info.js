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

export default function Vault({project, setTab }) {

    const [amountToVaultStake, setAmountToVaultStake] = useState('0');
    const [stakedVaultBalance, setStakedVaultBalance] = useState('0');
    const [vaultBalance, setVaultBalance] = useState('0');
    const [avateaBalance, setAvateaBalance] = useState('0');
    const [earnedTokens, setEarnedTokens] = useState('0');
    const [vaultTLV,setVaultTLV] = useState('0');
    const [rewardPerToken, setRewardPerToken] = useState('0');
    const [articles, setArticles] = useState([]);
    const [load, setLoad] = useState(true);


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
        <div className="grid md-lg:grid-cols-2 gap-7.5">
            <Card title="Project Info">
                {/* Card Header */}
                <div className="card-header">
                    <h1 className="text-2xl"><i className="fa-solid fa-newspaper"/> Project Info</h1>
                </div>

                <div className="card-content pt-5.5">
                    {project.description}
                </div>
            </Card>
            <Card title="News Feed">
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