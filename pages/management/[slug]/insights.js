import * as React from "react";
import {useEffect, useState, useRef } from "react";
import {useWallet} from "@albs1/use-wallet";
import {useRouter} from "next/router";
import { motion } from "framer-motion";

// core components
import Tab from "../../../src/components/core/Tab/Tab"

// project detail components
import Banner from "../../../src/components/pages/projectDetail/Banner/Banner";
import ManagementAuthentication from "../../../src/components/pages/management/ManagementAuthentication";
import {usePageTitleContext} from "../../../src/context/PageTitleContext";
import {VestingChart} from "../../../src/components/pages/management/charts/VestingChart";
import {ProjectChart} from "../../../src/components/pages/management/charts/ProjectChart";
import {GeoChart} from "../../../src/components/pages/management/charts/GeoChart";

// social icons without background
import helper from "../../../src/helpers";
import Head from "next/head";
import {TITLE_PREFIX} from "../../../src/helpers/constants";

const tabItems = ["Bar Chart", "Polygon Chart", "Map Chart"];

export default function Insights(props) {
    const wallet = useWallet();
    const router = useRouter();
    const {setTitle} = usePageTitleContext();

    const {slug} = router.query;
    const [project, setProject] = React.useState({});
    const [vestingData, setVestingData] = useState({})
    const [projectData, setProjectData] = useState({})
    const [userLocations, setUserLocations] = useState({})
    const [tab, setTab] = useState(0);
    const tabRef = useRef(null);

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

        const fetchUserLocations = async () => {
            const {data} = await helper.project.getUserLocations(slug)
            setUserLocations(data);
        };

        fetchVestingData();
        fetchProjectData();
        fetchUserLocations();

    }, [project, slug]);

    useEffect(() => {
        const onHashChangeStart = (url) => {
            setTab(parseInt(url.split('#')[1]));
        };

        router.events.on("hashChangeStart", onHashChangeStart);

        return () => {
            router.events.off("hashChangeStart", onHashChangeStart);
        };
    }, [router.events]);

    useEffect(() => {
        setTab(parseInt(router.asPath.search('#') === -1 ? 0 : router.asPath.split('#')[1]));
    }, [router.asPath])

    return (
        <>
            <Head>
                <title>{project.name} | Management</title>
                <meta property="og:title" content={`${project.name} | Insights | ${TITLE_PREFIX}`} key="title" />
                <meta name="robots" content="noindex" />
            </Head>
            <ManagementAuthentication wallet={wallet} project={project}>
                <div className="space-y-7.5">
                    <Banner {...project} />

                    {/* Tab menu */}
                    <div ref={tabRef} className="flex justify-center">
                        <Tab items={tabItems} tab={tab} setTab={setTab}/>
                    </div>

                    {tab === 0 &&
                        <div className="min-h-[560px]">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                                <VestingChart vestingData={vestingData}/>
                            </motion.div>
                        </div>
                    }

                    {tab === 1 &&
                        <div className="min-h-[1000px]">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                                <ProjectChart projectData={projectData}/>
                            </motion.div>
                        </div>
                    }

                    {tab === 2 &&
                        <div className="min-h-[680px]">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                                <GeoChart chosenKey='world' userLocations={userLocations}/>
                            </motion.div>
                        </div>
                    }
                </div>
            </ManagementAuthentication>
        </>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
