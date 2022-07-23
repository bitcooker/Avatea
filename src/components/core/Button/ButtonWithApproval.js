import {Loading} from "../../SVG";
import {useWallet} from "@albs1/use-wallet";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import helper from "../../../helpers";
import {ethers} from "ethers";

export default function ButtonWithApproval(props) {


    const wallet = useWallet();
    const [approved, setApproved] = useState(false);


    useEffect(() => {
        if (props.address && props.token && wallet.isConnected()) fetchApproval();
    }, [props, fetchApproval, wallet]);

    const onChange = React.useCallback(
        (e) => {
            props.setValue(e.target.value);
        },
        [props]
    );

    const getApprovedAmount = useCallback(async (address, tokenAddress) => {
        const approvedAmount = await helper.token.fetchApprovedAmount(wallet, address, tokenAddress);
        return approvedAmount > 0
    }, [wallet])

    const fetchApproval = useCallback(async () => {
        const result = await getApprovedAmount(props.address, props.token);
        setApproved(result);
    }, [props, getApprovedAmount]);

    const approve = useCallback(async (address, tokenAddress) => {
        const amountInWei = await ethers.utils.parseEther(props.amount.toString());
        await helper.token.approveCustomToken(wallet, address, amountInWei, tokenAddress);
        await fetchApproval();
    }, [wallet, fetchApproval])

    return (
        <button
            className={`disabled:bg-indigo-500/50 flex justify-center items-center w-full h-10 bg-indigo-500 text-white rounded-full hover:bg-indigo-500/80 transition  ${props.className ? props.className : ''}`}
            onClick={approved ? props.handleClick : e => {
                approve(props.address, props.token)
            }}
            disabled={props.disabled ? props.disabled : false}
        >
            {props.isLoading && Loading}
            {approved ? props.name : 'Approve '}
            {props.amount + ' ' + props.ticker}
            {props.children}
        </button>
    );
}
