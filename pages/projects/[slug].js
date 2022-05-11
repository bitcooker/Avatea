import axios from 'axios';
import {useWallet} from "use-wallet";
import {useState, useEffect} from "react";
import { useRouter } from 'next/router'


export default function ProjectDetail() {

    const router = useRouter()
    const { slug } = router.query


    const wallet = useWallet();

    return (
        <div>
            <h1>Project Detail page {slug}</h1>
        </div>
    )
}

ProjectDetail.getInitialProps = async (ctx) => {
    console.log(ctx);
    // const res = await fetch('https://api.github.com/repos/vercel/next.js')
    // const json = await res.json()
     return { test: 'test' }
}