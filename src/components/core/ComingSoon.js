import Image from "next/image";
import CenteredContent from "./CenteredContent";

export default function ComingSoon(props){
    return(
        <>
            { process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? (
                <CenteredContent>
                    <span className={'text-2xl'}>This feature is coming soon</span>
                    <div className={'w-[50%] mx-auto'}>
                        <Image src={'/metamask.gif'} alt="" layout={'responsive'} height={200} width={200} objectFit={'contain'}/>
                    </div>
                    {/*<Button handleClick={() => setTab(0)}>Return to project</Button>*/}
                </CenteredContent>
            ) : (props.children)}
        </>

    )
}