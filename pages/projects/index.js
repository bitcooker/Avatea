import axios from 'axios';
import {useWallet} from "use-wallet";
import {useState, useEffect} from "react";
import helper from '../../src/helpers';
import Link from 'next/link'
import Card from "./../../src/components/pages/projects/Card/Card";


export default function Projects({projects}) {

    const wallet = useWallet();

    const mapProjects = () => {
        return projects.map(project => {
            return (
                <li key={project.slug}>
                    <Link href={`/projects/${project.slug}`}>
                    {project.name}
                    </Link>
                    <small>
                        {project.description}
                    </small>
                </li>
            )
        })
    }

    return (
        <div>
            <div className="index">
                <Card projectsProps={projects} />
            </div>
        </div>
    )
}

// Projects.getInitialProps = async (ctx) => {
//
//     return { projects: 'test' }
// }

export async function getServerSideProps(context) {
    const projects = await helper.project.getProjects();
    return {
        props: {
            projects
        }
    }
}