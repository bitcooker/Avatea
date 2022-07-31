import * as React from "react";

const AdminContext = React.createContext();

export function AdminWrapper({ children }) {
    const [isAdmin, setIsAdmin] = React.useState("");

    const value = { isAdmin, setIsAdmin }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdminContext() {
    return React.useContext(AdminContext)
}