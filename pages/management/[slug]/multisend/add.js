import * as React from "react";
import {useEffect, useState} from "react";
import Papa from "papaparse";
import {ethers} from "ethers";
import {useWallet} from "@albs1/use-wallet";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

import helper from "../../../../src/helpers";
// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import Button from "../../../../src/components/core/Button/Button";
import AddressAndAmountTable from "../../../../src/components/pages/management/vesting/Table/AddressAndAmountTable";
// page components
import FileInput from "../../../../src/components/pages/Linked/fileInput";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import ButtonWithApproval from "../../../../src/components/core/Button/ButtonWithApproval";


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

    const createMultiSend = async () => {
        try {
            setIsLoading(true)
            const response = await helper.web3.marketMaker.stakeBatch(
                wallet,
                marketMakingPool.address,
                addresses,
                amountsInWei,
                amounts
            );

            if (response) {
                setIsLoading(false);
                await Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "The Multisend transaction.js has been created",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    didClose() {
                                        router.push(`/management/${project.slug}/multisend`);
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
                    <h1 className="text-2xl">Multi Sender</h1>
                    {step === 1 &&
                        <div className="hidden w-full -bottom-16 md-lg:w-fit md-lg:block">
                            <div className={'grid grid-cols-2 gap-2.5'}>
                                <ButtonOutlineFit name="Back" icon="fa-regular fa-arrow-left" handleClick={() => router.back()}/>

                                <ButtonFit>
                                    <a href={'/multisend-template.csv'} download={true}>
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
                                <FileInput label="Upload multi send distribution" setValue={handleFileSelect} fileName={fileName} setFileName={setFileName}
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
                    </div>
                    <div className="flex flex-row space-x-5">
                        {step > 1 &&
                            <Button
                                name="Previous"
                                handleClick={() => {
                                    setStep(step - 1)
                                }}
                                disabled={isLoading}
                            />
                        }
                        {step < 2 ?
                            <Button
                                name="Next"
                                disabled={!(addresses.length > 0)}
                                handleClick={() => {
                                    setStep(step + 1)
                                }}
                            /> :
                            <ButtonWithApproval isLoading={isLoading} name="Create multi send - " handleClick={createMultiSend} address={marketMakingPool.address}
                                                token={project.token} amount={totalAmount} ticker={project.ticker}/>
                        }
                    </div>
                </div>

                {step === 1 &&
                    <div className="w-full -bottom-16 md-lg:w-fit md-lg:hidden">
                        <div className={'grid grid-cols-2 gap-2.5'}>
                            <ButtonOutlineFit name="Back" icon="fa-regular fa-arrow-left" handleClick={() => router.back()}/>

                            <ButtonFit>
                                <a href={'/multisend-template.csv'} download={true}>
                                    <i className={'fa-solid fa-cloud-arrow-up'}/> Download
                                </a>
                            </ButtonFit>

                        </div>

                    </div>
                }
            </div>
        </ManagementAuthentication>

    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}

