import Card from "../projectDetail/Card/Card";
import {Chart} from "./Vesting/Chart";
import Button from "../../core/Button/Button";
import helper from "../../../helpers";
import {useEffect, useState} from "react";

export default function Vesting({
                                    wallet,
                                    project,
                                    marketMakingPool,
                                    holdersMapping,
                                    setAction,
                                    userAddress
                                }) {
    const [releaseAbleAmount, setReleaseAbleAmount] = useState(0);
    const [amountVested, setAmountVested] = useState(0);
    const [amountReleased, setAmountReleased] = useState(0);
    const [cliff, setCliff] = useState("0");
    const [start, setStart] = useState("0");
    const [duration, setDuration] = useState("0");
    const [revocable, setRevocable] = useState(false);
    const [slicePeriodSeconds, setSlicePeriodSeconds] = useState("0");


    useEffect(() => {
        
        if (
            wallet.status === "connected" &&
            marketMakingPool.paired_token &&
            Object.keys(holdersMapping).length !== 0
        ) {
            const initWalletConnected = async () => {
                setReleaseAbleAmount(
                    helper.formatting.web3Format(
                        await helper.web3.marketMaker.computeReleasableAmount(
                            wallet,
                            marketMakingPool.address,
                            userAddress ? userAddress : wallet.account
                        )
                    )
                );

                const {
                    amountVested,
                    released,
                    cliff,
                    start,
                    duration,
                    slicePeriodSeconds,
                    revocable,
                } = holdersMapping;
                setAmountReleased(helper.formatting.web3Format(released));
                setAmountVested(helper.formatting.web3Format(amountVested));
                setCliff(cliff);
                setStart(start);
                setDuration(duration);
                setSlicePeriodSeconds(slicePeriodSeconds);
                setRevocable(revocable);
            };
            initWalletConnected();
        }
    }, [wallet, marketMakingPool.paired_token, holdersMapping]);

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

    return (
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
            </div>
        </Card>
    );
}
