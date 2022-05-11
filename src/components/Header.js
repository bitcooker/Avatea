import {useWallet} from "use-wallet";

export default function Header() {

    const wallet = useWallet();

    return (
        <header>
            {
                wallet.status === "connected" ? <button className={'w-50'}  onClick={() => wallet.reset()} color={'secondary'}>
                    Disconnect
                </button> :   <button className={'w-50'}  onClick={() => wallet.connect('injected')} color={'secondary'}>
                    Connect with wallet
                </button>
            }

            {
                wallet?.account ? <p>{wallet.account} | Chain ID {wallet.chainId}</p> : <p>Disconnected</p>
            }
        </header>
    )
}