import * as React from "react";

// projects components
import Card from "../../projectDetail/Card/Card";

export default function SkeletonVesting(props) {
    return <Card>
        <div className="animate-pulse w-full">
            <div className="card-header">
                <div className="rounded w-1/5 h-8 bg-slate-200" />
            </div>

            <div className="card-content">
                <div className="flex flex-col justify-center py-5.5 space-y-4.5">
                    <div className="flex justify-center space-x-5">
                        <div className="rounded w-1/6 h-10 bg-slate-200" />
                        <div className="rounded w-1/6 h-10 bg-slate-200" />
                        <div className="rounded w-1/6 h-10 bg-slate-200" />
                    </div>

                    <div className="rounded w-full h-96 bg-slate-200" />
                </div>
                <div className="grid md-lg:grid-cols-2 gap-3.75">
                    <div className="rounded-full h-10 bg-slate-200" />
                    <div className="rounded-full h-10 bg-slate-200" />
                </div>
            </div>
        </div>
    </Card>
}