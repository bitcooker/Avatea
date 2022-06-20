import Card from "../projectDetail/Card/Card";
import {Chart} from "./Vesting/Chart";
import Button from "../../core/Button/Button";
import helper from "../../../helpers";
import {useEffect, useState} from "react";

export default function Vesting({  wallet, project, marketMakingPool }) {

    const [releaseAbleAmount, setReleaseAbleAmount] = useState(0);
    const [amountVested, setAmountVested] = useState(0);
    const [amountReleased, setAmountReleased] = useState(0);
    const [cliff, setCliff] = useState('0')
    const [start, setStart] = useState('0')
    const [duration, setDuration] = useState('0')
    const [slicePeriodSeconds, setSlicePeriodSeconds] = useState('0')

    useEffect(() => {
        if (wallet.status === "connected" && marketMakingPool.paired_token) {
            const initWalletConnected = async () => {
                setReleaseAbleAmount(
                    helper.formatting.web3Format(
                        await helper.web3.marketMaker.computeReleasableAmount(
                            wallet,
                            marketMakingPool.address
                        ))
                );

                const {
                    available,
                    amountVested,
                    released,
                    cliff,
                    start,
                    duration,
                    slicePeriodSeconds,
                    projectOwner,
                    revocable
                } =
                    await helper.web3.marketMaker.fetchHoldersMapping(
                        wallet,
                        marketMakingPool.address
                    );
                setAmountReleased(helper.formatting.web3Format(released));
                setAmountVested(helper.formatting.web3Format(amountVested));
                setCliff(cliff);
                setStart(start);
                setDuration(duration);
                setSlicePeriodSeconds(slicePeriodSeconds);
            };
            initWalletConnected();
        }
    }, [wallet, marketMakingPool]);


    const releaseVesting = async () => {
        let full_withdrawal = parseFloat(amountVested) === parseFloat(amountReleased) + parseFloat(releaseAbleAmount);
        await helper.marketMaker.release(
            wallet,
            marketMakingPool.address,
            full_withdrawal
        );
    };

    return ( <Card>
        <div className="vesting-header">
            <h1 className="text-2xl">Vesting</h1>

            <div className="py-5.5 space-y-4.5">
                <div className="flex justify-between">
                    <span className="text-sm">Total Vested</span>
                    <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5"/>
                        {amountVested}
                </span>
                </div>
                <div className="py-5.5 space-y-4.5">
                    <div className="flex justify-between">
                        <span className="text-sm">Released</span>
                        <span className="flex text-base font-medium">
                    <img
                        src="/coins/maticIcon.png"
                        className="w-6 h-6 mr-2.5"
                    />
                            {amountReleased}
                  </span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm">Releaseable Amount</span>
                    <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5"/>
                        {releaseAbleAmount}
                </span>
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
            <Button name="Release Tokens" handleClick={releaseVesting}/>
        </div>
    </Card>)
}
