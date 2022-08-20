import * as React from "react";
import {useEffect, useState} from "react";

// core components
// project detail components
import Banner from "../../../src/components/pages/projectDetail/Banner/Banner";

// social icons without background
import helper from "../../../src/helpers";
import {useWallet} from "@albs1/use-wallet";
import {useRouter} from "next/router";
import ManagementAuthentication from "../../../src/components/pages/management/ManagementAuthentication";

import {usePageTitleContext} from "../../../src/context/PageTitleContext";
import {VestingChart} from "../../../src/components/pages/management/charts/VestingChart";
import {ProjectChart} from "../../../src/components/pages/management/charts/ProjectChart";

export default function Insights(props) {
    const wallet = useWallet();
    const router = useRouter();
    const {setTitle} = usePageTitleContext();

    const {slug} = router.query;
    const [project, setProject] = React.useState({});
    const [vestingData, setVestingData] = useState({})
    const [projectData, setProjectData] = useState({})

    useEffect(() => {
        setTitle("Project Management")
        if (props.projectDetail) setProject(props.projectDetail);

        else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
            };
            fetchProject();
        }
    }, [props, setTitle, slug]);

    useEffect(() => {

        const fetchVestingData = async () => {
            const {data} = await helper.project.getVestingData(slug)
            setVestingData(data);
        };

        const fetchProjectData = async () => {
            const {data} = await helper.project.getProjectData(slug)
            setProjectData(data);
        };

        fetchVestingData();
        fetchProjectData();

    }, [project]);


    return (
        <ManagementAuthentication wallet={wallet} project={project}>
            <div className="space-y-7.5">
                <Banner {...project} />


                <div className="space-y-7.5">
                    <VestingChart vestingData={vestingData}/>
                </div>

                <div className="space-y-7.5">
                    <ProjectChart projectData={projectData}/>
                </div>

            </div>
        </ManagementAuthentication>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
