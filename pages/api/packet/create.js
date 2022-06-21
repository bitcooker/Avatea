import Anvil from '@anvilco/anvil'
const apiKey = 'EtcKgKD81SbGDjn4ewlfV0LTsDXFp1YI'
const anvilClient = new Anvil({ apiKey })


const templateW4 = {
    id: 'sample',
    // castEid is also known as the 'PDF template ID'
    // found under the 'API Info' tab on the PDF template page
    castEid: 'y8jLGrpDEmOVzTmgGL7X',
}

const packetFiles = [ templateW4,templateW4]

const packetSigners = [
    {
        id: 'signer1',
        // Important! This tells Anvil that our app will be
        // notifying the signer when it is their turn to sign
        signerType: 'embedded',
        // Important! This tells Anvil to redirect to this URL
        // after the signer has completed their signatures
        redirectURL: '/onboarding/finish',
        // fields left undefined to be filled using webform input
        name: 'John Doe',
        email: 'uri@avatea.io',
        fields: [
            {
                fileId: 'templateW4',
                fieldId: 'employeeSignature',
            }
        ],
    }
]

const packetPrefillData = {
    templateW4: {
        data: {
            // fields left undefined to be filled using webform input
            firstName: 'Test',
            lastName: 'Test',
            address: 'Test',
            ssn: 'Test',
        },
    },
}

const variables = {
    files: packetFiles,
    signers: packetSigners,
    data: {
        payloads: {
            ...packetPrefillData,
        },
    },
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Extract the data submitted from the webform
        const {
            firstName, lastName, email, date, ssn, address,
        } = req.body


        // Fill in signer details
        variables.signers[0].name = firstName + lastName
        variables.signers[0].email = email


        // Enter the prefill data for the W4
        variables.data.payloads.templateW4.data = {
            firstName,
            lastName,
            address,
            ssn,
        }

        // Create the signature packet on the server
        const {
            statusCode, data, errors
        } = await anvilClient.createEtchPacket({ variables })

        console.log(data);
        // Pass the signature packet EID to the client-side
        // for new hire to sign the packet
        const signaturePacketEid = data.data.createEtchPacket.eid
        const signingPageURL = `/onboarding/sign/${signaturePacketEid}`
        res.status(200).json({ signingPageURL })
    }

    // res.status(200).json({ name: 'John Doe' })
}
