import * as React from "react";
import { useEffect, useState} from "react";

// core components
import Button from "../../../src/components/core/Button/Button";

// project detail components
import Banner from "../../../src/components/pages/projectDetail/Banner/Banner";
import Card from "../../../src/components/pages/projectDetail/Card/Card";

// social icons without background
import helper from "../../../src/helpers";
import VaultCard from "../../../src/components/management/VaultCard";
import MarketMakingCard from "../../../src/components/management/MarketMakingCard";
import ManageProjectCard from "../../../src/components/management/ManageProjectCard";

const SOCIALDATA = [
    {
        name: "LinkedIn",
        value: "social_linkedin",
        icon: "linkedin",
        color: "bg-indigo-400",
    },
    {
        name: "Facebook",
        value: "social_facebook",
        icon: "facebook-f",
        color: "bg-indigo-400",
    },
    {
        name: "Github",
        value: "social_github",
        icon: "github",
        color: "bg-indigo-400",
    },
    {
        name: "Telegram",
        value: "social_telegram",
        icon: "telegram",
        color: "bg-sky-400",
    },
    {
        name: "Discord",
        value: "social_discord",
        icon: "discord",
        color: "bg-indigo-400",
    },
    {
        name: "Medium",
        value: "social_medium",
        icon: "medium",
        color: "bg-indigo-400",
    },
    {
        name: "Twitter",
        value: "social_twitter",
        icon: "twitter",
        color: "bg-sky-400",
    },
];

export default function VaultsDetail(props) {
    const [project, setProject] = React.useState({});
    const [vault, setVault] = useState({});
    const [marketMakingPool, setMarketMakingPool] = useState({});

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
    }, [props]);

    return (
        <div>


            <div className="space-y-7.5">
                <Banner {...project} />

                {!project.signed_contract ? (
                    <Card>
                        <div className="card-header mb-5">
                            <h1 className="text-2xl">
                                First you need to verify the contract which has bent sent to
                                your email.
                            </h1>
                        </div>
                        <div className="w-full space-y-3.75">
                            {/* Edit Button */}
                            <Button name="Contact support"/>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-7.5">
                        <div className="grid grid-cols-1 md-lg:grid-cols-2 gap-3.75">
                            <VaultCard vault={vault} project={project}/>
                            <MarketMakingCard project={project} marketMakingPool={marketMakingPool}/>
                            <ManageProjectCard project={project} vault={vault}/>
                        </div>

                    </div>
                )}
            </div>


        </div>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
