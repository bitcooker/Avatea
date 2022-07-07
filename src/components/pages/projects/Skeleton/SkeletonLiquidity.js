import * as React from "react";

// projects components
import Card from "../../projectDetail/Card/Card";

export default function SkeletonLiquidity(props) {
    return <div className="grid lg:grid-cols-2 gap-7.5">
        <Card>
            <div className="animate-pulse w-full">
                <div className="card-header">
                    <div className="rounded w-2/5 h-8 bg-slate-200" />
                    <div className="py-5.5 space-y-4.5">
                        <div className="flex justify-between">
                            <div className="rounded w-1/4 h-5 bg-slate-200" />
                            <div className="rounded w-1/3 h-5 bg-slate-200" />
                        </div>
                        <div className="flex justify-between">
                            <div className="rounded w-1/4 h-5 bg-slate-200" />
                            <div className="rounded w-1/3 h-5 bg-slate-200" />
                        </div>
                        <div className="flex justify-between">
                            <div className="rounded w-1/3 h-5 bg-slate-200" />
                            <div className="rounded w-1/3 h-5 bg-slate-200" />
                        </div>
                        <div className="flex justify-between">
                            <div className="rounded w-1/3 h-5 bg-slate-200" />
                            <div className="rounded w-1/5 h-5 bg-slate-200" />
                        </div>
                        <div className="flex justify-between">
                            <div className="rounded w-1/3 h-5 bg-slate-200" />
                            <div className="rounded w-1/6 h-5 bg-slate-200" />
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <Card>
            <div className="animate-pulse w-full">
                <div className="card-header">
                    <div className="rounded w-4/5 h-8 bg-slate-200" />
                </div>
                <div className="card-content pt-5.5 space-y-3.75">
                    <div className="flex justify-between">
                        <div className="rounded w-1/5 h-5 bg-slate-200" />
                        <div className="rounded w-1/5 h-5 bg-slate-200" />
                    </div>
                    <div className="flex justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/5 h-5 bg-slate-200" />
                    </div>
                    <div className="flex justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="grid md-lg:grid-cols-2 gap-3.75">
                        <div className="rounded-full w-full h-10 bg-slate-200" />
                        <div className="rounded-full w-full h-10 bg-slate-200" />
                        <div className="rounded-full w-full h-10 bg-slate-200" />
                        <div className="rounded-full w-full h-10 bg-slate-200" />
                    </div>
                </div>
            </div>
        </Card>
    </div>
}