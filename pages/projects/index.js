import helper from '../../src/helpers';
import Card from "./../../src/components/pages/projects/Card/Card";


export default function Projects({projects}) {
    return (
        <div>
            <div className="index">
                <Card projectsProps={projects}/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const projects = await helper.project.getProjects();
    return {
        props: {
            projects
        }
    }
}