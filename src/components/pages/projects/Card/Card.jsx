import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import helper from "../../../../helpers/";

// page components
import CardItem from "./CardItem";

// core components
import Spinner from "../../../core/Spinner";

const variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}

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
            <motion.div className="grid sm-md:grid-cols-2 xl-2xl:grid-cols-3 gap-5" variants={variants} initial="hidden" animate="show">
                    {projects.map((project) =>
                        <motion.div variants={cardVariants} key={project.slug}>
                            <CardItem key={project.slug} {...project} />
                        </motion.div>
                    )}
            </motion.div>
      )}
    </div>
  );
}
