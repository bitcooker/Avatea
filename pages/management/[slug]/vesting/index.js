import * as React from "react";
import {useEffect, useState} from "react";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import helper from "../../../../src/helpers";
import {useWallet} from "@albs1/use-wallet";
import VestingBatchTable from "../../../../src/components/pages/management/vesting/Table/VestingBatchTable";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";
import {useRouter} from "next/router";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import Head from "next/head";
import {TITLE_PREFIX} from "../../../../src/helpers/constants";


export default function VestingOverview(props) {

    const [project, setProject] = React.useState({});
    const router = useRouter();
    const { slug } = router.query;
    const wallet = useWallet();
    const [vestingBatches, setVestingBatches] = useState([]);

    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
            };
            fetchProject();
        }
    }, [props]);

    useEffect(() => {
        const fetchVestingBatches = async () => {
            if (project.slug) {

                const vestingBatches = await helper.project.getVestingBatches(project.slug);
                setVestingBatches(vestingBatches.data)
            }
        }
        fetchVestingBatches();
    }, [project]);


    return (
        <>
            <Head>
                <title>{project.name} | Vesting | Management</title>
                <meta property="og:title" content={`${project.name} | Vesting | ${TITLE_PREFIX}`} key="title" />
                <meta name="robots" content="noindex" />
            </Head>
            <ManagementAuthentication wallet={wallet} project={project}>
                <div className="flex flex-col h-[85vh] space-y-7.5">
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="text-2xl">Vesting Overview</h1>
                        <div className={'grid grid-cols-2 gap-2.5'}>
                            <ButtonOutlineFit name="Back" icon="fa-regular fa-arrow-left" handleClick={() => router.back()} />
                            <ButtonFit name="Add Vesting" icon="fa-solid fa-plus" handleClick={() => router.push(`/management/${slug}/vesting/add`)}/>
                        </div>
                    </div>
                    <div className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                        <VestingBatchTable vestingBatches={vestingBatches} project={project}/>
                    </div>
                </div>
            </ManagementAuthentication>

        </>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}