import * as React from "react";
import { useRouter } from "next/router";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import InputEmpty from "../../../../src/components/core/Input/InputEmpty";
import RichEditor from "../../../../src/components/core/RichEditor/RichEditor";
import Tooltip from "../../../../src/components/core/Tooltip/Tooltip";

export default function News(props) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[80vh] md-lg:min-h-[85vh] space-y-7.5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">News Add </h1>
      </div>
      <div className="flex flex-col p-7.5 bg-white gap-5 rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
        <div className="flex flex-col space-y-3.75">
          <div className="flex fle-row">
            <h1 className="text-xl mr-2">News Title</h1>
              <span className="relative flex flex-col items-center justify-center group">
                <i className="fa-regular fa-circle-info text-sky-500 text-base mt-0.5" />
                <Tooltip title="This is test tooltip"/>
              </span>
          </div>
          <InputEmpty id="title" name="title" placeholder="Enter News title"/>
        </div>
        <div className="grow">
          <RichEditor wrapperClassName="min-h-[50vh]"/>
        </div>
        <div className="flex flex-row justify-end gap-3.75">
          <ButtonFit name="Add" icon="fa-regular fa-plus" />
          <ButtonOutlineFit name="Cancel" icon="fa-regular fa-xmark" handleClick={() => router.back()} />
        </div>
      </div>
    </div>
  );
}
