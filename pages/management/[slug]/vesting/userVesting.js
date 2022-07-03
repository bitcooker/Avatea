import {useWallet} from "use-wallet";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import helper from "../../../../src/helpers";

import Vesting from "../../../../src/components/pages/projects/Vesting";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";


export default function ProjectDetail(props) {
    //@Todo add min buy limit and max buy limit fields (stop-loss)
    const wallet = useWallet();
    const router = useRouter();
    const {slug, userAddress} = router.query;
    const [project, setProject] = useState({});
    const [marketMakingPool, setMarketMakingPool] = useState({});
    const [holdersMapping, setHoldersMapping] = useState({});


    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        if (props.marketMakingPool) setMarketMakingPool(props.marketMakingPool);
        else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
                setMarketMakingPool(result?.marketMakingPool);
            };
            fetchProject();
        }
    }, [props,slug]);

    useEffect(() => {
        //@TODO Error handling if empty market making pool or vault
        if (Object.keys(project).length !== 0) {
            const fetchProject = async () => {
                const result = await helper.project.getProject(project.slug);

                setMarketMakingPool(result?.marketMakingPool);
            };
            fetchProject();
        }
    }, [project]);

    useEffect(() => {
        if (wallet.status === "connected" && marketMakingPool.paired_token) {
            const initWalletConnected = async () => {
                const results = await helper.web3.marketMaker.fetchHoldersMapping(
                    wallet,
                    marketMakingPool.address,
                    userAddress
                );
                setHoldersMapping(results);
            };
            initWalletConnected();
        }
    }, [wallet, marketMakingPool,userAddress]);

    return (
        <ManagementAuthentication wallet={wallet} project={project}>
            <div className="space-y-7.5 mb-5">
                <Vesting
                    wallet={wallet}
                    marketMakingPool={marketMakingPool}
                    project={project}
                    holdersMapping={holdersMapping}
                    setAction={'revoke'}
                    userAddress={userAddress}
                />
            </div>
        </ManagementAuthentication>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
