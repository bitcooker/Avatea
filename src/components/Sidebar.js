import React, {useEffect, useState} from "react";
import Link from 'next/link'
import { activity, home, logOut, setting, vault } from "./SVG";
import {useRouter} from "next/router";
import helper from '../helpers/';
import {useWallet} from "use-wallet";
import { ethers } from 'ethers';

export default function Sidebar({ menu, setMenu }) {

    const wallet = useWallet();
    const router = useRouter();
    const [claimableDividend, setClaimableDividend] = useState(0);

    useEffect(() => {
        if(wallet.isConnected()) {
            const fetchClaimableDividend = async () => {
                const result = await helper.avateaToken.getClaimableAmount(wallet, wallet.account);
                setClaimableDividend(ethers.utils.formatEther(result));
            }
            fetchClaimableDividend()
        }
    },[wallet])

    const claimDividend = async () => {
        if(wallet.isConnected()) {
            await helper.avateaToken.claim(wallet);
        } else {
            alert('Wallet is not connected')
        }
    }
    let links = document.querySelectorAll(".nav__inner-link");
    const menuClose = React.useCallback((e) => {
        const target = e.target;
        if (target === document.querySelector(".sidebar")) {
            document.body.classList.remove("active");
            document.body.removeEventListener("click", menuClose);
            setMenu(false);
        }
    }, []);
    useEffect(() => {
        if (menu) {
            document.body.addEventListener("click", menuClose);
            document.body.classList.add("active");
        }
    }, [menu]);
    let body = document.body;
    links.forEach((e) => {
        onLinkClick(e);
    });
    function onLinkClick(linkItem) {
        linkItem.addEventListener("click", function () {
            setMenu(false);
            body.classList.remove("active");
        });
    }
    return (
        <div className={"sidebar " + (menu ? "active" : "")}>
            <div className="sidebar__inner">
                <div className="sidebar__inner-logo">
                    <img src={"/logo.svg"} alt="logo" />
                </div>
                <nav className="nav">
                    <div className="nav__inner">
                        <Link href="/">
                           <a className={`nav__inner-link ${router.asPath == "/" ? "active" : ""}`}> {home}Home</a>
                        </Link>
                        <Link href="/activity" className="nav__inner-link">
                            <a className={`nav__inner-link ${router.asPath == "/activity" ? "active" : ""}`}> {activity}
                            My Activity</a>
                        </Link>
                        <Link href="/projects" className="nav__inner-link">
                            <a className={`nav__inner-link ${router.asPath == "/projects" ? "active" : ""}`}>   {vault}
                            Vault list</a>
                        </Link>
                        <Link href="/settings" className="nav__inner-link">
                            <a className="nav__inner-link">      {setting}
                            Settings</a>
                        </Link>
                        <Link href="/logout" className="nav__inner-link">
                            <a className="nav__inner-link"> {logOut}
                            Logout</a>
                        </Link>
                    </div>
                    <div className="nav__footer">
                        <div className="plan">
                            <div className="plan__inner">
                                <div className="plan__icon">
                                    <img
                                        src={"/shapes/shapePlan.svg"}
                                        alt="plan"
                                    />
                                </div>

                                <div className="plan__text">
                                    Claimable Dividend <br /> {
                                    wallet.isConnected() ? <p>{claimableDividend}</p> : "Connect your wallet"
                                }
                                </div>
                               <button className='button primary' onClick={() => claimDividend()}>
                                    Claim Dividend
                               </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
