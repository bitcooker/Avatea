import * as React from "react";

// projects components
import Card from "../../projectDetail/Card/Card";

export default function SkeletonMarketMaking(props) {
    return <div className="grid md-lg:grid-cols-1 gap-7.5 max-w-[700px] lg:max-w-[900px] mx-auto">
        <Card>
            <div className="animate-pulse w-full">
                <div className="card-header">
                    <div className="rounded w-1/5 h-8 bg-slate-200" />
                    <div className="flex gap-10 py-5">
                        <div className="rounded w-1/3 h-25 bg-slate-200" />
                        <div className="rounded w-1/3 h-25 bg-slate-200" />
                        <div className="rounded w-1/3 h-25 bg-slate-200" />
                    </div>
                </div>
            </div>
        </Card>

        <Card>
            <div className="animate-pulse w-full">
                <div className="card-header">
                    <div className="rounded w-1/5 h-8 bg-slate-200" />
                </div>

            </div>
            <div className="card-content pt-5.5 space-y-5">
                <div className="space-y-2.5">
                    <div className="rounded w-1/6 h-8 bg-slate-200" />
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                        <div className="rounded w-full h-12.5 bg-slate-200" />
                        <div className="rounded w-full h-12.5 bg-slate-200" />
                    </div>
                </div>
                <div className="grid md-lg:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-10">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-full h-5 bg-slate-200" />
                    </div>
                    <div className="space-y-2.5">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-full h-12.5 bg-slate-200" />
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="rounded w-1/6 h-8 bg-slate-200" />
                    <div className="rounded w-full h-12.5 bg-slate-200" />
                </div>
                <div className="rounded-full w-full h-10 bg-slate-200" />
            </div>
        </Card>
    </div>
}