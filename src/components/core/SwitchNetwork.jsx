import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import networks from "../../network/network.json";

const variants = {
    open: { opacity: 1, zIndex: 60 },
    close: { opacity: 0, transitionEnd: {zIndex: -10} }
}

export default function SwitchNetwork(props) {
  const [open, setOpen] = React.useState(false);
  const [currentNetwork, setCurrentNetwork] = React.useState(networks[0]);

  return (
    <div
      className="relative bg-white rounded-full p-4 hover:cursor-pointer"
      onClick={() => setOpen(!open)}
    >
        <div className="flex flex-row items-center space-x-2">
            <Image src={currentNetwork.icon} alt="network" width={20} height={20} />
            <span className="hidden md-lg:block">{currentNetwork.displayName}</span>
        </div>
        
        <NetworkDropdown
            open={open}
            currentNetwork={currentNetwork}
            setCurrentNetwork={setCurrentNetwork}
        />
    </div>
  );
}

export const NetworkDropdown = (props) => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={props.open ? "open" : "close"}
        transition={{ duration: .3 }}
        variants={variants} 
        className="absolute top-14 left-0 flex flex-col w-60 bg-white p-4 rounded-2xl shadow-xl"
    >
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
    </motion.div>
  );
};

export const NetworkItem = (props) => {
  return (
    <div
      className="flex flex-row items-center justify-between p-2 rounded-md hover:cursor-pointer hover:bg-gray-100"
      onClick={() => props.handleClick(props.network)}
    >
      <div className="flex flex-row gap-2">
        <Image
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
