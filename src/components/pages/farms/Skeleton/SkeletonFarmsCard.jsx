import * as React from "react";

export default function SkeletonFarmsCard(props) {
    return (
        <div className="flex flex-col p-6 bg-white rounded-2.5xl gap-5 divide-y">
            <div className="animate-pulse flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="w-16 h-16 bg-slate-200 rounded" />
                    <div className="flex flex-col gap-1 items-end">
                        <div className="rounded w-40 h-8 bg-slate-200" />
                        <div className="rounded-full w-20 h-8 bg-slate-200" />
                    </div>
                </div>

                <div className="flex p-2 flex-col gap-2">
                    <div className="flex w-full justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                </div>

                <div className="flex flex-col px-2 gap-3">
                    <div className="flex flex-start">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="flex gap-2">
                        <div className="rounded w-full h-12.5 bg-slate-200"></div>
                        <div className="rounded-full w-full h-12.5 bg-slate-200"></div>
                    </div>
                </div>

                <div className="flex flex-col px-2 gap-3">
                    <div className="flex flex-start">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="flex gap-2">
                        <div className="rounded w-full h-12.5 bg-slate-200"></div>
                        <div className="rounded-full w-full h-12.5 bg-slate-200"></div>
                    </div>
                </div>

                <div className="rounded-full w-full h-12.5 bg-slate-200"></div>

                <div className="flex p-2 flex-col gap-2">
                    <div className="flex w-full justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                        <div className="rounded w-1/3 h-5 bg-slate-200" />
                    </div>
                </div>

                <div className="rounded w-full h-12.5 bg-slate-200"></div>
            </div>
        </div>
    )
}