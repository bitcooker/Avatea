import * as React from "react";
import {useEffect, useState} from "react";
import Link from "next/link";
import moment from "moment";

// core components
import Checkbox from "../../../../src/components/core/Checkbox/Checkbox";
import {useWallet} from "use-wallet";
import helper from "../../../../src/helpers";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import {useRouter} from "next/router";
import Tooltip from "../../../../src/components/core/Tooltip/Tooltip";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";


export default function Inbox(props) {
    const wallet = useWallet();
    const router = useRouter();
    const [messages, setMessages] = React.useState([]);
    const [select, setSelect] = React.useState(...Array(2).fill(false));
    const [project, setProject] = useState({});
    const {slug} = router.query;

    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        else {
            (async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
            })();
        }
    }, [props, slug]);

    useEffect(() => {

        const fetchMessages = async () => {
            if (wallet.account && project) {
                const result = await helper.messages.getMessages({project: project.slug});
                setMessages(result);
            }
        };
        fetchMessages();

    }, [wallet, project]);

    return (
        <ManagementAuthentication wallet={wallet} project={project}>


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
                    <div
                        className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition">
                        <i className="fa-solid fa-arrow-left text-xl"/>
                    </div>
                    <div
                        className="flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition">
                        <i className="fa-solid fa-arrow-right text-xl"/>
                    </div>
                    <div className="hidden md:flex text-gray-500 items-center">
                        Show&nbsp;<span className="text-black">1-25</span>&nbsp;of&nbsp;<span className="text-black">2290</span>
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="">
                {messages.map((message, index) => (
                    <Link href={{pathname: `/management/cloud-project/message/` + message.id}} key={index}>
                        <div className="flex p-4 gap-5 items-center hover:bg-gray-100/50 hover:cursor-pointer transition">
                            <div className="flex" onClick={(e) => e.stopPropagation()}>
                                <Checkbox initialValue={select[index]} setValue={() => {
                                }}/>
                            </div>
                            <div>
                                {message.recipient}
                            </div>
                            <div className="grow w-1 truncate">
                                {typeof window === 'undefined' ? "" : parse(DOMPurify.sanitize(message.subject))}
                            </div>
                            <div className="grow w-1 truncate relative">
                                {message.read_at ?

                                    <span className="relative  flex-row group">
                                        <i className="fa-solid fa-eye fa-xs text-slate-600"></i>
                                        <Tooltip className={'top-0 left-5 py-0.5'} title={moment(message.read_at).format("llll")}/>
                                    </span>

                                    :
                                    ' '
                                }
                            </div>
                            <div className="hidden md:flex">
                                {moment(message.sent_at).format("llll")}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </ManagementAuthentication>
    )
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}