const hellosign = require('hellosign-sdk')({key: process.env.HELLOSIGN_API_KEY});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Extract the data submitted from the webform
        const {
            firstName, lastName, email, date, ssn, address,
        } = req.body


        const signers = [
            {
                email_address : 'uri@avatea.io',
                name : 'George',
                role : 'signer',
                pin: '1234'
            }
        ]

        const options = {
            test_mode : 1,
            template_id : 'ab124575fe93962d99d509f994cb58c73a112be0',
            subject : 'Purchase Order',
            message : 'Glad we could come to an agreement.',
            signers : signers,
            custom_fields: [
                {
                    name: "name",
                    value: "Habiba",
                    // editor: "Signer",
                    // required: true
                }
            ]
        };

        try {
           const result = await hellosign.signatureRequest.sendWithTemplate(options);
            res.status(200).json(result)
        } catch(e) {
            res.status(500).json(e)
        }
    }

}
