import helper from "../src/helpers";
import Card from "../src/components/pages/projects/Card/Card";

import { useAppContext } from '../src/context/AppContext'
import { usePageTitleContext } from "../src/context/PageTitleContext";

export default function Home() {
  const projects = useAppContext();
  const { setTitle } = usePageTitleContext();

  setTitle("Home")

  return (
    <div>
      <Card projectsProps={projects} />
    </div>
  );
}