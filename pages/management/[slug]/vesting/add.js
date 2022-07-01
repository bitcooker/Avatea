import * as React from "react";
import {useEffect, useState} from "react";
import Papa from "papaparse";
import {ethers} from "ethers";
import {useWallet} from "use-wallet";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

import helper from "../../../../src/helpers";
// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import Button from "../../../../src/components/core/Button/Button";
import ButtonOutline from "../../../../src/components/core/Button/ButtonOutline";
import InputEmpty from "../../../../src/components/core/Input/InputEmpty";
import Checkbox from "../../../../src/components/core/Checkbox/Checkbox";
import AddressAndAmountTable from "../../../../src/components/management/vesting/Table/AddressAndAmountTable";

// page components
import FileInput from "../../../../src/components/pages/Linked/fileInput";
import {Chart} from "../../../../src/components/pages/projects/Vesting/Chart";

const vestings = [
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 10
    },
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 10
    },
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 232
    },
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 232
    },
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 3011
    },
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 3011
    },
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 192
    },
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 192
    },
    {
        address: "0x609D2834d355a9c8Ae5B01EA2782C8b716A4f8eF",
        amount: 1111    
    },
]

export default function VestingAdd(props) {

    const [project, setProject] = React.useState({});
    const router = useRouter();
    const wallet = useWallet();
    const [marketMakingPool, setMarketMakingPool] = useState({});

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

    const [step, setStep] = React.useState(1);
    const [addresses, setAddresses] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [amountsInWei, setAmountsInWei] = useState([]);
    const [start, setStart] = useState(0);
    const [cliff, setCliff] = useState(0);
    const [duration, setDuration] = useState(0);
    const [slicePeriodSeconds, setSlicePeriodSeconds] = useState(0);
    const [revocable, setRevocable] = useState(true);
    const [batchName, setBatchName] = useState('');

    const handleFileSelect = (event) => {

        Papa.parse(event, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const addressesArray = [];
                const amountsArray = [];
                const amountsInWeiArray = [];

                results.data.map((d) => {
                    amountsArray.push(Object.values(d)[1]);
                    amountsInWeiArray.push(ethers.utils.parseEther(Object.values(d)[1]));
                    addressesArray.push(Object.values(d)[0]);
                });

                setAddresses(addressesArray);
                setAmounts(amountsArray);
                setAmountsInWei(amountsInWeiArray);
            },
        });

    }

    const createVesting = async () => {

        try {
            const response = await helper.web3.marketMaker.createVesting(wallet, marketMakingPool.address, addresses, start, cliff, duration, slicePeriodSeconds, revocable, amountsInWei, amounts, batchName, project.slug);

            if (response) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "The Vesting Schedule has been created",
                    showConfirmButton: false,
                    timer: 3000,
                    didClose() {
                        router.push(`/management/${project.slug}/vesting/overview`);
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };


    const setCSV = async () => {
        console.log('test');
    };

    return (
        <div className="relative flex flex-col min-h-[70vh] md-lg:min-h-[85vh] space-y-7">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl">Vesting Overview</h1>
                {step === 1 && 
                    <div className="absolute w-full -bottom-16 md-lg:w-fit md-lg:static">
                        <ButtonFit
                            name="Download CSV Template"
                            icon="fa-solid fa-cloud-arrow-up"
                        />
                    </div>
                }
            </div>
            <div className="flex flex-col grow p-5 space-y-3.75 bg-white rounded-2xl">
                <div className="grow">
                {step === 1 &&
                    <FileInput label="Upload vesting distribution" setValue={handleFileSelect}
                               type={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}/>
                }
                {step === 2 &&
                    <div className="grow h-[60vh] md-lg:h-[70vh] p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                        <AddressAndAmountTable vestings={vestings} project={project}/>
                    </div>
                }
                {step === 3 &&
                    <div className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                        <div className="grid md-lg:grid-cols-2 gap-5">
                            <div className="flex flex-col space-y-3.75">
                                <span className="text-base">Batch name</span>
                                <InputEmpty
                                    id="start"
                                    name="start"
                                    type="text"
                                    placeholder="batch name"
                                    value={batchName}
                                    setValue={setBatchName}
                                />
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <span className="text-base">Start</span>
                                <InputEmpty
                                    id="start"
                                    name="start"
                                    type="number"
                                    placeholder="Duration"
                                    value={start}
                                    setValue={setStart}
                                />
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <span className="text-base">Cliff</span>
                                <InputEmpty
                                    id="cliff"
                                    name="cliff"
                                    type="number"
                                    placeholder="Duration"
                                    value={cliff}
                                    setValue={setCliff}
                                />
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <span className="text-base">Duration</span>
                                <InputEmpty
                                    id="duration"
                                    name="duration"
                                    type="number"
                                    placeholder="Duration"
                                    value={duration}
                                    setValue={setDuration}
                                />
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <span className="text-base">SlicePeriodSeconds</span>
                                <InputEmpty
                                    id="slicePeriodSeconds"
                                    name="slicePeriodSeconds"
                                    type="number"
                                    placeholder="slicePeriodSeconds"
                                    value={slicePeriodSeconds}
                                    setValue={setSlicePeriodSeconds}
                                />
                            </div>
                            <div className="flex flex-col justify-end space-y-3.75">
                                <div className="flex items-center w-full h-12.5 space-x-2">
                                    <span className="text-base">Revocable</span><Checkbox setValue={setRevocable}/>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <Chart
                                amountVested="100"
                                cliff={parseInt(cliff) + parseInt(start)}
                                start={start}
                                duration={duration}
                                slicePeriodSeconds={slicePeriodSeconds}
                                ticker="%"
                            />
                        </div>
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
                    {step === 3 ? 
                        <ButtonOutline name="Create Vesting" icon="fa-regular fa-check" handleClick={createVesting}/>
                        : 
                        <Button
                        name="Next"
                        handleClick={() => {
                            setStep(step + 1)
                        }}
                    />}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}

