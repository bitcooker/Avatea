import Anvil from '@anvilco/anvil'
const apiKey = 'EtcKgKD81SbGDjn4ewlfV0LTsDXFp1YI'
const anvilClient = new Anvil({ apiKey })


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { signaturePacketEid, clientUserId } = req.body
        const {data} = await anvilClient.getEtchPacket({
            variables: { eid: signaturePacketEid },
        })


        // We only have 1 signer for this signature packet
        console.log(data.data.etchPacket);
        // const signers = data.data.etchPacket.documentGroup.signers
        // const signerEid = signers[0].eid

        // The signing URL generated here is used to
        // embed the signing page into our app
        const result = await anvilClient.generateEtchSignUrl({
            variables: {
                clientUserId: String(clientUserId),
                signerEid: "1"
            }
        })
        console.log(result)
        res.status(200).json({ res })
    }
}