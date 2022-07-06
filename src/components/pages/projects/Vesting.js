import Card from "../projectDetail/Card/Card";
import {Chart} from "./Vesting/Chart";
import Button from "../../core/Button/Button";
import helper from "../../../helpers";
import {useEffect, useState} from "react";
import NoVesting from "./NoVesting";
import SkeletonMarketMaking from "./Skeleton/SkeletonMarketMaking";
import CenteredContent from "../../core/CenteredContent";
import Image from "next/image";

export default function Vesting({
                                    wallet,
                                    project,
                                    marketMakingPool,
                                    setAction,
                                    userAddress,
                                setTab}) {
    const [releaseAbleAmount, setReleaseAbleAmount] = useState(0);
    const [amountVested, setAmountVested] = useState(0);
    const [amountReleased, setAmountReleased] = useState(0);
    const [cliff, setCliff] = useState("0");
    const [start, setStart] = useState("0");
    const [duration, setDuration] = useState("0");
    const [revocable, setRevocable] = useState(false);
    const [releasable, setReleasable] = useState(false);
    const [slicePeriodSeconds, setSlicePeriodSeconds] = useState("0");
    const [load, setLoad] = useState(true);


    useEffect(() => {

        if (
            wallet.status === "connected" &&
            marketMakingPool.paired_token
        ) {
            const initWalletConnected = async () => {
                const {
                    amountVested,
                    released,
                    cliff,
                    start,
                    duration,
                    slicePeriodSeconds,
                    revocable,
                    allowReleasing
                } = await helper.web3.marketMaker.fetchHoldersVestingMapping(wallet, marketMakingPool.address, wallet.account);

                setReleaseAbleAmount(
                    helper.formatting.web3Format(
                        await helper.web3.marketMaker.computeReleasableAmount(
                            wallet,
                            marketMakingPool.address,
                            userAddress ? userAddress : wallet.account
                        )
                    )
                );

                setAmountReleased(helper.formatting.web3Format(released));
                setAmountVested(helper.formatting.web3Format(amountVested));
                setCliff(cliff);
                setStart(start);
                setDuration(duration);
                setSlicePeriodSeconds(slicePeriodSeconds);
                setRevocable(revocable);
                setReleasable(allowReleasing);
                setLoad(true)
            };
            initWalletConnected();
        }
    }, [wallet, marketMakingPool]);

    const releaseVesting = async () => {
        let full_withdrawal =
            parseFloat(amountVested) ===
            parseFloat(amountReleased) + parseFloat(releaseAbleAmount);
        await helper.marketMaker.release(
            wallet,
            marketMakingPool.address,
            full_withdrawal
        );
    };

    const revokeVesting = async () => {
        await helper.marketMaker.revoke(
            wallet,
            marketMakingPool.address,
            userAddress
        );
    };

    const toggleAutoRelease = async () => {
        await helper.marketMaker.setAllowReleasing(
            wallet,
            marketMakingPool.address,
            !releasable
        );
    };

    if (amountVested === '0.00') return (
        <CenteredContent>
            <span className={'text-2xl'}>No Vesting Available</span>
            <div className={'w-[70%] mx-auto'}>
                    <Image src={'/red-flag.png'} layout={'responsive'}  height={672} width={1030}/>
                </div>
                <Button handleClick={()=>setTab(0)}>Return to project</Button>
           </CenteredContent>
    );

    return !load ? <SkeletonMarketMaking/> : (
        <Card>
            <div className="vesting-header">
                <h1 className="text-2xl">
                    <i className="fa-solid fa-unlock"></i> Vesting
                </h1>

                <div className="flex flex-row justify-center py-5.5 space-y-4.5 ">
                    <div className="sm:grid sm:grid-cols-1 md:grid-cols-3">
                        <div className="mb-5 md:mb-0">
                            <span className="text-sm">Total Vested</span>
                            <span className="flex text-base font-medium">
                <img src={project.image} className="w-6 h-6 mr-2.5"/>
                                {amountVested}
              </span>
                        </div>
                        <div className="mb-5 md:mb-0">
                            <span className="text-sm">Released</span>
                            <span className="flex text-base font-medium">
                <img src={project.image} className="w-6 h-6 mr-2.5"/>
                                {amountReleased}
              </span>
                        </div>
                        <div className="mb-5 md:mb-0">
                            <span className="text-sm">Releaseable Amount</span>
                            <span className="flex text-base font-medium">
                <img src={project.image} className="w-6 h-6 mr-2.5"/>
                                {releaseAbleAmount}
              </span>
                        </div>
                    </div>
                </div>
            </div>
            <Chart
                amountVested={amountVested}
                cliff={cliff}
                start={start}
                duration={duration}
                slicePeriodSeconds={slicePeriodSeconds}
                ticker={project.ticker}
            />
            <div className="pt-9">
                <div className="flex flex-row space-x-5">

                    {(setAction === 'revoke' && revocable) &&
                        <Button name="Revoke Tokens" handleClick={revokeVesting}>
                            {" "}
                            <i className=" pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                    }
                    {(setAction !== 'revoke') &&
                        <Button name="Release Tokens" handleClick={releaseVesting}>
                            {" "}
                            <i className=" pl-2 fa-solid fa-arrow-down-to-arc"/>
                        </Button>
                    }

                    {(releasable && setAction === 'revoke') &&
                        <Button name="Auto release enabled " disabled={true}/>
                    }
                    {(releasable && setAction !== 'revoke') &&
                        <Button name="Disable Auto release " handleClick={toggleAutoRelease}/>
                    }
                    {(!releasable && setAction === 'revoke') &&
                        <Button name="Auto release disabled " disabled={true}/>
                    }
                    {(!releasable && setAction !== 'revoke') &&
                        <Button name="Enable Auto release " handleClick={toggleAutoRelease}/>
                    }

                </div>


            </div>
        </Card>
    );
}
