import * as React from "react";

const PageTitleContext = React.createContext();

export function PageTitleWrapper({ children }) {
    const [title, setTitle] = React.useState("");

    const value = { title, setTitle }

    return (
        <PageTitleContext.Provider value={value}>
            {children}
        </PageTitleContext.Provider>
    )
}

export function usePageTitleContext() {
    return React.useContext(PageTitleContext)
}