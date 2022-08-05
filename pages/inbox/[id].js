import * as React from "react";
import {useEffect} from "react";
import {useRouter} from "next/router";
import moment from "moment";
import {useWallet} from "@albs1/use-wallet";
import helper from "../../src/helpers";
import Button from "../../src/components/core/Button/Button";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import ConnectYourWallet from "../../src/components/core/ConnectYourWallet";

export default function InboxDetail() {
    const router = useRouter();

    const wallet = useWallet();
    const [message, setMessage] = React.useState({});
    const {id} = router.query;

    useEffect(() => {
        if (id) {
            const fetchMessage = async () => {
                const result = await helper.messages.readMessage({wallet, id});
                if (wallet.account === result.recipient) {
                    setMessage(result);
                }
            };
            fetchMessage();
        }
    }, [wallet, id]);

    const deleteMessage = async () => {
        const result = await helper.messages.markMessageAsDeleted({wallet, id});
        if (result) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "The message has been deleted",
                showConfirmButton: false,
                timer: 3000,
                didClose() {
                    router.push(`/inbox`);
                },
            });
        }
    };

    return (
        <>
            {
                wallet.status === "connected" ? (
                        <div className="flex flex-col gap-5 p-4 md:p-10 min-h-[65vh] bg-white rounded-2.5xl">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row items-center justify-between leading-7">
                                <div className="relative flex w-full md-lg:w-fit items-center justify-center gap-5">
                                    <div
                                        className="absolute left-0 flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition"
                                        onClick={() => router.back()}>
                                        <i className="fa-solid fa-arrow-left text-xl"/>
                                    </div>
                                    <h1 className="text-xl md-lg:pl-10">
                                        {typeof window === 'undefined' || !message.subject ? <div className="animate-pulse w-60 h-7 rounded-md bg-gray-200"></div> : parse(DOMPurify.sanitize(message.subject))}
                                    </h1>
                                </div>
                                <span className="w-full md-lg:w-fit h-7 flex items-center justify-center">
                    {!message.sent_at ? <div className="animate-pulse w-40 h-4 rounded-md bg-gray-200"></div> : moment(message.sent_at).format("llll")}
                </span>
                            </div>
                            <div className="grow p-5">
                                {typeof window === 'undefined' ? "" : parse(DOMPurify.sanitize(message.body))}
                            </div>

                            <Button handleClick={() => deleteMessage()} name="Delete Message"/>
                        </div>
                ) : <ConnectYourWallet/>
            }
        </>

    )
}