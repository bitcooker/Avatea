import * as React from "react";
import {useRouter} from "next/router";

// core components
import TableRow from "../../../../core/table/TableRow";
import TableCol from "../../../../core/table/TableCol";
import {TableActionEditButton} from "../../../../core/table/TableActionButtons";
import hashicon from "hashicon";
import Image from "next/image";


export default function VestingTable(props) {
    const router = useRouter();
    const {slug,id} = router.query;


    const goToVesting = async (userAddress) => {
        router.push(`/management/${slug}/vesting/${id}/user/${userAddress}`);
    };

    return (
        <div className="table flex flex-col w-full h-full">
            <div className="table-header grid grid-cols-3 md-lg:grid-cols-12 px-2 mb-5 w-full">
                <TableCol className="flex flex-row items-center col-span-2 md-lg:col-span-10 hover:cursor-pointer">
                    {/*<Checkbox />*/}
                    <div className="flex flex-row items-center space-x-1">
                        <h1 className="text-base">User Address</h1>
                        {/*<i className="fa-solid fa-chevron-down"/>*/}
                    </div>
                </TableCol>
                <TableCol className="flex flex-row items-center space-x-1 col-span-1 md-lg:col-span-2 hover:cursor-pointer">
                    {/*<h1 className="text-base">View</h1>*/}
                    {/*<i className="fa-solid fa-chevron-down"/>*/}
                </TableCol>
            </div>
            <div className="table-body flex flex-col">
                {props.vestingBatches.map((row, index) => (
                    <TableRow key={index}>
                        <TableCol className="flex flex-row items-center col-span-2 md-lg:col-span-10">
                            {/*<Checkbox />*/}
                            <Image
                                    src={hashicon(
                                            row.user_address
                                    ).toDataURL()}
                                    alt="hashicon"
                                    width={18}
                                    height={18}
                            />
                            <span className="ml-2 truncate text-base font-medium">{row.user_address}</span>
                        </TableCol>
                        <TableCol className="flex flex-row items-center col-span-1 md-lg:col-span-2">
                            <TableActionEditButton handleClick={() => goToVesting(row.user_address)}/>
                        </TableCol>
                    </TableRow>
                ))}
            </div>
        </div>
    );
}