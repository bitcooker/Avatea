import * as React from "react";
import {useEffect, useState} from "react";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import helper from "../../../../src/helpers";
import {useWallet} from "use-wallet";
import VestingBatchTable from "../../../../src/components/core/table/VestingBatchTable";


export default function VestingOverview(props) {

    const [project, setProject] = React.useState({});
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
    }, []);

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
        <div className="flex flex-col h-[85vh] space-y-7.5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl">Vesting Overview</h1>

                <ButtonFit name="Submit Vesting" icon="fa-solid fa-cloud-arrow-up"/>
            </div>
            <div className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                <VestingBatchTable vestingBatches={vestingBatches} project={project}/>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}