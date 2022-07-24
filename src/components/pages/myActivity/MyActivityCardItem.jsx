import * as React from "react";
import Image from "next/image";
import Link from "next/link";

// core components
import Spinner from "../../../components/core/Spinner";

const badgeColors = {
    "vested": "bg-lime-500",
    "invested": "bg-fuchsia-500",
    "vault": "bg-indigo-500",
    "liquidity": "bg-sky-500"

}

export default function MyActivityCardItem(props) {
    return  <div className="rounded-2.5xl overflow-hidden transition-all delay-200 hover:shadow-sm">
                <CardContent project={props.slug} name={props.name} image={props.banner} tokenImage={props.image} type={props.type}/>
            </div>
}

export const CardContent = (props) => {
    const [imgLoaded, setImgLoaded] = React.useState(false);

    const handleImageLoad = (event) => {
      const target = event.target;
      if (target.complete) {
        setTimeout(() => setImgLoaded(true), 2000);
      }
    };

  return (
    <Link href={`/projects/${props.project}`}>
        <div className={`relative flex flex-col w-full justify-center bg-white hover:cursor-pointer transition`}>
            {!imgLoaded && (
                <div className="absolute flex w-full justify-center"><Spinner size={5}/></div>
            )}
            <Image 
                src={props.image} 
                alt={props.project}
                onLoad={handleImageLoad}
                className={`w-full ${!imgLoaded && 'opacity-0'}`} 
                layout="responsive"
                width="100%"
                height={50}
            />
            <div className={`absolute right-3 bottom-7 w-10 h-10 bg-white p-1 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.08)] ${!imgLoaded && 'opacity-0'}`}>
                <Image src={props.tokenImage} alt="tokenImage" className="w-full h-full" layout="responsive" width="100%" height="100%"/>
            </div>
            {props.type && 
                <div className="absolute w-full flex flex-row items-center justify-end top-5 space-x-1 px-2">
                    {props.type.map((type, index) => 
                        <div className={`flex items-center justify-center text-white capitalize w-20 h-5 rounded-full mb-1 ${badgeColors[type]}`} key={index}>
                            {type}
                        </div>)
                    }
                </div>
            }
            <h1 className="text-base p-3">{props.name}</h1>
        </div>
    </Link>
  );
};