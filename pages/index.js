import * as React from "react";
import helper from "../src/helpers";
import Card from "../src/components/pages/projects/Card/Card";

import { useAppContext } from '../src/context/AppContext'
import { usePageTitleContext } from "../src/context/PageTitleContext";

export default function Home() {
  const projects = useAppContext();
  const { setTitle } = usePageTitleContext();

  React.useEffect(() => {
    setTitle("Home")
  }, [setTitle])

  return (
    <div>
      <Card projectsProps={projects} />
    </div>
  );
}