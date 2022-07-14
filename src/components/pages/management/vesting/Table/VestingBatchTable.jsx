import * as React from "react";

import {useRouter} from "next/router";

// core components
import TableRow from "../../../../core/table/TableRow";
import TableCol from "../../../../core/table/TableCol";
import {TableActionEditButton} from "../../../../core/table/TableActionButtons";
import moment from "moment";


export default function VestingBatchTable(props) {
  const router = useRouter();
  const { slug } = router.query;

  const goToBatch = async (id) => {
    router.push(`/management/${slug}/vesting/${id}`);
  };

  return (
    <div className="table flex flex-col w-full h-full">
      <div className="table-header grid grid-cols-3 md-lg:grid-cols-12 px-2 mb-5 w-full">
        <TableCol className="flex flex-row items-center space-x-5 col-span-2 md-lg:col-span-4">
          {/*<Checkbox />*/}
          <div className="flex flex-row items-center space-x-1 hover:cursor-pointer">
            <h1 className="text-base">Batch Name</h1>
            {/*<i className="fa-solid fa-chevron-down" />*/}
          </div>
        </TableCol>
        <TableCol className="flex flex-row items-center space-x-1 col-span-1 md-lg:col-span-4 hover:cursor-pointer">
          <h1 className="text-base truncate">Start Date</h1>
          {/*<i className="fa-solid fa-chevron-down" />*/}
        </TableCol>
        <TableCol className="hidden md-lg:flex flex-row items-center space-x-1 col-span-2 hover:cursor-pointer">
          <h1 className="text-base">Duration</h1>
          {/*<i className="fa-solid fa-chevron-down" />*/}
        </TableCol>
        <TableCol className="hidden md-lg:flex flex-row items-center space-x-1 col-span-2 hover:cursor-pointer">
          {/*<h1 className="text-base">View</h1>*/}
          {/*<i className="fa-solid fa-chevron-down" />*/}
        </TableCol>
      </div>
      <div className="table-body flex flex-col">
        {props.vestingBatches.map((row, index) => (
          <TableRow key={index}>
            <TableCol className="flex flex-row space-x-5 items-center col-span-2 md-lg:col-span-4">
              {/*<Checkbox />*/}
              <span className="text-base font-medium">{row.name}</span>
            </TableCol>
            <TableCol className="col-span-1 md-lg:col-span-4">
              <span className="text-base font-medium">{moment(row.start).format('LLLL')}</span>
            </TableCol>
            <TableCol className="hidden md-lg:flex flex-row items-center space-x-2.5 col-span-2">
              <i className="fa-solid fa-calendar-range text-indigo-500" />
              <span className="text-base font-medium">{row.duration} Seconds</span>
            </TableCol>
            <TableCol className="hidden md-lg:flex flex-row items-center space-x-5 col-span-2">
              <TableActionEditButton handleClick={() => goToBatch(row.id)} />
                 {row.revocable?
                         <div onClick={props.handleClick} className="flex items-center justify-center text-xs px-5 h-9 rounded-full bg-green-500 text-white hover:ring-2 hover:ring-green-500/50 transition">Revocable</div>
                         :
                         ""}
            </TableCol>
          </TableRow>
        ))}
      </div>
    </div>
  );
}


