import * as React from "react";
import helper from '../../src/helpers';
import Card from "./../../src/components/pages/projects/Card/Card";

import { useAppContext } from '../../src/context/AppContext'
import { usePageTitleContext } from '../../src/context/PageTitleContext';
import Head from "next/head";
import {TITLE_PREFIX} from "../../src/helpers/constants";


export default function Projects() {
    const { projects } = useAppContext();
    const { setTitle } = usePageTitleContext();

    React.useEffect(() => {
        setTitle("Projects")
    }, [setTitle])

    return (
        <div>
            <Head>
                <title>Projects | { TITLE_PREFIX }</title>
                <meta property="og:title" content={`Projects ${TITLE_PREFIX}`} key="title" />
            </Head>
            <div className="index">
                <Card projectsProps={projects}/>
            </div>
        </div>
    )
}