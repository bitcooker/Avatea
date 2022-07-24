import * as React from "react";
import {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import {useWallet} from "@albs1/use-wallet";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

// core components
import helper from "../../src/helpers";

// page components
import SkeletonInbox from "../../src/components/pages/inbox/SkeletonInbox";

import {usePageTitleContext} from "../../src/context/PageTitleContext";

export default function Inbox(props) {
    const wallet = useWallet();
    const {setTitle} = usePageTitleContext();

    const [selectAll, setSelectAll] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [readMessages, setReadMessages] = React.useState(0);
    const [select, setSelect] = React.useState(...Array(2).fill(false));

    useEffect(() => {
        const fetchMessages = async () => {
            if (wallet.account) {
                const result = await helper.messages.getMessages({recipient: wallet.account});
                setMessages(result);
                setReadMessages(result.filter(item => item.read_at).length)
            }
        };
        fetchMessages();

    }, [wallet]);

    useEffect(() => {
        setTitle("Inbox");
    }, [setTitle])

    return (
        <div className="grow rounded-2.5xl bg-white overflow-hidden">
            {/* Header */}
            <div className="flex justify-between p-4 border-b">
                <div className="flex divide-x">
                    <div className="flex px-2 space-x-1">
                        {messages.length - readMessages} unread
                        {messages.length - readMessages === 1 ?
                            ' message':
                            ' messages'
                        }
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div
                        className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition">
                        <i className="fa-solid fa-arrow-left text-xl"/>
                    </div>
                    <div
                        className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition">
                        <i className="fa-solid fa-arrow-right text-xl"/>
                    </div>
                    <div className="hidden md:flex text-gray-500 items-center">
                        Show&nbsp;<span className="text-black">1-25</span>&nbsp;of&nbsp;<span className="text-black">{messages.length}</span>
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="">
                {
                    messages.length ? messages.map((message, index) => (
                        <Link href={{pathname: `/inbox/` + message.id}} key={index}>
                            <div className="flex p-4 gap-5 items-center hover:bg-gray-100/50 hover:cursor-pointer transition">
                                <div className="flex w-6">
                                    <Image src={message.image} alt="" width={24} height={24}/>
                                </div>
                                <div className={message.read_at ? "grow w-1 truncate" : "grow w-1 truncate font-bold"}>
                                    {typeof window === 'undefined' ? "" : parse(DOMPurify.sanitize(message.subject))}
                                </div>
                                <div className="hidden md:flex">
                                    {moment(message.sent_at).format("llll")}
                                </div>
                            </div>
                        </Link>
                    )) : <SkeletonInbox/>
                }
            </div>
        </div>
    )
}