import * as React from "react";
import InputSubmit from "./InputSubmit";
import {useState, useEffect, useCallback} from "react";
import {useWallet} from "use-wallet";
import helper from "../../../helpers";

export default function Input(props) {

    const wallet = useWallet();
    const [approved, setApproved] = useState(false);

    const fetchApproval = useCallback(async () => {
        const result = await getApprovedAmount(props.address, props.token);
        setApproved(result);
    },[props,approved]);

    useEffect(() => {
        if (props.address && props.token && wallet.isConnected()) fetchApproval();
    }, [props,fetchApproval,wallet]);

    const onChange = React.useCallback(
        (e) => {
            props.setValue(e.target.value);
        },
        [props]
    );

    const approve = useCallback(async (address, tokenAddress) => {
        const totalSupply = await helper.token.fetchTotalSupply(wallet, tokenAddress);
        await helper.token.approveCustomToken(wallet, address, totalSupply, tokenAddress);
        fetchApproval();
    },[wallet])

    const getApprovedAmount = useCallback(async (address, tokenAddress) => {
        const approvedAmount = await helper.token.fetchApprovedAmount(wallet, address, tokenAddress);
        return approvedAmount > 0
    },[wallet])

    return (
        <div className="flex shadow-sm items-center h-12.5 block w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5">
            <img src={props.image ? props.image : "/avatea-token.png"} className="w-6 h-6 mr-3.75"/>
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={onChange}
                className="block w-full bg-gray-100"
                placeholder={props.placeholder}
                disabled={!approved}
            />
            <InputSubmit
                name={approved ? props.submitName : 'Approve'}
                icon={approved ? props.icon : "fa-solid fa-handshake-simple"}
                submitFunction={approved ? props.submitFunction : e => {
                    approve(props.address, props.token)
                }}
            />
        </div>
    );
}
