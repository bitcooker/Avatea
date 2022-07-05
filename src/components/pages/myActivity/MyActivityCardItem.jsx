import * as React from "react";
import Image from "next/image";
import Link from "next/link";

// core components
import Spinner from "../../../components/core/Spinner";

export default function MyActivityCardItem(props) {
    return <div key={props.key} className="rounded-2.5xl bg-white overflow-hidden transition hover:shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
        <CardContent project={props.project} image={props.banner} tokenImage={props.image} id={props.slug} />
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
        <div className={`relative flex flex-col w-full justify-center bg-white hover:cursor-pointer hover:blur-[2px] transition`}>
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
            <div className={`absolute right-3 bottom-3 w-10 h-10 bg-white/20 p-1 rounded-md ${!imgLoaded && 'opacity-0'}`}>
                <Image src={props.tokenImage} alt="tokenImage" className="w-full h-full" layout="responsive" width="100%" height="100%"/>
            </div>
        </div>
    </Link>
  );
};