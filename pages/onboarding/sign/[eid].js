import SignatureFrame from '@anvilco/react-signature-frame'
import React, {useEffect, useState} from 'react';
import NoSsr from "../../../src/components/NoSsr";
import {useRouter} from "next/router";

export default function SigningPage () {
    const router = useRouter();
    const { eid } = router.query;

    const [signURL, setsignURL] = useState('');

    useEffect(() => {
        if(eid) {
            const didMount = async () => {
                console.log(eid)
                const response = await fetch('/api/packet/sign', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        // clientUserId should be the signer’s ID in your system
                        clientUserId: 5,
                        signaturePacketEid: eid,
                    }),
                })
                const responseText = await response.text()
                console.log(responseText)
                const {url} = JSON.parse(responseText)
                setsignURL(url);
            }
            didMount();
        }

    },[eid])

        return (
            <NoSsr>
                <p>
                    Please review the documents and sign to complete
                    the onboarding process.
                </p>
                {
                    signURL ? <SignatureFrame
                        signURL={signURL}
                        onFinish={
                            (redirectURL) => window.location.assign(redirectURL)
                        }
                    /> : "One moment"
                }

            </NoSsr>
        )
}