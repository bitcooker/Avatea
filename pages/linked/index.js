import * as React from "react";
import Image from "next/image";

// core components
import InputEmpty from "../../src/components/core/Input/InputEmpty";
import Select from "../../src/components/core/Select/Select";
import TextArea from "../../src/components/core/TextArea/TextArea";

// step components
import Step from "../../src/components/pages/Linked/Step";
import ImageDropdown from "../../src/components/pages/Linked/ImageDropdown";
import SocialItem from "../../src/components/pages/Linked/SocialItem";

// social icons without background
import {
  socialFacebookWithOutBG,
  socialTwitterWithOutBG,
  socialLinkedWithOutBG,
  socialTelegramWithOutBG,
} from "../../src/components/SVG";

export default function Linked(props) {
  const [step, setStep] = React.useState(1);

  return (
    <div className="flex flex-row w-full min-h-[80vh] md-lg:h-[85vh] bg-white rounded-3xl">
      {/* Background */}
      <div className="hidden md-lg:block md-lg:relative md-lg:w-1/2 md-lg:h-full">
        <div className="absolute w-full h-full">
          <svg
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.8714 0C7.5 0 0 8.5 0 23.8714V418.283H2.45327V193.416C2.45327 87.9498 87.9498 2.45327 193.416 2.45327L559.792 2.00719L559.346 0L22.8714 0Z"
              fill="#E6E6E6"
            />
          </svg>
        </div>
        <Image src="/linked/bg.svg" alt="background" layout="fill" />
        <div className="absolute bottom-0 flex justify-center w-full">
          <svg
            width="90%"
            height="3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.689453 1.57147C0.689453 2.36372 1.32567 2.99987 2.11792 2.99987H486.2C486.993 2.99987 487.629 2.36372 487.629 1.57147C487.629 0.779282 486.993 0.143066 486.2 0.143066H2.11792C1.32567 0.143066 0.689453 0.779282 0.689453 1.57147Z"
              fill="#CCCCCC"
            />
          </svg>
        </div>
      </div>
      {/* Step */}
      <div className="flex flex-col w-full md-lg:w-1/2 px-6.25 py-7.5">
        {/* Step header */}
        <h1 className="text-2xl mb-10">Create a New Project</h1>
        {/* Step 1 */}
        {step == 1 && (
          <Step title="Create Your Project" step={step} setStep={setStep}>
            <div className="flex flex-col space-y-3.75">
              <h1 className="text-xl">Project Name</h1>
              <InputEmpty
                id="projectName"
                name="projectName"
                type="text"
                placeholder="Enter Your Project Name"
              />
            </div>
          </Step>
        )}
        {/* Step 2 */}
        {step == 2 && (
          <Step title="Create Your Project" step={step} setStep={setStep}>
            <div className="flex flex-col space-y-6.25">
              <div className="flex flex-col space-y-3.75">
                <h1 className="text-xl">Project Token</h1>
                <Select
                  id="tokenName"
                  name="tokenName"
                  placeholder="Token Name"
                />
              </div>
              <div className="grid md-lg:grid-cols-2 gap-5">
                <ImageDropdown label="Token Image" />
                <ImageDropdown label="Banner Image" />
              </div>
            </div>
          </Step>
        )}
        {/* Step 3 */}
        {step == 3 && (
          <Step
            title="Add Your Project Information"
            step={step}
            setStep={setStep}
          >
            <div className="flex flex-col space-y-6.25">
              <div className="flex flex-col space-y-3.75">
                <h1 className="text-xl">Website</h1>
                <InputEmpty
                  id="website"
                  name="website"
                  placeholder="Enter Your Website"
                />
              </div>
              <div className="grid md-lg:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-3.75">
                  <h1 className="text-xl">Whitepaper</h1>
                  <InputEmpty
                    id="website"
                    name="website"
                    placeholder="Whitepager"
                  />
                </div>
                <div className="flex flex-col space-y-3.75">
                  <h1 className="text-xl">Audit</h1>
                  <InputEmpty id="website" name="website" placeholder="Audit" />
                </div>
              </div>
              <div className="flex flex-col space-y-3.75">
                <h1 className="text-xl">Description</h1>
                <TextArea
                  id="description"
                  name="description"
                  placeholder="Type here"
                />
              </div>
            </div>
          </Step>
        )}
        {step == 4 && (
          <Step
            title="Add Your Social Information"
            step={step}
            setStep={setStep}
          >
            <div className="flex flex-col space-y-6.25">
              <div className="flex flex-col space-y-3.75">
                <h1 className="text-xl">Add Social Information</h1>
                <Select
                  id="socialName"
                  name="socialName"
                  placeholder="Social Name"
                />
              </div>
              <div className="flex flex-row gap-3.75">
                <SocialItem
                  icon={socialFacebookWithOutBG}
                  bgColor="bg-indigo-400"
                />
                <SocialItem
                  icon={socialTwitterWithOutBG}
                  bgColor="bg-sky-400"
                />
                <SocialItem
                  icon={socialLinkedWithOutBG}
                  bgColor="bg-indigo-400"
                />
                <SocialItem
                  icon={socialTelegramWithOutBG}
                  bgColor="bg-sky-400"
                />
              </div>
            </div>
          </Step>
        )}
      </div>
    </div>
  );
}
