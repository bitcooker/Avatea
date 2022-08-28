import Image from "next/image";
import CountUp from "react-countup";

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
                            props.images.map((image,index) => {
                                    return <span key={index} >
                                            <Image src={image} alt="projectImage" width={30} height={30}/>
                                    </span>
                                }
                            )
                        }

                    </div>
                }
                <p className="font-bold text-3xl">
                    <CountUp start={0} end={props.end}/> {props.postFix}
                </p>

                <div className={'flex justify-center mt-1'}>
                    <p className="text-xs uppercase tracking-wide"> {props.label}</p>
                </div>

            </div>

        </div>

    )
}