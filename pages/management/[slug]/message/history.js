import * as React from "react";
import {useEffect, useState} from "react";
import Link from "next/link";
import moment from "moment";

// core components
import Checkbox from "../../../../src/components/core/Checkbox/Checkbox";
import {useWallet} from "@albs1/use-wallet";
import helper from "../../../../src/helpers";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import {useRouter} from "next/router";
import Tooltip from "../../../../src/components/core/Tooltip/Tooltip";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";


export default function Inbox(props) {
    const wallet = useWallet();
    const router = useRouter();

    const [disableNextButton, setDisableNextButton] = React.useState(false);
    const [disablePrevButton, setDisablePrevButton] = React.useState(true);
    const [messages, setMessages] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [project, setProject] = useState({});
    const {slug} = router.query;

    const totalPages = Math.floor(messages.length / 10) + 1;

    const handleNext = React.useCallback(() => {
        if(currentPage == totalPages) {
            return;
        }
        if(currentPage + 1 == totalPages) {
            setDisableNextButton(true);
            setDisablePrevButton(false);
        } else {
            setDisableNextButton(false);
            setDisablePrevButton(false);
        }
        setCurrentPage(currentPage + 1);
        if(currentPage + 1 === totalPages + 1) {
            setDisableNextButton(true);
            setDisablePrevButton(false);
        }
    }, [currentPage, totalPages])

    const handlePrev = React.useCallback(() => {
        if(currentPage == 1) {
            return;
        }
        if(currentPage - 1 == 1) {
            setDisableNextButton(false);
            setDisablePrevButton(true);
        } else {
            setDisableNextButton(false);
            setDisablePrevButton(false);
        }
        setCurrentPage(currentPage - 1);
        if(currentPage - 1 == 0) {
            setDisablePrevButton(true);
            setDisableNextButton(false);
        }
    }, [currentPage])

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

    const Messages = React.useMemo(() => {
        const currentMessages = messages.filter((message, index) => index >= (currentPage - 1) * 10 && index < currentPage * 10 )
        return currentMessages.length ? currentMessages.map((message, index) => (
            <Link href={{pathname: `/management/cloud-project/message/` + message.id}} key={index}>
            <div className="flex p-4 gap-5 items-center hover:bg-gray-100/50 hover:cursor-pointer transition">
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
        )) : <></>
    }, [currentPage, messages])

    const pageBar = React.useMemo(() => {
        return <div>Show&nbsp;<span className="text-black">{(currentPage - 1) * 10 + 1} - {(currentPage == totalPages ? messages.length : (currentPage * 10))}</span>&nbsp;of&nbsp;<span className="text-black">{messages.length}</span></div>
    }, [currentPage, totalPages, messages.length])

    return (
        <ManagementAuthentication wallet={wallet} project={project}>

            <div className="flex flex-row items-center justify-between mb-5">
                <h1 className="text-2xl">History</h1>
                <div className="absolute w-full -bottom-16 md-lg:w-fit md-lg:static">
                    <div className={'grid grid-cols-2 gap-2.5'}>
                        <ButtonOutlineFit name="Back" icon="fa-regular fa-arrow-left" handleClick={() => router.back()}/>

                        <ButtonFit handleClick={() => router.push(`/management/${slug}/message`)}>
                            <div className="flex items-center gap-2" >
                                <i className={'fa-solid fa-plus'}/>
                                <span className="hidden md-lg:block"> New Message </span>
                                <span className="inline-block md-lg:hidden"> New </span>
                            </div>
                        </ButtonFit>
                    </div>
                </div>
            </div>

        <div className="rounded-2.5xl bg-white overflow-hidden">
            {/* Header */}
            <div className="flex justify-between p-4 border-b">
                <div></div>
                <div className="flex items-center space-x-3">
                    <div
                        className={`flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer ${disablePrevButton ? 'text-gray-300 hover:bg-white hover:text-gray-300 hover:cursor-not-allowed' : ''} transition`} onClick={handlePrev}>
                        <i className="fa-solid fa-arrow-left text-xl"/>
                    </div>
                    <div
                        className={`flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer ${disableNextButton ? 'text-gray-300 hover:bg-white hover:text-gray-300 hover:cursor-not-allowed' : ''} transition`} onClick={handleNext}>
                        <i className="fa-solid fa-arrow-right text-xl"/>
                    </div>
                    <div className="hidden md:flex text-gray-500 items-center">
                        {pageBar}
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="">
                {Messages}
            </div>
        </div>
        </ManagementAuthentication>
    )
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}