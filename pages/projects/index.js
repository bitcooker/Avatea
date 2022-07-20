import helper from '../../src/helpers';
import Card from "./../../src/components/pages/projects/Card/Card";

import { useAppContext } from '../../src/context/AppContext'


export default function Projects() {
    const projects = useAppContext();

    return (
        <div>
            <div className="index">
                <Card projectsProps={projects}/>
            </div>
        </div>
    )
}