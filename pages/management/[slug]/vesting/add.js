import * as React from "react";
import {useEffect, useState} from "react";
import Papa from "papaparse";
import {ethers} from "ethers";
import {useWallet} from "@albs1/use-wallet";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import moment from 'moment';
import useLocalStorage from "use-local-storage";
import dynamic from "next/dynamic";
import Head from "next/head";

import helper from "../../../../src/helpers";
import helpers from "../../../../src/helpers";
import {TITLE_PREFIX} from "../../../../src/helpers/constants";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import Button from "../../../../src/components/core/Button/Button";
import InputEmpty from "../../../../src/components/core/Input/InputEmpty";
import InputTime from "../../../../src/components/core/Input/InputTime";
import Checkbox from "../../../../src/components/core/Checkbox/Checkbox";
import AddressAndAmountTable from "../../../../src/components/pages/management/vesting/Table/AddressAndAmountTable";
import DateTimePicker from '../../../../src/components/core/DateTimePicker/DateTimePicker';
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import ButtonWithApproval from "../../../../src/components/core/Button/ButtonWithApproval";

// page components
import FileInput from "../../../../src/components/pages/Linked/fileInput";
import {VestingChart} from "../../../../src/components/pages/projects/Charts/VestingChart";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";

const ReactTooltip = dynamic(() => import('react-tooltip'), { ssr: false });

export default function VestingAdd(props) {

    const [project, setProject] = React.useState({});
    const router = useRouter();
    const wallet = useWallet();
    const [marketMakingPool, setMarketMakingPool] = useState({});

    const [isRevocableContract,setIsRevocableContract] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [step, setStep] = React.useState(1);
    const [fileName, setFileName] = React.useState("");
    const [addresses, setAddresses] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [amountsInWei, setAmountsInWei] = useState([]);

    const [start, setStart] = useState('');
    const [startDate, setStartDate] = useState('');
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

    useEffect(()=> {
        if(wallet.isConnected() && marketMakingPool?.address) {
            (async() => {
                setIsRevocableContract(await helpers.web3.marketMaker.getRevocableContract(wallet,marketMakingPool.address));
            })()
        }

    },[wallet,marketMakingPool])

    useEffect(() => {
        setCliffInDays(helpers.formatting.secondFormat(cliff, true))
    }, [cliff, setCliffInDays]);

    useEffect(() => {
        setDurationInDays(helpers.formatting.secondFormat(duration, true))
    }, [duration, setDurationInDays]);

    useEffect(() => {
        setSlicePeriodSecondsInDays(helpers.formatting.secondFormat(slicePeriodSeconds, true))
    }, [setSlicePeriodSecondsInDays, slicePeriodSeconds]);

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
        <>
            <Head>
                <title>{project.name} | Add Vesting | Management</title>
                <meta property="og:title" content={`${project.name} | Add Vesting | ${TITLE_PREFIX}`} key="title" />
                <meta name="robots" content="noindex" />
            </Head>
            <ReactTooltip />
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
                                    className="grow md-lg:p-7.5 bg-white overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5">
                                        <div>
                                            <div className={'flex flex-row'}>
                                                <label className={'pr-2'} htmlFor="batchname">Batchname</label>

                                                <span className="relative flex flex-col items-center justify-center group">
                                                <i data-tip="Please enter the batchname" className="fa-regular fa-circle-info text-sky-500 text-base cursor-pointer"/>
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
                                                <i data-tip="Please select start date" className="fa-regular fa-circle-info text-sky-500 text-base cursor-pointer"/>
                                            </span>
                                            </div>
                                            <div className="mt-3">
                                                <DateTimePicker value={startDate} onChange={setStartDate} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className={'flex flex-row'}>
                                                <label className={'pr-2'} htmlFor="cliff">Cliff {cliffInDays}</label>

                                                <span className="relative flex flex-col items-center justify-center group">
                                                <i data-tip="This is Cliff" className="fa-regular fa-circle-info text-sky-500 text-base cursor-pointer"/>
                                            </span>
                                            </div>
                                            <InputTime
                                                id="cliff"
                                                name="cliff"
                                                classNames={'mt-3'}
                                                placeholder="Enter a cliff period in seconds "
                                                value={cliff}
                                                setValue={setCliff}
                                                hideButton={true}
                                            />
                                        </div>
                                        <div>
                                            <div className={'flex flex-row'}>
                                                <label className={'pr-2'} htmlFor="duration">Duration {durationInDays}</label>

                                                <span className="relative flex flex-col items-center justify-center group">
                                                <i data-tip="This is duration" className="fa-regular fa-circle-info text-sky-500 text-base cursor-pointer"/>
                                            </span>
                                            </div>
                                            <InputTime
                                                id="duration"
                                                name="duration"
                                                classNames={'mt-3'}
                                                placeholder="Enter the duration in seconds"
                                                value={duration}
                                                setValue={setDuration}
                                                hideButton={true}
                                            />
                                        </div>

                                        <div>
                                            <div className={'flex flex-row'}>
                                                <label className={'pr-2'} htmlFor="slicePeriodSeconds">Slice Period in seconds {slicePeriodSecondsInDays}</label>

                                                <span className="relative flex flex-col items-center justify-center group">
                                                <i data-tip="This is slice period in seconds" className="fa-regular fa-circle-info text-sky-500 text-base cursor-pointer"/>
                                            </span>
                                            </div>
                                            <InputTime
                                                id="slicePeriodSeconds"
                                                name="slicePeriodSeconds"
                                                classNames={'mt-3'}
                                                placeholder="Enter the slice period in seconds"
                                                value={slicePeriodSeconds}
                                                setValue={setSlicePeriodSeconds}
                                                hideButton={true}
                                            />
                                        </div>
                                        {
                                            isRevocableContract ?
                                                <div className="flex h-12.5 self-end">
                                                    <div className="flex gap-2 items-center">
                                                        <Checkbox
                                                            setValue={setRevocable}
                                                            initialValue={revocable}/>

                                                        <div className={'flex flex-row'}>
                                                            <label className={'pr-2'}>Should this batch be revocable?</label>
                                                            <span className="relative flex flex-col items-center justify-center group">
                                                        <i data-tip="test tooltip" className="fa-regular fa-circle-info text-sky-500 text-base cursor-pointer"/>
                                                    </span>
                                                        </div>
                                                    </div>

                                                </div> : ""

                                        }

                                    </div>


                                    <VestingChart
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
                                    disabled={isLoading}
                                    handleClick={() => {
                                        setStep(step - 1)
                                    }}
                                />
                            }
                            {step < 3 ?
                                <Button
                                    name="Next"
                                    disabled={!(addresses.length > 0)}
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

        </>

    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}

