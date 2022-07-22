import * as React from "react";
import Image from "next/image";

export default function Footer(props) {
    return (
        <footer className="flex flex-col gap-5 -ml-[15px] -mr-[15px] -mb-5 lg-xl:-ml-8 lg-xl:-mr-5 lg-xl:-mb-5 items-center justify-center p-10 bg-white mt-5">
            <div className="flex flex-col text-center gap-3">
                <Image src="/logo.svg" alt="logo" width={120} height={20} />
                <p className="font-bold">
                    Mercor Finance
                </p> 
            </div> 
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <i className="fa-brands fa-linkedin text-xl" />
                    </a>
                    <a>
                        <i className="fa-brands fa-facebook-f text-xl" />
                    </a>
                    <a>
                        <i className="fa-brands fa-twitter text-xl" />
                    </a>
                    <a>
                        <i className="fa-brands fa-reddit text-xl" />
                    </a>
                    <a>
                        <i className="fa-brands fa-telegram text-xl" />
                    </a>
                    <a>
                        <i className="fa-brands fa-discord text-xl" />
                    </a>
                    <a>
                        <i className="fa-brands fa-facebook-f text-xl" />
                    </a>
                    <a>
                        <i className="fa-brands fa-medium text-xl" />
                    </a>
                </div>
            </div>
            <p>Copyright © 2022 - All right reserved</p>
        </footer>
    )
}