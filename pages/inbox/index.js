import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

// core components
import Checkbox from "../../src/components/core/Checkbox/Checkbox";

const notifications = [
    {
        id: 1,
        title: "Test notification1",
        logo: "https://avatea-bucket.s3.amazonaws.com/media/images/favicon.ico",
        content: "Am no an listening depending up believing. Enough around remove to barton agreed regret in or it. Advantage mr estimable be commanded provision. Year well shot deny shew come now had. Shall downs stand marry taken his for out. Do related mr account brandon an up. Wrong for never ready ham these witty him. Our compass see age uncivil matters weather forbade her minutes. Ready how but truth son new under.",
        timestamp: new Date().getTime()
    },
    {
        id: 2,
        title: "Test notification2",
        logo: "https://avatea-bucket.s3.amazonaws.com/media/images/polygon-matic-logo.png",
        content: "Am no an listening depending up believing. Enough around remove to barton agreed regret in or it. Advantage mr estimable be commanded provision. Year well shot deny shew come now had. Shall downs stand marry taken his for out. Do related mr account brandon an up. Wrong for never ready ham these witty him. Our compass see age uncivil matters weather forbade her minutes. Ready how but truth son new under.",
        timestamp: new Date().getTime()
    }
]

export default function Inbox(props) {
    const [selectAll, setSelectAll] = React.useState(false);
    const [select, setSelect] = React.useState(...Array(2).fill(false));

    return (
        <div className="rounded-2.5xl bg-white overflow-hidden">
            {/* Header */}
            <div className="flex justify-between p-4 border-b">
                <div className="flex divide-x">
                    {/* <div className="flex items-center pr-3">
                        <Checkbox initialValue={selectAll} setValue={setSelectAll} />
                    </div> */}
                    {/* <div className="flex px-2 space-x-1">
                        <div className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition"> 
                            <i className="fa-solid fa-trash-can text-xl" />
                        </div>
                        <div className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition"> 
                            <i className="fa-solid fa-envelope text-xl" />
                        </div>
                        <div className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition"> 
                            <i className="fa-solid fa-circle-info text-xl" />
                        </div>
                    </div> */}
                </div>

                <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition"> 
                            <i className="fa-solid fa-arrow-left text-xl" />
                        </div>
                        <div className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition"> 
                            <i className="fa-solid fa-arrow-right text-xl" />
                        </div>
                        <div className="hidden md:flex text-gray-500 items-center">
                            Show&nbsp;<span className="text-black">1-25</span>&nbsp;of&nbsp;<span className="text-black">2290</span>
                        </div>
                </div>
            </div>

            {/* content */}
            <div className="">
                {notifications.map((notification, index) => (
                    <Link href={{ pathname: `/inbox/detail`, query: notification}} key={index}>
                        <div className="flex p-4 gap-5 items-center hover:bg-gray-100/50 hover:cursor-pointer transition">
                            <div className="flex" onClick={(e) => e.stopPropagation()}>
                                <Checkbox initialValue={select[index]} setValue={() => {}} />
                            </div>
                            <div className="flex w-6">
                                <Image src={notification.logo} alt="" width={24} height={24} />
                            </div>
                            <div className="min-w-[40px] max-w-[120px] md:max-w-[160px] truncate">
                                {notification.title}
                            </div>
                            <div className="grow w-1 truncate">
                                {notification.content}
                            </div>
                            <div className="hidden md:flex">
                                {moment(notification.timestamp).format("llll")}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) 
}