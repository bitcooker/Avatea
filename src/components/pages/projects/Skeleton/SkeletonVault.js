import * as React from "react";

// projects components
import Card from "../../projectDetail/Card/Card";

export default function SkeletonVault(props) {
    return <div className="grid md-lg:grid-cols-2 gap-7.5">
        <Card>
            <div className="animate-pulse w-full">
                <div className="divide-y">
                    <div className="card-header">
                        <div className="rounded w-1/5 h-8 bg-slate-200" />
                        <div className="py-5.5 space-y-4.5">
                            <div className="flex justify-between">
                                <div className="rounded w-1/6 h-5 bg-slate-200" />
                                <div className="rounded w-1/12 h-5 bg-slate-200" />
                            </div>
                            <div className="flex justify-between">
                                <div className="rounded w-1/3 h-5 bg-slate-200" />
                                <div className="rounded w-1/12 h-5 bg-slate-200" />
                            </div>
                            <div className="flex justify-between">
                                <div className="rounded w-1/6 h-5 bg-slate-200" />
                                <div className="rounded w-1/12 h-5 bg-slate-200" />
                            </div>
                            <div className="flex justify-between">
                                <div className="rounded w-1/2 h-5 bg-slate-200" />
                                <div className="rounded w-1/12 h-5 bg-slate-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        <Card title="News Feed">
            <div className="animate-pulse w-full">
                <div className="rounded w-1/5 h-8 bg-slate-200" />
                <div className="pt-5.5">
                    <div className="card-content pt-4.5 space-y-3.75">
                        <div className="flex justify-between">
                            <div className="rounded w-1/6 h-5 bg-slate-200" />
                            <div className="flex flex-row w-1/6 gap-x-1">
                                <div className="rounded w-1/2 h-5 bg-slate-200" />
                                <div className="rounded w-1/2 h-5 bg-slate-200" />
                            </div>
                        </div>
                        <div className="rounded w-full h-12.5 bg-slate-200"></div>
                        <div className="flex justify-between">
                            <div className="rounded w-1/6 h-5 bg-slate-200" />
                            <div className="flex flex-row w-1/6 gap-x-1">
                                <div className="rounded w-1/2 h-5 bg-slate-200" />
                                <div className="rounded w-1/2 h-5 bg-slate-200" />
                            </div>
                        </div>
                        <div className="rounded w-full h-12.5 bg-slate-200"></div>
                    </div>
                </div>
                <div className="pt-5.5">
                    <div className="flex flex-col md-lg:flex-row gap-5">
                        <div className="rounded-full w-full h-10 bg-slate-200" />
                        <div className="rounded-full w-full h-10 bg-slate-200" />
                    </div>
                </div>
            </div>
        </Card>
    </div>
}