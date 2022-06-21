import SignatureFrame from '@anvilco/react-signature-frame'
import React from 'react';
import NoSsr from "../../src/components/NoSsr";


export default  class SigningPage extends React.Component {
    state = { signURL: null }

    async componentDidMount () {
        const response = await fetch('/api/packet/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // clientUserId should be the signer’s ID in your system
                clientUserId: 5,
                signaturePacketEid: req.params.signaturePacketEid,
            }),
        })
        const responseText = await response.text()
        const { url } = JSON.parse(responseText)
        this.setState({ signURL: url })
    }

    render () {
        return (
            <NoSsr>
                <p>
                    Please review the documents and sign to complete
                    the onboarding process.
                </p>
                <SignatureFrame
                    signURL={this.state.signURL}
                    onFinish={
                        (redirectURL) => window.location.assign(redirectURL)
                    }
                />
            </NoSsr>
        )
    }
}