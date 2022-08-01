import * as React from "react";
import { useRouter } from 'next/router'

export default function SuccessModal(props) {
    const router = useRouter();

    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
        setTimeout(() => {
            props.setShow(false);
            if(props.option.redirectURL) {
                router.push(props.redirectURL);
            }
        }, props.option.timer ?? 3000);
    }, [props, router]);
    
    return (
        <div className={`fixed w-[100vw] h-[100vh] top-0 left-0 px-5 backdrop-blur-sm md-lg:px-60 overflow-y-auto md-lg:overflow-y-hidden z-[80] ${props.show ? 'block' : 'hidden'}`}>
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex items-center justify-center w-[500px] h-[500px] bg-transparent rounded-2.5xl px-5" onClick={(e) => e.stopPropagation()}>
                    <lottie-player
                        autoplay
                        loop={props.option.isLoop}
                        mode="normal"
                        src={props.option.lottieUrl}
                        style={{ width: "300px", height: "300px" }}
                    >
                    </lottie-player>
                </div>
            </div>
        </div>
    )
}