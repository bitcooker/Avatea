import * as React from "react";
import {useEffect, useState} from "react";
import Papa from "papaparse";
import {ethers} from "ethers";
import {useWallet} from "@albs1/use-wallet";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import moment from 'moment';

import helper from "../../../../src/helpers";
import helpers from "../../../../src/helpers";
// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import Button from "../../../../src/components/core/Button/Button";
import InputEmpty from "../../../../src/components/core/Input/InputEmpty";
import Checkbox from "../../../../src/components/core/Checkbox/Checkbox";
import AddressAndAmountTable from "../../../../src/components/pages/management/vesting/Table/AddressAndAmountTable";
import Tooltip from '../../../../src/components/core/Tooltip/Tooltip';
import DateTimePicker from '../../../../src/components/core/DateTimePicker/DateTimePicker';
// page components
import FileInput from "../../../../src/components/pages/Linked/fileInput";
import {Chart} from "../../../../src/components/pages/projects/Vesting/Chart";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import ButtonWithApproval from "../../../../src/components/core/Button/ButtonWithApproval";
import useLocalStorage from "use-local-storage";


export default function VestingAdd(props) {

    const [project, setProject] = React.useState({});
    const router = useRouter();
    const wallet = useWallet();
    const [marketMakingPool, setMarketMakingPool] = useState({});

    const [isLoading,setIsLoading] = useState(false);
    const [step, setStep] = React.useState(1);
    const [fileName, setFileName] = React.useState("");
    const [addresses, setAddresses] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [amountsInWei, setAmountsInWei] = useState([]);

    const [start, setStart] = useLocalStorage('start','');
    const [startDate, setStartDate] = useLocalStorage('startDate','');
    const [cliff, setCliff] = useLocalStorage('cliff',);
    const [cliffInDays, setCliffInDays] = useLocalStorage('cliffInDays','');
    const [duration, setDuration] = useLocalStorage('duration','');
    const [durationInDays, setDurationInDays] = useLocalStorage('durationInDays','');
    const [slicePeriodSeconds, setSlicePeriodSeconds] = useLocalStorage('slicePeriodSeconds','');
    const [slicePeriodSecondsInDays, setSlicePeriodSecondsInDays] = useLocalStorage('slicePeriodSecondInDays','');

    const [revocable, setRevocable] = useLocalStorage('revocable',true);
    const [batchName, setBatchName] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        if (props.marketMakingPool) setMarketMakingPool(props.marketMakingPool);
        else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
                setMarketMakingPool(result?.marketMakingPool);
            };
            fetchProject();
        }
    }, [props]);

    useEffect(() => {
        setStart(moment(startDate).unix());
    },[startDate])

    useEffect(() => {
        setCliffInDays(helpers.formatting.secondFormat(cliff, true))
    }, [cliff]);

    useEffect(() => {
        setDurationInDays(helpers.formatting.secondFormat(duration, true))
    }, [duration]);

    useEffect(() => {
        setSlicePeriodSecondsInDays(helpers.formatting.secondFormat(slicePeriodSeconds, true))
    }, [slicePeriodSeconds]);

    const handleFileSelect = (event) => {

        Papa.parse(event, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const addressesArray = [];
                const amountsArray = [];
                const amountsInWeiArray = [];
                let total = 0.0;

                results.data.map((d) => {
                    amountsArray.push(Object.values(d)[1]);
                    total += parseFloat(Object.values(d)[1]);
                    amountsInWeiArray.push(ethers.utils.parseEther(Object.values(d)[1]));
                    addressesArray.push(Object.values(d)[0]);
                });

                setAddresses(addressesArray);
                setAmounts(amountsArray);
                setTotalAmount(total);
                setAmountsInWei(amountsInWeiArray);
            },
        });

    }

    const createVesting = async () => {

        try {
            setIsLoading(true);
            const response = await helper.web3.marketMaker.createVesting(
                wallet,
                marketMakingPool.address,
                addresses,
                moment(startDate).unix(),
                cliff,
                duration,
                slicePeriodSeconds,
                revocable,
                amountsInWei,
                amounts,
                batchName,
                project.slug
            );

            if (response) {
                setIsLoading(false);
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "The Vesting Schedule has been created",
                    showConfirmButton: false,
                    timer: 3000,
                    didClose() {
                        router.push(`/management/${project.slug}/vesting`);
                    },
                });

            }
        } catch (error) {
            setIsLoading(false);

            console.log(error);
        }
    };


    return (
        <ManagementAuthentication wallet={wallet} project={project}>
            <div className="relative flex flex-col min-h-[70vh] md-lg:min-h-[85vh] space-y-7.5">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl">Vesting Overview</h1>
                    {step === 1 &&
                        <div className="absolute w-full -bottom-16 md-lg:w-fit md-lg:static">
                            <div className={'grid grid-cols-2 gap-2.5'}>
                                <ButtonOutlineFit name="Back" icon="fa-regular fa-arrow-left" handleClick={() => router.back()}/>

                                <ButtonFit>
                                    <a href={'/vesting-template.csv'} download={true}>
                                        <i className={'fa-solid fa-cloud-arrow-up'}/> Download CSV Template
                                    </a>
                                </ButtonFit>

                            </div>

                        </div>
                    }
                </div>
                <div className="flex flex-col grow p-5 space-y-3.75 bg-white rounded-2xl">
                    <div className="grow">
                        {step === 1 &&
                            <div className={'grid grid-cols-1 gap-2.5'}>
                                <FileInput label="Upload vesting distribution" setValue={handleFileSelect} fileName={fileName} setFileName={setFileName}
                                           type={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}/>
                                <div className="flex items-center rounded bg-blue-500 text-white text-sm font-bold px-4 py-3"
                                     role="alert">
                                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path
                                            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
                                    </svg>
                                    <p>Token amount should be entered in the CSV as whole amounts. For example; to receive 1.000 tokens. Enter 1000 as
                                        amount.</p>
                                </div>
                            </div>

                        }
                        {step === 2 &&
                            <div
                                className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                                <AddressAndAmountTable tokenImage={project.image} addresses={addresses} amounts={amounts}/>
                                Total: {totalAmount} {project.ticker}
                            </div>
                        }
                        {step === 3 &&
                            <div
                                className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5">
                                    <div>
                                        <div className={'flex flex-row'}>
                                            <label className={'pr-2'} htmlFor="batchname">Batchname</label>

                                            <span className="relative flex flex-col items-center justify-center group">
                                                <i className="fa-regular fa-circle-info text-sky-500 text-base mt-0.5"/>
                                                <Tooltip title="This is test tooltip"/>
                                            </span>
                                        </div>
                                        <InputEmpty
                                            id="batchname"
                                            name="batchname"
                                            type="text"
                                            placeholder="Enter a batchname"
                                            value={batchName}
                                            classNames={'mt-3'}

                                            setValue={setBatchName}
                                        />
                                    </div>

                                    <div>
                                        <div className={'flex flex-row'}>
                                            <label className={'pr-2'} htmlFor="start">Start</label>

                                            <span className="relative flex flex-col items-center justify-center group">
                                                <i className="fa-regular fa-circle-info text-sky-500 text-base mt-0.5"/>
                                                <Tooltip title="This is test tooltip"/>
                                            </span>
                                        </div>
                                        {/* <InputEmpty
                                            id="start"
                                            name="start"
                                            type="number"
                                            placeholder="Enter a startdate in UNIX"
                                            value={start}
                                            classNames={'mt-3'}
                                            setValue={setStart}
                                        /> */}
                                        <div className="mt-3">
                                            <DateTimePicker value={startDate} onChange={setStartDate} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className={'flex flex-row'}>
                                            <label className={'pr-2'} htmlFor="cliff">Cliff {cliffInDays}</label>

                                            <span className="relative flex flex-col items-center justify-center group">
                                                <i className="fa-regular fa-circle-info text-sky-500 text-base mt-0.5"/>
                                                <Tooltip title="This is test tooltip"/>
                                            </span>
                                        </div>
                                        <InputEmpty
                                            id="cliff"
                                            name="cliff"
                                            type="number"
                                            classNames={'mt-3'}

                                            placeholder="Enter a cliff period in seconds "
                                            value={cliff}
                                            setValue={setCliff}
                                        />
                                    </div>
                                    <div>
                                        <div className={'flex flex-row'}>
                                            <label className={'pr-2'} htmlFor="duration">Duration {durationInDays}</label>

                                            <span className="relative flex flex-col items-center justify-center group">
                                                <i className="fa-regular fa-circle-info text-sky-500 text-base mt-0.5"/>
                                                <Tooltip title="This is test tooltip"/>
                                            </span>
                                        </div>
                                        <InputEmpty
                                            id="duration"
                                            name="duration"
                                            type="number"
                                            classNames={'mt-3'}

                                            placeholder="Enter the duration in seconds"
                                            value={duration}
                                            setValue={setDuration}
                                        />
                                    </div>

                                    <div>
                                        <div className={'flex flex-row'}>
                                            <label className={'pr-2'} htmlFor="slicePeriodSeconds">Slice Period in seconds {slicePeriodSecondsInDays}</label>

                                            <span className="relative flex flex-col items-center justify-center group">
                                                <i className="fa-regular fa-circle-info text-sky-500 text-base mt-0.5"/>
                                                <Tooltip title="This is test tooltip"/>
                                            </span>
                                        </div>
                                        <InputEmpty
                                            id="slicePeriodSeconds"
                                            name="slicePeriodSeconds"
                                            type="number"
                                            classNames={'mt-3'}
                                            placeholder="Enter the slice period in seconds"
                                            value={slicePeriodSeconds}
                                            setValue={setSlicePeriodSeconds}
                                        />
                                    </div>
                                    <div>
                                        <div className={'flex flex-row'}>
                                            <label className={'pr-2'}>Should this batch be revocable?</label>
                                            <span className="relative flex flex-col items-center justify-center group">
                                                <i className="fa-regular fa-circle-info text-sky-500 text-base mt-0.5"/>
                                                <Tooltip title="This is test tooltip"/>
                                            </span>
                                        </div>

                                        <Checkbox
                                            classNames={'mt-5'}
                                            setValue={setRevocable}
                                            initialValue={revocable}/>

                                    </div>

                                </div>


                                <Chart
                                    amountVested="100"
                                    cliff={parseInt(cliff) + parseInt(start)}
                                    start={start}

                                    duration={duration}
                                    slicePeriodSeconds={slicePeriodSeconds}
                                    ticker="%"
                                />
                            </div>
                        }
                    </div>
                    <div className="flex flex-row space-x-5">
                        {step > 1 &&
                            <Button
                                name="Previous"
                                handleClick={() => {
                                    setStep(step - 1)
                                }}
                            />
                        }
                        {step < 3 ?
                            <Button
                                name="Next"
                                disabled={!(addresses.length > 0) || isLoading}
                                handleClick={() => {
                                    setStep(step + 1)
                                }}
                            /> :
                            <ButtonWithApproval disabled={isLoading} isLoading={isLoading} name="Create Vesting batch - " handleClick={createVesting} address={marketMakingPool.address}
                                                token={project.token} amount={totalAmount} ticker={project.ticker}/>
                        }
                    </div>
                </div>
            </div>
        </ManagementAuthentication>

    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}

