import * as React from "react";
import Card from "./../../src/components/pages/projects/Card/Card";

import { usePageTitleContext } from '../../src/context/PageTitleContext';
import {useEffect, useState} from "react";
import {useWallet} from "@albs1/use-wallet";
import helpers from "../../src/helpers";
import {useAdminContext} from "../../src/context/AdminContext";
import Head from "next/head";
import {TITLE_PREFIX} from "../../src/helpers/constants";


export default function Management() {

    const [projects, setProjects] = useState([]);
    const { isAdmin } = useAdminContext();
    const wallet = useWallet();

    useEffect(() => {
        if (wallet.isConnected()) {
            (async() => {
                const res = await helpers.project.getProjects({
                    live: "",
                    admin: wallet.account
                })
                setProjects(res);
            })()
        }
    },[wallet])

    const { setTitle } = usePageTitleContext();

    React.useEffect(() => {
        setTitle("Management")
    }, [setTitle])

    return (
        <div>
            <Head>
                <title>Manage Projects | { TITLE_PREFIX }</title>
                <meta property="og:title" content={`Manage Projects | ${TITLE_PREFIX}`} key="title" />
            </Head>
            <div className="index">
                {
                    isAdmin ? (
                        projects.length === 0 ? "You are no admin in any project" :
                            <Card projectsProps={projects} management={true}/>
                    ) :
                        <p>You are no admin</p>
                }

            </div>
        </div>
    )
}