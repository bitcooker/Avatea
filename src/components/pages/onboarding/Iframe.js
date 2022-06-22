import {useEffect} from "react";

const HS_CONTAINER_ID = "hellosign-embedded";
import Button from "../../core/Button/Button";

export default function Iframe({projects}) {


    useEffect(() => {
        if (!window.HelloSign) {
            const script = document.createElement("script");
            script.src = "https://s3.amazonaws.com/cdn.hellosign.com/public/js/hellosign-embedded.LATEST.min.js";
            script.async = true;
            script.type = 'text/javascript';

            // Get the settings and add the container if needed
            const settings = {
                url: "https://app.hellosign.com/editor/embeddedSign?signature_id=b88698569ba8e6926ecb4be93907594a&token=474178b3977b845f46e17e388cf56f9e",
                uxVersion: 2,
                debug: true,
                allowCancel: true,
                inContainer: false,
                skipDomainVerification: true,
                clientId: 'eeb7e20b9704f245baa10d5582c15a95',
                testMode:true
            };
            if (settings.inContainer) {
                settings.container = document.getElementById(HS_CONTAINER_ID);
            }

            script.onload = () => {
                window.HelloSign.init(settings.clientId);
                window.HelloSign.open(settings);
            };
            document.body.appendChild(script);
        }
    },[])

    // const openDocument = () => {
    //     const client = new HelloSign({
    //         clientId: "e8bef94dd5a2e23cf4e32bfd9de4fd4a"
    //     });
    //
    //     client.open("https://app.hellosign.com/editor/embeddedSign?signature_id=7da89419779aa4022e535c8bd153dfcc&token=982080e6c4f2674ac6b2e4aa44476da0", {
    //         testMode: true
    //     });
    // }

    return (
        <div>
            <div className="index">
                <div id={HS_CONTAINER_ID}></div>
                {/*<Button name="sign me" handleClick={openDocument}></Button>*/}

            </div>
        </div>
    )

}
