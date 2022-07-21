import * as React from "react";
import {useEffect, useState} from "react";
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

// core components
import InputEmpty from "../../../../src/components/core/Input/InputEmpty"
import ButtonFit from "../../../../src/components/core/Button/ButtonFit"
import {useRouter} from "next/router";
import {API_URL} from "../../../../src/helpers/constants";
import axios from "axios";
import helpers from "../../../../src/helpers";
import {useWallet} from "use-wallet";
import RichEditor from "../../../../src/components/core/RichEditor/RichEditor";
import Swal from "sweetalert2";
import helper from "../../../../src/helpers";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";


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

export default function Mail(props) {
    const [treeData, setTreeData] = React.useState([]);
    const [addresses, setAddresses] = useState([]);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [project, setProject] = useState({});
    const wallet = useWallet();
    const router = useRouter();
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
        (async () => {
            const result = await axios.get(`${API_URL}Project/${slug}/get_addresses/`);
            let tree = [];
            convertDataToTree(tree, result.data.data);
            setTreeData(tree);
        })()
    }, [slug])


    const onChange = React.useCallback(async (currentNode, selectedNodes) => {
        let addresses = []
        selectedNodes.forEach(function (item, index) {
            addresses = [...addresses, ...item.addresses];
        });
        const unique = [...new Set(addresses)];
        setAddresses(unique)
    }, [])

    const onAction = React.useCallback((node, action) => {
    }, [])

    const onNodeToggle = React.useCallback(currentNode => {
    }, [])

    const sendMessage = async () => {
        let success = await helpers.messages.createMessage({
            wallet,
            subject: title,
            body: content,
            user_addresses: addresses,
            project: slug
        })
        if (success) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "The messages have been sent",
                showConfirmButton: false,
                timer: 3000,
                didClose() {
                    router.push(`/management/${slug}/message/history`);
                },
            });
        }
    }

    const DropdownTreeSelectMemo = React.useMemo(() => {
        return <DropdownTreeSelect data={treeData} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle}/>
    }, [onAction, onChange, onNodeToggle, treeData])


    return (
        <ManagementAuthentication project={project} wallet={wallet}>
        <div className="flex flex-col min-h-[85vh] p-5 rounded-2.5xl bg-white gap-3.5">
            <div className="flex flex-col gap-3">
                <span>To {addresses.length > 0 && '(' + addresses.length + ' addresses)'}</span>
                {DropdownTreeSelectMemo}
            </div>

            <div className="flex flex-col gap-3">
                <span>Title</span>
                <InputEmpty id="title" name="title" type="text" placeholder="Please enter title" value={title} setValue={setTitle}/>
            </div>

            <div className="grow flex flex-col gap-3">
                <span>Content</span>
                <RichEditor value={content} setValue={setContent}/>
            </div>

            <div className="flex justify-end">
                <ButtonFit handleClick={() => sendMessage()} name="Send" icon="fa-solid fa-paper-plane"/>
            </div>
        </div>
        </ManagementAuthentication>
    )
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}