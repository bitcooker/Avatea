import * as React from "react";

// core components
import Checkbox from "../Checkbox/Checkbox";

const data = [
  {
    address: "Ethereum (ETH)",
    amount: 117.36,
    period: "19 Dec, 2022",
  },
  {
    address: "Polygon (MATIC)",
    amount: 122.3,
    period: "19 Dec, 2022",
  },
  {
    address: "Binance (BNB)",
    amount: 77.6,
    period: "19 Dec, 2022",
  },
  {
    address: "Fantom (FTM)",
    amount: 324.33,
    period: "19 Dec, 2022",
  },
  {
    address: "Avalanche (AVAX)",
    amount: 117.36,
    period: "19 Dec, 2022",
  },
  {
    address: "Polkadot (DOT)",
    amount: 52.29,
    period: "19 Dec, 2022",
  },
  {
    address: "Binance (BNB)",
    amount: 77.6,
    period: "19 Dec, 2022",
  },
  {
    address: "Binance (BNB)",
    amount: 77.6,
    period: "19 Dec, 2022",
  },
  {
    address: "Fantom (FTM)",
    amount: 324.33,
    period: "19 Dec, 2022",
  },
  {
    address: "Avalanche (AVAX)",
    amount: 117.36,
    period: "19 Dec, 2022",
  },
];

export default function Table(props) {
  return (
    <div className="table flex flex-col w-full h-full">
      <div className="table-header grid grid-cols-3 md-lg:grid-cols-12 px-2 mb-5 w-full">
        <TableCol className="flex flex-row items-center space-x-5 col-span-2 md-lg:col-span-4">
          <Checkbox />
          <div className="flex flex-row items-center space-x-1 hover:cursor-pointer">
            <h1 className="text-base">Address</h1>
            <i className="fa-solid fa-chevron-down" />
          </div>
        </TableCol>
        <TableCol className="flex flex-row items-center space-x-1 col-span-1 md-lg:col-span-4 hover:cursor-pointer">
          <h1 className="text-base truncate">Token Amount Per Period</h1>
          <i className="fa-solid fa-chevron-down" />
        </TableCol>
        <TableCol className="hidden md-lg:flex flex-row items-center space-x-1 col-span-2 hover:cursor-pointer">
          <h1 className="text-base">Period</h1>
          <i className="fa-solid fa-chevron-down" />
        </TableCol>
        <TableCol className="hidden md-lg:flex flex-row items-center space-x-1 col-span-2 hover:cursor-pointer">
          <h1 className="text-base">Action</h1>
          <i className="fa-solid fa-chevron-down" />
        </TableCol>
      </div>
      <div className="table-body flex flex-col">
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCol className="flex flex-row space-x-5 items-center col-span-2 md-lg:col-span-4">
              <Checkbox />
              <span className="text-base font-medium">{row.address}</span>
            </TableCol>
            <TableCol className="col-span-1 md-lg:col-span-4">
              <span className="text-base font-medium">$ {row.amount}</span>
            </TableCol>
            <TableCol className="hidden md-lg:flex flex-row items-center space-x-2.5 col-span-2">
              <i className="fa-solid fa-calendar-range text-indigo-500" />
              <span className="text-base font-medium">{row.period}</span>
            </TableCol>
            <TableCol className="hidden md-lg:flex flex-row items-center space-x-5 col-span-2">
              <TableActionEditButton />
              <TableActionDeleteButton />
              <TableActionMoreButton />
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
  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100/50 hover:ring-2 hover:ring-red-200/50 hover:cursor-pointer transition">
      <i className="fa-solid fa-pen-line text-red-500" />
    </div>
  );
};

export const TableActionDeleteButton = (props) => {
  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100/50 hover:ring-2 hover:ring-red-200/50 hover:cursor-pointer transition">
      <i className="fa-solid fa-trash text-red-500" />
    </div>
  );
};

export const TableActionMoreButton = (props) => {
  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 hover:ring-2 hover:ring-gray-200/50 hover:cursor-pointer transition">
      <i className="fa-solid fa-ellipsis-vertical text-gray-500" />
    </div>
  );
};
