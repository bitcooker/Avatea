import * as React from "react";
import helper from '../helpers';

const AppContext = React.createContext();

export function AppWrapper({ children }) {
    const [projects, setProjects] = React.useState([]);
    const [messages, setMessages] = React.useState(0);

    React.useEffect(() => {
        const getProjects = async () => {
            const projects = await helper.project.getProjects();
            setProjects(projects);
        }

        getProjects();
    }, [])

    const value = { projects, messages, setMessages }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return React.useContext(AppContext)
}