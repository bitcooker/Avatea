// import HelloSign from 'hellosign-embedded';
import helper from "../../src/helpers";
import Button from "../../src/components/core/Button/Button";


export default function Iframe({projects}) {

    const openDocument = () => {
        import("hellosign-embedded").then(({default: HelloSign}) => {
            return new HelloSign()
        }).then(client => {
            let signUrl = 'https://app.hellosign.com/sign/ab82497c2b1473772c2b5157a65de83710a0ca45'
            client.open(signUrl, {
                clientId: 'eeb7e20b9704f245baa10d5582c15a95',
                skipDomainVerification: true,
                testMode: true
            });
        })
    }

    return (
        <div>
            <div className="index">

                <Button name="sign me" handleClick={openDocument}></Button>

            </div>
        </div>
    )

}


// export async function getServerSideProps(context) {
//     const client = new HelloSign();
//     let signUrl = 'https://app.hellosign.com/sign/ab82497c2b1473772c2b5157a65de83710a0ca45'
//     client.open(signUrl, {
//         clientId: 'eeb7e20b9704f245baa10d5582c15a95'
//     });
// }
