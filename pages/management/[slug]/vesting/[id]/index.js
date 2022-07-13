import * as React from "react";
import {useEffect, useState} from "react";
import {useWallet} from "use-wallet";

// core components
import ButtonFit from "../../../../../src/components/core/Button/ButtonFit";
import helper from "../../../../../src/helpers";
import VestingTable from "../../../../../src/components/pages/management/vesting/Table/VestingTable";
import ManagementAuthentication from "../../../../../src/components/pages/management/ManagementAuthentication";
import {useRouter} from "next/router";

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
        <ManagementAuthentication wallet={wallet} project={project}>

        <div className="flex flex-col h-[85vh] space-y-7.5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl">Vesting Overview</h1>
                <ButtonFit name="Submit Vesting" icon="fa-solid fa-cloud-arrow-up"/>
            </div>
            <div className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                <VestingTable vestingBatches={vesting}/>
            </div>
        </div>
        </ManagementAuthentication>

    );
}


export async function getServerSideProps(context) {
    const {id} = context.query;
    return {props: {id: id}}
}