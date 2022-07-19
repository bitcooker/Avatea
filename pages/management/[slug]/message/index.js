import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

// core components
import InputEmpty from "../../../../src/components/core/Input/InputEmpty"
import TextArea from "../../../../src/components/core/TextArea/TextArea"
import ButtonFit from "../../../../src/components/core/Button/ButtonFit"
import {useRouter} from "next/router";
import {API_URL} from "../../../../src/helpers/constants";
import axios from "axios";
import helpers from "../../../../src/helpers";
import {useWallet} from "use-wallet";

export default function Mail(props) {
    const [data, setData] = useState([]);
    const [addressDict, setAddressDict] = useState({});
    const treeData = [];
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [selectedNodeKeys, setSelectedNodeKeys] = useState([]);
    const wallet = useWallet();
    const router = useRouter();
    const {slug} = router.query;

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${API_URL}Project/${slug}/get_addresses/`);
            setData(result.data.data);
        })()
    }, [slug])


    // const onChange = React.useCallback((currentNode, selectedNodes) => {
    //     // console.log('onChange::', currentNode, selectedNodes)
    //     if (currentNode.checked) {
    //         let dict = addressDict
    //         dict[currentNode.value] = currentNode.addresses
    //         console.log(dict)
    //
    //         setAddressDict(dict)
    //     }
    // }, [])


    useEffect(() => {
        console.log('hmmmm')

    }, [addressDict])

    const onChange = useCallback(async (currentNode, selectedNodes) => {
          if (currentNode.checked) {
            let dict = addressDict
            dict[currentNode.value] = currentNode.addresses
            await setAddressDict(dict)
        }
},[addressDict])

    const onAction = React.useCallback((node, action) => {
        console.log('onAction::', action, node)
    }, [])

    const onNodeToggle = React.useCallback(currentNode => {
        console.log('onNodeToggle::', currentNode)
    }, [])


    const get_addresses = (data, addresses) => {
        if (Array.isArray(data)) {
            addresses.push(...data)
        } else {

            for (const key in data) {
                if (Array.isArray(data[key])) {
                    addresses.push(...data[key])
                } else {
                    addresses = get_addresses(data[key], addresses)
                }
            }
        }
        return addresses
    }

    const convertDataToTree = (tree, data) => {
        if (Array.isArray(data)) {
            return
        }
        let i = 0;
        for (const key in data) {
            tree[i] = {
                label: key,
                value: key,
                children: [],
                addresses: get_addresses(data[key], [])
            }
            convertDataToTree(tree[i].children, data[key])
            i++;
        }
    }


    const sendMessage = async () => {
        await helpers.messages.createMessage({
            wallet,
            subject: title,
            body: content,
            user_addresses: selectedNodeKeys,
            project: slug
        })
    }


        convertDataToTree(treeData, data);

    return (
        <div className="flex flex-col min-h-[85vh] p-5 rounded-2.5xl bg-white gap-3.5">
            <div className="flex flex-col gap-3">
                <span>To</span>
                <DropdownTreeSelect data={treeData} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle}/>
            </div>

            <div className="flex flex-col gap-3">
                <span>Title</span>
                <InputEmpty id="title" name="title" type="text" placeholder="Please enter title" value={title} setValue={setTitle}/>
            </div>

            <div className="grow flex flex-col gap-3">
                <span>Content</span>
                <TextArea id="content" name="content" value={content} setValue={setContent} placeholder="Please enter content" classNames="grow"/>
            </div>

            <div className="flex justify-end">
                <ButtonFit handleClick={() => sendMessage()} name="Send" icon="fa-solid fa-paper-plane"/>
            </div>
        </div>
    )
}