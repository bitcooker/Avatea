/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import networks from "../../network/network.json";

export default function SwitchNetwork(props) {
  const [open, setOpen] = React.useState(false);
  const [currentNetwork, setCurrentNetwork] = React.useState(networks[0]);

  return (
    <div
      className="relative bg-white rounded-full p-4 hover:cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex flex-row items-center space-x-2">
        <img src={currentNetwork.icon} alt="network" width={20} height={20} />
        <span className="hidden md-lg:block">{currentNetwork.displayName}</span>
        {open ? (
          <i className="fa-regular fa-chevron-up mt-1"></i>
        ) : (
          <i className="fa-regular fa-chevron-down mt-1"></i>
        )}
      </div>
      {open && (
        <NetworkDropdown
          currentNetwork={currentNetwork}
          setCurrentNetwork={setCurrentNetwork}
        />
      )}
    </div>
  );
}

export const NetworkDropdown = (props) => {
  return (
    <div className="absolute z-10 top-14 left-0 flex flex-col w-60 bg-white p-4 rounded-2xl shadow-xl">
      <h1 className="text-base">Select a network</h1>
      <div className="flex flex-col space-y-2">
        {networks.map((network, index) => (
          <NetworkItem
            network={network}
            key={index}
            currentNetwork={props.currentNetwork}
            handleClick={props.setCurrentNetwork}
          />
        ))}
      </div>
    </div>
  );
};

export const NetworkItem = (props) => {
  return (
    <div
      className="flex flex-row items-center justify-between p-2 rounded-md hover:cursor-pointer hover:bg-gray-100"
      onClick={() => props.handleClick(props.network)}
    >
      <div className="flex flex-row gap-1">
        <img
          src={props.network.icon}
          alt="network_item"
          width={20}
          height={20}
        />
        <span>{props.network.displayName}</span>
      </div>
      {props.currentNetwork.networkName == props.network.networkName && (
        <div className="state w-2.5 h-2.5 rounded-full bg-green-500"></div>
      )}
    </div>
  );
};
