import axios from 'axios';
import {useWallet} from "use-wallet";
import {useState, useEffect} from "react";
import helper from '../../src/helpers';
import Link from 'next/link'


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
            <h1>Project List Page</h1>
            {
                projects ? (
                    <ul>
                        {mapProjects()}
                    </ul>
                ) : (
                    <p>Loading projects...</p>
                )
            }

        </div>
    )
}

// Projects.getInitialProps = async (ctx) => {
//
//     return { projects: 'test' }
// }

export async function getServerSideProps(context) {
    const projects = await helper.utilities.getProjects();
    return {
        props: {
            projects
        }
    }
}