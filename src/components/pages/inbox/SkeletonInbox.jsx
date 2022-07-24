import * as React from "react";

export default function SkeletonInbox(props) {
    return (
        <div className="p-5 flex flex-col gap-10 animate-pulse w-full">
            {[...Array(12)].map((item,index) => (
                <div className="flex justify-between" key={index}>
                    <div className="flex grow gap-1">
                        <div className="rounded w-3/5 h-2 bg-slate-200" />
                    </div>
                    <div className="rounded w-1/5 h-2 bg-slate-200" />
                </div>
                
            ))}
        </div>
    )
}