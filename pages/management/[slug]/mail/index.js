import * as React from "react";
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

// core components
import InputEmpty from "../../../../src/components/core/Input/InputEmpty"
import TextArea from "../../../../src/components/core/TextArea/TextArea"
import ButtonFit from "../../../../src/components/core/Button/ButtonFit"

const data = {
    "vesting_batches": {
        "seed": [],
        "asdas`d": [
            "0xBC259BeA7E6728BFb12addA6c3a0cA6cD69224Df"
        ],
        "test 2 ": [
            "0xdb8ebd7399A6ee7c1D02f4C742f70D02058b7596"
        ],
        "test 3 ": [],
        "seed round for tom": [
            "0x80aa8D8dF9BC58E744bd1f1eff3ac360A00C32AD"
        ]
    },
    "market_making_pools": {
        "Cloud Project - network: 4": {
            "invested": [
                "0x80aa8D8dF9BC58E744bd1f1eff3ac360A00C32AD",
                "0x0000000000000000000000000000000000000000",
                "0xB904182e811637194110211cC593Bdea58B6E97A",
                "0x35a7d4855beFB6eeB37782106ca3CFC5eA744c07"
            ],
            "vested": [
                "0x80aa8D8dF9BC58E744bd1f1eff3ac360A00C32AD",
                "0x0000000000000000000000000000000000000000",
                "0xB904182e811637194110211cC593Bdea58B6E97A",
                "0x35a7d4855beFB6eeB37782106ca3CFC5eA744c07"
            ]
        }
    },
    "vault": [
        "0x4Bc5209c64028a32aD5b1054c82798795aA3314b",
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0x429B6B065B779143dF34D05fEFacc35e6882b510",
        "0xE54141f57caFca59165507Ce927FB29581cc87c2",
        "0x804B394FA37DA23AC5800609e7e70E8787261dd0",
        "0x105764137e7Cd5ed005d5a0f09FE7CcdD9CAba6D",
        "0xb991962057e4988Faf193F12eE99Ef9A9C33cA7E",
        "0x55E9f75D4AB2A2b106340b43Bf3B0b38a4599b48",
        "0x6f9093fFf1ea19e63b10e586396B236Bb4B85888",
        "0x3F97742591648DBdf0C707b0A95077DD2E7827f0",
        "0x50a5EbdBdF8bb21847009C078aD77929994c9106",
        "0x96A68b7f7f9724F5612c19e0b3bC292Dc6F6c3AB",
        "0xEE7348AB4eb0ed8252735840D8451eBe93974D28",
        "0xB904182e811637194110211cC593Bdea58B6E97A",
        "0xcBfc067262A5219dfDc0DB2d9b8FCF947260E95e",
        "0xdc78D29CAbC1A66a2CbE02b21962DEf43397aaC7",
        "0xAdE9B1662b7b8fc7f579C95F8E16a284226E6f07",
        "0x6E446748E38760C3e2BCa92354B9bFDcDeeC36d0",
        "0x38e223F28F33ea3d119d9bAbBcAF294BE2821121",
        "0xDFaF195151aF3AA0bd31fa339861EdFd63Ba1D7D",
        "0x7eF751f1B292C056867622d5409C19D6f034B8e4",
        "0xd473A66151A5B9eaf13cfdab43852F229d767525",
        "0x18F3BFA7c9b03334725756F47B7d011a0f511f5A",
        "0x3390980578E25c6749c60f37a2E193C13037740d",
        "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        "[",
        "0x8E9A504B0c3b35D44B1bB109Cd033EB50e1106Bd",
        "0x35a7d4855beFB6eeB37782106ca3CFC5eA744c07",
        "0xf7932a8056478b9a7BEA75075780388597493362",
        "0x58353208A51b0A358675c69BDF69B79F983e29B5",
        "0xe5758a698680a84E54CCEd0E624bb9B82c3B6b65",
        "0x5B45742aDD89fD3EE71650Ac90d9402419Fe7e65",
        "0xc0901d3ffF2bfd0d5b5D9eB0B0048Acca2012133",
        "0x95337Fb206C03F3E3CE12045e2316E5ef408c907"
    ],
    "liquidity_maker": [
        "0xf22A105138Af21404BF36bb92DDbA482c7f3e202",
        "0x429B6B065B779143dF34D05fEFacc35e6882b510",
        "0xe1631fFF0cdac44227edfa7FCaA5439a9279E771",
        "0xE54141f57caFca59165507Ce927FB29581cc87c2"
    ]
}
const treeData = [];

const convertDataToTree = (tree, data) => {
    if(Array.isArray(data)) {
        return
    }
    let i = 0;
    for(const key in data) {
        tree[i] = {
            label: key,
            value: key,
            children: []
        }
        convertDataToTree(tree[i].children, data[key])
        i++;
    }
}

convertDataToTree(treeData, data);

export default function Mail(props) {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const onChange = React.useCallback((currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
    }, [])

    const onAction = React.useCallback((node, action) => {
        console.log('onAction::', action, node)
    }, [])

    const onNodeToggle = React.useCallback(currentNode => {
        console.log('onNodeToggle::', currentNode)
    }, [])

    return (
        <div className="flex flex-col min-h-[85vh] p-5 rounded-2.5xl bg-white gap-3.5">
            <div className="flex flex-col gap-3">
                <span>To</span>
                <DropdownTreeSelect data={treeData} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
            </div>

            <div className="flex flex-col gap-3">
                <span>Title</span>
                <InputEmpty id="title" name="title" type="text" placeholder="Please enter title" value={title} setValue={setTitle} />
            </div>

            <div className="grow flex flex-col gap-3">
                <span>Content</span>
                <TextArea id="content" name="content" value={content} setValue={setContent} placeholder="Please enter content" classNames="grow" />
            </div>

            <div className="flex justify-end">
                <ButtonFit name="Send" icon="fa-solid fa-paper-plane" />
            </div>
        </div>
    )
}