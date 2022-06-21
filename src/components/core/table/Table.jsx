import * as React from "react";

const data = [
  {
    address: "Ethereum (ETH)",
    amount: 117.36,
  },
  {
    address: "Polygon (MATIC)",
    amount: 122.3,
  },
  {
    address: "Binance (BNB)",
    amount: 77.6,
  },
];

export default function Table(props) {
  return (
    <div className="table flex flex-col w-full h-full p-7.5 bg-white rounded-2xl">
      <div className="table-header grid grid-cols-12 px-2 mb-5 w-full">
        <TableCol className="flex flex-row space-x-5 col-span-4">
          <TableCheckBox />
          <div className="flex flex-row items-center space-x-1 hover:cursor-pointer">
            <h1 className="text-base">Address</h1>
            <i className="fa-solid fa-chevron-down" />
          </div>
        </TableCol>
        <TableCol className="flex flex-row items-center space-x-1 col-span-4 hover:cursor-pointer">
          <h1 className="text-base">Token Amount Per Period</h1>
          <i className="fa-solid fa-chevron-down" />
        </TableCol>
      </div>
      <div className="table-body flex flex-col">
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCol className="flex flex-row space-x-5 items-center col-span-4">
              <TableCheckBox />
              <span className="text-base font-medium">{row.address}</span>
            </TableCol>
            <TableCol className="col-span-4">
              <span className="text-base font-medium">$ {row.amount}</span>
            </TableCol>
          </TableRow>
        ))}
      </div>
    </div>
  );
}

export const TableRow = (props) => {
  return (
    <div className="grid grid-cols-12 items-center w-full h-19 px-2 border-b hover:border-0 hover:shadow-[1px_17px_44px_rgba(0,22,42,0.06)] hover:rounded-2xl hover:cursor-pointer">
      {props.children}
    </div>
  );
};

export const TableCol = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

export const TableCheckBox = (props) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return isChecked ? (
    <div
      className="flex items-center justify-center w-6 h-6 border border-indigo-500 rounded-md bg-indigo-500 hover:cursor-pointer"
      onClick={() => setIsChecked(!isChecked)}
    >
      <i className="fa-regular fa-check text-white mt-1" />
    </div>
  ) : (
    <div
      className="w-6 h-6 border border-indigo-500 rounded-md hover:cursor-pointer"
      onClick={() => setIsChecked(!isChecked)}
    ></div>
  );
};
