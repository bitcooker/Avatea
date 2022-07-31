import * as React from "react";
import Card from "./../../src/components/pages/projects/Card/Card";

import { usePageTitleContext } from '../../src/context/PageTitleContext';
import {useEffect, useState} from "react";
import {useWallet} from "@albs1/use-wallet";
import helpers from "../../src/helpers";
import {useAdminContext} from "../../src/context/AdminContext";


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
    },[wallet.status])
    console.log(projects)

    const { setTitle } = usePageTitleContext();

    React.useEffect(() => {
        setTitle("Management")
    }, [setTitle])

    return (
        <div>
            <div className="index">
                {
                    isAdmin ? (
                        projects.length === 0 ? "You are no admin in any project" :
                            <Card projectsProps={projects}/>
                    ) :
                        <p>You are no admin</p>
                }

            </div>
        </div>
    )
}