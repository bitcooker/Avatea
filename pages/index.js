import helper from "../src/helpers";
import Card from "../src/components/pages/projects/Card/Card";

import { useAppContext } from '../src/context/AppContext'

export default function Home() {
  const projects = useAppContext();

  return (
    <div>
      <Card projectsProps={projects} />
    </div>
  );
}