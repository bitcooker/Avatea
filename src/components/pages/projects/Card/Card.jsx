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
            staggerChildren: 0.25,
            delayChildren: 0.3
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}

export default function Card( {projectsProps, management = false} ) {

  return (
    <div>
      {projectsProps?.length == 0 ? (
        <div className="flex items-center justify-center w-full h-[85vh]">
          <Spinner size={5} />
        </div>
      ) : (
            <motion.div className="grid sm-md:grid-cols-2 xl-2xl:grid-cols-3 gap-5" variants={variants} initial="hidden" animate="show">
                    {projectsProps?.map((project) =>
                        <motion.div variants={cardVariants} transition={{ duration: .5 }} key={project.slug}>
                            <CardItem key={project.slug} {...project} management={management} />
                        </motion.div>
                    )}
            </motion.div>
      )}
    </div>
  );
}
