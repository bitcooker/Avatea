import * as React from "react";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";

import ButtonFit from "../../../../src/components/core/Button/ButtonFit";

export default function VestingAdd(props) {
  const [isSSR, setIsSSR] = React.useState(true);
  // Get production API keys from Upload.io
  const uploader = new Uploader({
    apiKey: "free",
  });

  // Customize the dropzone UI (see "customization"):
  const options = { multi: true };

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <div className="relative flex flex-col h-[70vh] md-lg:h-[85vh] space-y-7.5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">Vesting Overview</h1>
        <div className="absolute w-full -bottom-16 md-lg:w-fit md-lg:static">
          <ButtonFit
            name="Download CSV Template"
            icon="fa-solid fa-cloud-arrow-up"
          />
        </div>
      </div>
      <div className="grow space-y-3.75 bg-white rounded-2xl">
        {!isSSR && (
          <UploadDropzone
            uploader={uploader} // Required.
            options={options} // Optional.
            width="100%" // Optional.
            height="100%" // Optional.
            onUpdate={(files) => {
              // Optional.
              if (files.length === 0) {
                console.log("No files selected.");
              } else {
                console.log("Files uploaded:");
                console.log(files.map((f) => f.fileUrl));
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
