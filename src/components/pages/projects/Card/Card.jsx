import React, {useEffect, useState} from "react";
import CardItem from "./CardItem";
import helper from '../../../../helpers/';

export default function Card({projectProps}) {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const initProjects = async () => {
      if (!projectProps) setProjects(await helper.project.getProjects())
    }
    initProjects();
  },[])

  return (
    <div className="card__row">
      {
        projects.length === 0 ?
            <h1>Loading projects...</h1>
            :
            projects.map((project) => {
              return <CardItem key={project.slug} {...project} />;
            })
      }
    </div>
  );
}
