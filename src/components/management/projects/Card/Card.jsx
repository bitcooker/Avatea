import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import helper from "../../../../helpers/";

// core components
import Spinner from "../../../core/Spinner";

export default function Card({ projectProps }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const initProjects = async () => {
      if (!projectProps) setProjects(await helper.project.getProjects());
    };
    initProjects();
  }, [projectProps]);

  return (
    <div>
      {projects.length == 0 ? (
        <div className="flex items-center justify-center w-full h-[85vh]">
          <Spinner size={5} />
        </div>
      ) : (
        <div className="grid sm-md:grid-cols-2 xl-2xl:grid-cols-3 2xl-3xl:grid-cols-4 gap-5">
          {projects.map((project) => {
            return <CardItem key={project.slug} {...project} />;
          })}
        </div>
      )}
    </div>
  );
}
