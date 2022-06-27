import * as React from "react";
import helper from "../../../helpers";
import Swal from "sweetalert2";
import {useRouter} from "next/router";


export default function VestingBatchTable(props) {
  return (
    <div className="table flex flex-col w-full h-full">
      <div className="table-header grid grid-cols-3 md-lg:grid-cols-12 px-2 mb-5 w-full">
        <TableCol className="flex flex-row items-center space-x-5 col-span-2 md-lg:col-span-4">
          {/*<Checkbox />*/}
          <div className="flex flex-row items-center space-x-1 hover:cursor-pointer">
            <h1 className="text-base">Batch Name</h1>
            <i className="fa-solid fa-chevron-down" />
          </div>
        </TableCol>
        <TableCol className="flex flex-row items-center space-x-1 col-span-1 md-lg:col-span-4 hover:cursor-pointer">
          <h1 className="text-base truncate">Start timestamp</h1>
          <i className="fa-solid fa-chevron-down" />
        </TableCol>
        <TableCol className="hidden md-lg:flex flex-row items-center space-x-1 col-span-2 hover:cursor-pointer">
          <h1 className="text-base">Duration</h1>
          <i className="fa-solid fa-chevron-down" />
        </TableCol>
        <TableCol className="hidden md-lg:flex flex-row items-center space-x-1 col-span-2 hover:cursor-pointer">
          <h1 className="text-base">View</h1>
          <i className="fa-solid fa-chevron-down" />
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
              <span className="text-base font-medium">{row.start} (UNIX)</span>
            </TableCol>
            <TableCol className="hidden md-lg:flex flex-row items-center space-x-2.5 col-span-2">
              <i className="fa-solid fa-calendar-range text-indigo-500" />
              <span className="text-base font-medium">{row.duration} Seconds</span>
            </TableCol>
            <TableCol className="hidden md-lg:flex flex-row items-center space-x-5 col-span-2">
              <TableActionEditButton batchID={row.id} project={props.project} />
            </TableCol>
          </TableRow>
        ))}
      </div>
    </div>
  );
}

export const TableRow = (props) => {
  return (
    <div className="grid grid-cols-3 md-lg:grid-cols-12 items-center w-full h-19 px-2 border-b hover:border-0 hover:shadow-[1px_17px_44px_rgba(0,22,42,0.06)] hover:rounded-2xl">
      {props.children}
    </div>
  );
};

export const TableCol = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

export const TableActionEditButton = (props) => {
  const router = useRouter();

    const goToBatch = async (id) => {
            router.push(`/management/${props.project.slug}/vesting/${id}`);
    };

  return (
    <div onClick={() => goToBatch(props.batchID)} className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100/50 hover:ring-2 hover:ring-red-200/50 hover:cursor-pointer transition">
      <i className="fa-solid fa-pen-line text-red-500" />
    </div>
  );
};


