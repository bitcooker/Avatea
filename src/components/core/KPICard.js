import Image from "next/image";
import React from "react";

// core components
import CounterUp from "./CounterUp/CounterUp";

export default function KPICard(props) {

    return (
        <div className="px-10 py-5 border-gray-300 ">
            <div className="text-center">
                {props.image &&
                    <Image src={props.image} alt="projectImage" width={30} height={30}/>
                }
                {props.images &&
                    <div className={'space-x-2'}>
                        {
                            props.images.map((image, index) => {
                                    return <span key={index}>
                                            <Image src={image} alt="projectImage" width={30} height={30}/>
                                    </span>
                                }
                            )
                        }

                    </div>
                }

                {props.end ?
                    <div className="flex items-center justify-center font-bold text-2xl">
                        {
                            props?.disableCount ? props.end.toFixed(2) : <CounterUp end={props.end}/>
                        }
                        {props.postFix}
                    </div>
                    :
                    <div className="flex items-center justify-center font-bold text-2xl">
                        {props.postFix ? props.postFix : 0}
                    </div>
                }

                <div className={'flex justify-center mt-1'}>
                    <p className="text-xs uppercase tracking-wide"> {props.label}</p>
                </div>

            </div>

        </div>

    )
}