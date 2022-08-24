import * as React from "react";

// projects components
import Card from "../../projectDetail/Card/Card";

export default function SkeletonDeposit(props) {
    return (
        <div className="flex flex-col gap-5 max-w-[700px] lg:max-w-[800px] mx-auto">
            <Card>
                <div className="animate-pulse w-full">
                    <div className="rounded w-1/5 h-8 bg-slate-200" />
                    <div className="pt-10 card-content space-y-5">
                        <div className="flex flex-col space-y-2.5">
                            <div className="flex justify-between">
                                <div className="rounded w-1/6 h-5 bg-slate-200" />
                                <div className="flex flex-row w-1/6 gap-x-1">
                                    <div className="rounded w-1/2 h-5 bg-slate-200" />
                                    <div className="rounded w-1/2 h-5 bg-slate-200" />
                                </div>
                            </div>
                            <div className="rounded w-full h-12.5 bg-slate-200" />
                        </div>

                        <div className="flex flex-col space-y-2.5">
                            <div className="flex justify-between">
                                <div className="rounded w-1/6 h-5 bg-slate-200" />
                                <div className="flex flex-row w-1/6 gap-x-1">
                                    <div className="rounded w-1/2 h-5 bg-slate-200" />
                                    <div className="rounded w-1/2 h-5 bg-slate-200" />
                                </div>
                            </div>
                            <div className="rounded w-full h-12.5 bg-slate-200" />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="rounded h-40 bg-slate-200" />
                <div className="rounded h-40 bg-slate-200" />
                <div className="rounded h-40 bg-slate-200" />
            </div>
        </div>
    )
}