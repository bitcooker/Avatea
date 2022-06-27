import * as React from "react";

export default function AddressAndAmountTable(props) {
  return (
    <div className="table flex flex-col w-full h-full">
      <div className="table-header grid grid-cols-3 md-lg:grid-cols-12 px-2 mb-5 w-full">
        <TableCol className="flex flex-row items-center space-x-5 col-span-2 md-lg:col-span-4">
          <div className="flex flex-row items-center space-x-1 hover:cursor-pointer">
            <h1 className="text-base">Address</h1>
          </div>
        </TableCol>
        <TableCol className="hidden md-lg:flex flex-row items-center space-x-1 col-span-2 hover:cursor-pointer">
          <h1 className="text-base">Total amount vested</h1>
        </TableCol>
      </div>
      <div className="table-body flex flex-col">
        {props.addresses.map((row, index) => (
          <TableRow key={index}>
            <TableCol className="flex flex-row space-x-2 items-center col-span-2 md-lg:col-span-4">
              <span className="text-base font-medium">{row}</span>
            </TableCol>
            <TableCol className="col-span-1 md-lg:col-span-4">
              <span className="text-base font-medium">{props.amounts[index]} {props.project.ticker}</span>
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


