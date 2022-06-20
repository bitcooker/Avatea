import helper from "../src/helpers";
import Card from "../src/components/pages/projects/Card/Card";

export default function Home({ projects }) {
  return (
    <div>
      <Card projectsProps={projects} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const projects = await helper.project.getProjects();
  return {
    props: {
      projects,
    },
  };
}
