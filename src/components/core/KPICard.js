import Image from "next/image";
import CountUp from "react-countup";

export default function KPICard(props) {
    return(
        <div className="px-10 py-5 border-gray-300 ">
            <div className="text-center">
                <Image src={props.image} alt="projectImage" width={30} height={30}/>

                <p className="font-bold text-3xl">
                    <CountUp start={0} end={props.end} />
                </p>

                <div className={'flex justify-center mt-1'}>
                    <p className="text-sm uppercase tracking-widest"> {props.label}</p>
                </div>

            </div>

        </div>

    )
}