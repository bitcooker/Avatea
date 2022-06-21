import * as React from "react";

// core components
import Table from "../../src/components/core/table/Table";
import ButtonFit from "../../src/components/core/Button/ButtonFit";

export default function VestingOverview(props) {
  return (
    <div className="flex flex-col h-[85vh] space-y-7.5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">Vesting Overview</h1>

        <ButtonFit name="Submit Vesting" icon="fa-solid fa-cloud-arrow-up" />
      </div>
      <div className="grow">
        <Table />
      </div>
    </div>
  );
}
