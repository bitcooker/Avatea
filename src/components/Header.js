import {useWallet} from "use-wallet";
import Link from 'next/link';
import { bell, search } from "./SVG";
import helpers from '../helpers';
import {useEffect} from "react";

export default function Header({ menu, setMenu, title }) {

    const wallet = useWallet();

    //@TODO Optimize Register not to fire every time
    useEffect(() => {
        if (wallet.isConnected()) {
            const initWallet = async () => {
                await helpers.user.registerUser(wallet)
            };
            initWallet()
        }
    },[wallet])

    return (
        <header className="header">
                <div className="header__inner">
                    <div
                        className={"burger " + (menu ? "active" : "")}
                        onClick={() => {
                            setMenu(!menu);
                        }}
                    >
                        <span></span>
                    </div>
                    <h1>{title}</h1>
                    <div className="header__inner-row">
                        <form className="header__inner-search">
                            <div className="search">
                                <input type="text" placeholder="Search" />
                                <button>{search}</button>
                            </div>
                        </form>
                        <div className="bell">
                            <div className="bell__btn off">{bell}</div>
                        </div>
                        <small> {wallet?.account ? <>{wallet.account} | Chain ID {wallet.chainId}</> : null}</small>
                        {
                            wallet.status === "connected" ?
                                <button className={'button primary'}  onClick={() => wallet.reset()} color={'secondary'}>Disconnect</button>
                                :
                                <button className={'button primary'}  onClick={() => wallet.connect('injected')} color={'secondary'}>Connect with wallet</button>
                        }
                    </div>
                </div>
        </header>
    )
}
