import * as React from "react";
import {useEffect} from "react";
import {useWallet} from "use-wallet";
import {useRouter} from "next/router";

import helper from "../../../../src/helpers";
import helpers from "../../../../src/helpers";
// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
// page components
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import AddressAndAmountAndTimeTable from "../../../../src/components/pages/management/multisend/AddressAndAmountAndTimeTable";


export default function VestingAdd(props) {

    const [project, setProject] = React.useState({});
    const [transactions, setTransactions] = React.useState([]);
    const router = useRouter();
    const wallet = useWallet();
    const { slug } = router.query;


    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
            };
            fetchProject();
        }

    }, [props]);

    useEffect(() => {

        const fetchTransactions = async () => {
            const transactionsData = await helpers.transactions.getTransactions({
                                                                                    project: project.slug, type: 'MMBB'
                                                                                })
            setTransactions(transactionsData);
            console.log(transactionsData)
        };
        fetchTransactions();
    }, [project]);


    return (
        <ManagementAuthentication wallet={wallet} project={project}>
            <div className="relative flex flex-col h-[80vh] md-lg:h-[85vh] space-y-7.5">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl">Multi Sender</h1>
                    <div className="absolute w-full -bottom-16 md-lg:w-fit md-lg:static">
                        <div className={'grid grid-cols-2 gap-2.5'}>
                            <ButtonOutlineFit name="Back" icon="fa-regular fa-arrow-left" handleClick={() => router.back()}/>

                            <ButtonFit handleClick={() => router.push(`/management/${slug}/multisend/add`)}>
                                <div className="flex items-center gap-2" >
                                    <i className={'fa-solid fa-plus'}/>
                                    <span className="hidden md-lg:block"> Create new batch </span>
                                    <span className="inline-block md-lg:hidden"> Add </span>
                                </div>
                            </ButtonFit>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col grow p-5 space-y-3.75 bg-white rounded-2xl">
                    <div className="grow">
                        <div
                            className="grow p-7.5 bg-white rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                            <AddressAndAmountAndTimeTable tokenImage={project.image} transactions={transactions}/>
                        </div>
                    </div>
                </div>
            </div>
        </ManagementAuthentication>

    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}

