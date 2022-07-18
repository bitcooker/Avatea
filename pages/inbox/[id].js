import * as React from "react";
import {useEffect} from "react";
import {useRouter} from "next/router";
import moment from "moment";
import {useWallet} from "use-wallet";
import helper from "../../src/helpers";
import Button from "../../src/components/core/Button/Button";
import Swal from "sweetalert2";

export default function InboxDetail() {
    const router = useRouter();

    const wallet = useWallet();
    const [message, setMessage] = React.useState({});
    const {id} = router.query;

    useEffect(() => {
        if (id) {
            const fetchMessage = async () => {
                const result = await helper.messages.getMessage({wallet, id});
                if (wallet.account === result.recipient) {
                    setMessage(result);
                }
            };
            fetchMessage();
        }
    }, [id]);

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
        <div className="flex flex-col gap-5 p-4 md:p-10 h-[70vh] md:h-[80vh] bg-white rounded-2.5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="relative flex w-full md-lg:w-fit items-center justify-center gap-5">
                    <div
                        className="absolute left-0 flex items-center justify-center p-2 text-indigo-500 hover:text-indigo-800 rounded-md hover:bg-indigo-500/10 hover:cursor-pointer transition"
                        onClick={() => router.back()}>
                        <i className="fa-solid fa-arrow-left text-xl"/>
                    </div>
                    <h1 className="text-2xl md-lg:pl-10">
                        {message.subject}
                    </h1>
                </div>
                <span>
                    {moment(message.sent_at).format("llll")}
                </span>
            </div>
            {message.body}
            <Button handleClick={() => deleteMessage()} name="Delete Message"/>
        </div>
    )
}