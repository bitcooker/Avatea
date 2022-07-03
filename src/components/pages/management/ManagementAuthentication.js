import * as React from "react";


export default function ManagementAuthentication({ project, wallet, children }) {
    return (
        <div>

            {
                wallet.status === "connected" ? (
                    wallet.account === project.owner ? (
                        children
                    ) : <p>You are not the owner</p>
                ) : <p>Please connect your wallet</p>
            }


        </div>
    );
}
