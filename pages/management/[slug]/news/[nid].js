import * as React from "react";
import { useRouter } from "next/router";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import InputEmpty from "../../../../src/components/core/Input/InputEmpty";
import RichEditor from "../../../../src/components/core/RichEditor/RichEditor";

// onboarding components
import ImageDropdown from "../../../../src/components/pages/management/Linked/ImageDropdown";

export default function News(props) {
  const router = useRouter();
  const [newsImage, setNewsImage] = React.useState("");

  return (
    <div className="flex flex-col min-h-[80vh] md-lg:min-h-[85vh] space-y-7.5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">News Edit</h1>
      </div>
      <div className="flex flex-col p-7.5 bg-white gap-5 rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
        <div className="flex flex-col space-y-3.75">
          <h1 className="text-xl">News Title</h1>
          <InputEmpty id="title" name="title" placeholder="Enter News title"/>
          <ImageDropdown label="News Image" setValue={setNewsImage} />
        </div>
        <div className="grow">
          <RichEditor wrapperClassName="min-h-[15vh]"/>
        </div>
        <div className="flex flex-row justify-end gap-3.75">
          <ButtonFit name="Save" icon="fa-regular fa-check" />
          <ButtonOutlineFit name="Cancel" icon="fa-regular fa-xmark" handleClick={() => router.back()} />
        </div>
      </div>
    </div>
  );
}
