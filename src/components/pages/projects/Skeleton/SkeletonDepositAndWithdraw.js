import * as React from "react";

// projects components
import Card from "../../projectDetail/Card/Card";

export default function SkeletonDepositAndWithdraw(props) {
    return (
        <div className="grid lg:grid-cols-2 gap-7.5">
            <Card>
                <div className="animate-pulse w-full">
                    <div className="flex flex-col space-y-5">
                        <div className="rounded w-1/5 h-8 bg-slate-200" />
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

                        <div className="rounded-full w-full h-12.5 bg-slate-200" />
                        <div className="rounded-full w-full h-12.5 bg-slate-200" />
                        <div className="rounded-full w-full h-12.5 bg-slate-200" />
                    </div>
                </div>
            </Card>

            <Card>
                <div className="animate-pulse w-full">
                    <div className="flex flex-col space-y-5">
                        <div className="rounded w-1/5 h-8 bg-slate-200" />
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

                        <div className="rounded-full w-full h-12.5 bg-slate-200" />
                        <div className="rounded-full w-full h-12.5 bg-slate-200" />
                        <div className="rounded-full w-full h-12.5 bg-slate-200" />
                    </div>
                </div>
            </Card>
        </div>
    )
}