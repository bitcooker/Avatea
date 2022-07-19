import Image from "next/image";
import CenteredContent from "./CenteredContent";

export default function ConnectYourWallet(){
    return(
        <CenteredContent>
            <span className={'text-2xl'}>Please connect your wallet</span>
            <div className={'w-[50%] mx-auto'}>
                <Image src={'/metamask.gif'} alt="" layout={'responsive'} height={200} width={200} objectFit={'contain'}/>
            </div>
            {/*<Button handleClick={() => setTab(0)}>Return to project</Button>*/}
        </CenteredContent>
    )
}