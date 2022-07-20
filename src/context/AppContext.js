import * as React from "react";
import helper from '../helpers';

const AppContext = React.createContext();

export function AppWrapper({ children }) {
    const [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
        const getProjects = async () => {
            const projects = await helper.project.getProjects();
            setProjects(projects);
        }

        getProjects();
    }, [])

    return (
        <AppContext.Provider value={projects}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return React.useContext(AppContext)
}