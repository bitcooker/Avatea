import * as React from "react";

// core components
import ButtonFit from "../../src/components/core/Button/ButtonFit";

// vesting components
import ListItem from "../../src/components/pages/vesting/List/ListItem";

export default function Vesting(props) {
  return (
    <div className="flex flex-col h-[80vh] md-lg:h-[85vh] space-y-7.5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">Vesting Overview List</h1>
        <ButtonFit name="Add Vesting" icon="fa-regular fa-plus-large" />
      </div>
      <div className="grow space-y-3.75 overflow-hidden overflow-y-auto">
        <ListItem projectImage="/coins/ethImage.png" projectName="Ethereum" />
        <ListItem projectImage="/coins/dotImage.png" projectName="Dot" />
        <ListItem projectImage="/coins/bnbImage.png" projectName="BNB" />
        <ListItem projectImage="/coins/avaxImage.png" projectName="Avax" />
        <ListItem projectImage="/coins/ftmImage.png" projectName="FTM" />
        <ListItem projectImage="/coins/maticImage.png" projectName="Matic" />
        <ListItem projectImage="/coins/ethImage.png" projectName="Ethereum" />
        <ListItem projectImage="/coins/ethImage.png" projectName="Ethereum" />
      </div>
    </div>
  );
}
