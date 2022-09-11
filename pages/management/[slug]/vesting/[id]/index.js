import * as React from "react";
import {useEffect, useState} from "react";
import {useWallet} from "@albs1/use-wallet";

// core components
import ButtonFit from "../../../../../src/components/core/Button/ButtonFit";
import helper from "../../../../../src/helpers";
import VestingTable from "../../../../../src/components/pages/management/vesting/Table/VestingTable";
import ManagementAuthentication from "../../../../../src/components/pages/management/ManagementAuthentication";
import {useRouter} from "next/router";
import ButtonOutlineFit from "../../../../../src/components/core/Button/ButtonOutlineFit";
import Head from "next/head";
import {TITLE_PREFIX} from "../../../../../src/helpers/constants";

export default function VestingOverview(props) {

    const wallet = useWallet();
    const router = useRouter();
    const {slug } = router.query;
    const [vesting, setVesting] = useState([]);
    const [project, setProject] = React.useState({});


    useEffect(() => {
        const fetchVesting = async () => {
            const result = await helper.project.getVesting(props.id);
            setVesting(result.data);
        };
        fetchVesting();
    }, [props]);

    useEffect(() => {
        (async () => {
            const result = await helper.project.getProject(slug);
            setProject(result?.project);
        })()
    }, []);


    return (
        <>
            <Head>
                <title>{project.name} | Vesting Overview | Management</title>
                <meta property="og:title" content={`${project.name} | Vesting Overview | ${TITLE_PREFIX}`} key="title" />
                <meta name="robots" content="noindex" />
            </Head>
            <ManagementAuthentication wallet={wallet} project={project}>

                <div className="flex flex-col h-[85vh] space-y-7.5">
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="text-2xl">Vesting Overview</h1>
                        <ButtonOutlineFit name="Back" icon="fa-regular fa-arrow-left" handleClick={() => router.back()} />
                    </div>
                    <div className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                        <VestingTable vestingBatches={vesting}/>
                    </div>
                </div>
            </ManagementAuthentication>
        </>

    );
}


export async function getServerSideProps(context) {
    const {id} = context.query;
    return {props: {id: id}}
}