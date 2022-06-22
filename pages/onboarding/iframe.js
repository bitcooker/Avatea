import NoSsr from "../../src/components/NoSsr";
import Iframe from "../../src/components/pages/onboarding/Iframe";



export default function Page() {
    return(
        <NoSsr>
            <Iframe/>
        </NoSsr>
    )
}


// export async function getServerSideProps(context) {
//     const client = new HelloSign();
//     let signUrl = 'https://app.hellosign.com/sign/ab82497c2b1473772c2b5157a65de83710a0ca45'
//     client.open(signUrl, {
//         clientId: 'eeb7e20b9704f245baa10d5582c15a95'
//     });
// }
