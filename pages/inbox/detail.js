import * as React from "react";
import { useRouter } from "next/router";
import moment from "moment";

export default function InboxDetail() {
    const router = useRouter();
    const notification = router.query;

    return (
        <div className="flex flex-col gap-5 p-4 md:p-10 h-[70vh] md:h-[80vh] bg-white rounded-2.5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="relative flex w-full md-lg:w-fit items-center justify-center gap-5">
                    <div className="absolute left-0 flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition" onClick={() => router.back()}> 
                        <i className="fa-solid fa-arrow-left text-xl" />
                    </div>
                    <h1 className="text-2xl md-lg:pl-10">
                        {notification.title}
                    </h1>
                </div>
                <span>
                    {moment(Number(notification.timestamp)).format("llll")}
                </span>
            </div>
            {notification.content}
        </div>
    )
}