import * as React from "react";
import { useEffect, useState} from "react";

// core components
import Button from "../../../src/components/core/Button/Button";

// project detail components
import Banner from "../../../src/components/pages/projectDetail/Banner/Banner";
import Card from "../../../src/components/pages/projectDetail/Card/Card";

// social icons without background
import helper from "../../../src/helpers";
import VaultCard from "../../../src/components/pages/management/VaultCard";
import MarketMakingCard from "../../../src/components/pages/management/MarketMakingCard";
import ManageProjectCard from "../../../src/components/pages/management/ManageProjectCard";
import {useWallet} from "use-wallet";
import {useRouter} from "next/router";
import ManagementAuthentication from "../../../src/components/pages/management/ManagementAuthentication";

export default function ManagementIndex(props) {
    const wallet = useWallet();
    const router = useRouter();
    const { slug } = router.query;
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
        console.log(project)
    }, [props]);

    return (
            <ManagementAuthentication wallet={wallet} project={project}>
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
            </ManagementAuthentication>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
