import * as React from "react";

// core components
import InputEmpty from "../../src/components/core/Input/InputEmpty";
import InputWithIcon from "../../src/components/core/Input/InputWithIcon";
import Select from "../../src/components/core/Select/Select";
import TextArea from "../../src/components/core/TextArea/TextArea";
import SocialItem from "../../src/components/pages/Linked/SocialItem";
import Button from "../../src/components/core/Button/Button";
import Modal from "../../src/components/core/modal/Modal";
import RangeSlider from "../../src/components/core/RangeSlider/RangeSlider";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Card from "../../src/components/pages/projectDetail/Card/Card";

// social icons without background
import {
  socialFacebookWithOutBG,
  socialTwitterWithOutBG,
  socialLinkedWithOutBG,
  socialTelegramWithOutBG,
} from "../../src/components/SVG";

const SOCIALDATA = [
  {
    name: "LinkedIn",
    value: "social_linkedin",
    icon: "linkedin",
    color: "bg-indigo-400",
  },
  {
    name: "Facebook",
    value: "social_facebook",
    icon: "facebook-f",
    color: "bg-indigo-400",
  },
  {
    name: "Github",
    value: "social_github",
    icon: "github",
    color: "bg-indigo-400",
  },
  {
    name: "Telegram",
    value: "social_telegram",
    icon: "telegram",
    color: "bg-sky-400",
  },
  {
    name: "Discord",
    value: "social_discord",
    icon: "discord",
    color: "bg-indigo-400",
  },
  {
    name: "Medium",
    value: "social_medium",
    icon: "medium",
    color: "bg-indigo-400",
  },
  {
    name: "Twitter",
    value: "social_twitter",
    icon: "twitter",
    color: "bg-sky-400",
  },
];

export default function VaultsDetail(props) {
  const [project, setProject] = React.useState({
    banner: "/projects/default.png",
    whitepaper: "",
    website: "http://www.cloud.com",
    description: "Lorem ipsum dolor sit",
    name: "Bitcoin (BTC)",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022",
  });

  const [openEditProject, setOpenEditProject] = React.useState(false);
  const [openEditMMPool, setOpenEditMMPool] = React.useState(false);
  const [otcPercent, setOtcPercent] = React.useState(10);

  return (
    <div>
      {/* Edit project modal */}
      <Modal
        title="Edit Project"
        open={openEditProject}
        handleClose={() => setOpenEditProject(false)}
      >
        <div className="card-content grid md-lg:grid-cols-2 gap-3.75">
          {/* left */}
          <div className="w-full space-y-3.75">
            {/* Project name */}
            <div className="w-full space-y-2.5">
              <span className="text-base">Project Name</span>
              <InputEmpty
                id="projectName"
                name="projectName"
                type="text"
                placeholder="Project Name Here"
              />
            </div>
            {/* Pair Token & Base Token */}
            <div className="grid md-lg:grid-cols-2 gap-3.75">
              <div>
                <span className="text-base">Pair Token</span>
                <InputWithIcon
                  id="pairToken"
                  name="pairToken"
                  type="number"
                  placeholder="2324"
                />
              </div>
              <div>
                <span className="text-base">Base Token</span>
                <InputWithIcon
                  id="baseToken"
                  name="baseToken"
                  type="number"
                  placeholder="2324"
                />
              </div>
            </div>
            {/* Description */}
            <div className="flex flex-col space-y-3.75">
              <h1 className="text-base">Description</h1>
              <TextArea
                id="description"
                name="description"
                placeholder="Type here"
              />
            </div>
            {/* Add Social Information */}
            <div className="flex flex-col space-y-3.75">
              <h1 className="text-base">Add Social Information</h1>
              <Select
                id="socialName"
                name="socialName"
                placeholder="Social Name"
                options={SOCIALDATA}
              />
            </div>
            {/* Social Items */}
            <div className="flex flex-row gap-3.75">
              <SocialItem
                icon={socialFacebookWithOutBG}
                bgColor="bg-indigo-400"
              />
              <SocialItem icon={socialTwitterWithOutBG} bgColor="bg-sky-400" />
              <SocialItem
                icon={socialLinkedWithOutBG}
                bgColor="bg-indigo-400"
              />
              <SocialItem icon={socialTelegramWithOutBG} bgColor="bg-sky-400" />
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col w-full space-y-3.75">
            {/* Project name */}
            <div className="w-full space-y-2.5">
              <span className="text-base">Website</span>
              <InputEmpty
                id="projectName"
                name="projectName"
                type="text"
                placeholder="Enter Your Website"
              />
            </div>
            {/* Whitepaper & Audit */}
            <div className="grid md-lg:grid-cols-2 gap-3.75">
              <div>
                <span className="text-base">Whitepaper</span>
                <InputEmpty
                  id="whitepager"
                  name="whitepager"
                  type="text"
                  placeholder="Whitepager"
                />
              </div>
              <div>
                <span className="text-base">Audit</span>
                <InputEmpty
                  id="audit"
                  name="audit"
                  type="text"
                  placeholder="Audit"
                />
              </div>
            </div>
            {/* Inside Banner */}
            <div className="grow w-full space-y-3.75">
              <span className="text-base">Banner</span>
              <div className="relative w-full">
                <img
                  src="/projects/default_banner.png"
                  className="w-full h-[85%] rounded-0.5xl"
                />
                <div className="absolute flex items-center justify-center w-9 h-9 top-[15px] right-[15px] text-white rounded-full bg-purple-900/50 hover:cursor-pointer hover:bg-purple-900/80 transition">
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
              <h1 className="text-base text-center">
                Upload a New Banner or{" "}
                <span className="text-indigo-500 hover:cursor-pointer">
                  {" "}
                  Browse
                </span>
              </h1>
            </div>
            {/* Edit Button */}
            <Button
              name="Save Information"
              handleClick={() => setOpenEditProject(true)}
            />
          </div>
        </div>
      </Modal>

      {/* Edit Market making pool */}
      <Modal
        title="Edit Market Making"
        size="sm"
        open={openEditMMPool}
        handleClose={() => setOpenEditMMPool(false)}
      >
        <div className="card-content space-y-3.75">
          {/* Base Token */}
          <div className="w-full space-y-2.5">
            <span className="text-base">Base Token</span>
            <InputWithIcon
              id="editBaseToken"
              name="editBaseToken"
              type="number"
              placeholder="2324"
            />
          </div>
          {/* Pair Token */}
          <div className="w-full space-y-2.5">
            <span className="text-base">Pair Token</span>
            <InputWithIcon
              id="editPairToken"
              name="editPairToken"
              type="number"
              placeholder="2324"
            />
          </div>
          {/* OTC RangeSlider */}
          <div className="w-full space-y-16">
            <span className="text-base">OTC Ratio</span>
            <RangeSlider percent={otcPercent} setPercent={setOtcPercent} />
          </div>
          {/* Max buying amount & Max selling amount */}
          <div className="w-full py-2 grid md-lg:grid-cols-2 gap-3.75">
            <div className="w-full space-y-2.5">
              <span className="text-base">Max Buying Amount</span>
              <InputWithIcon
                id="editMaxBuyingAmount"
                name="editMaxBuyingAmount"
                type="number"
                placeholder="1234"
              />
            </div>
            <div className="w-full space-y-2.5">
              <span className="text-base">Max Selling Amount</span>
              <InputWithIcon
                id="editMaxSellingAmount"
                name="editMaxSellingAmount"
                type="number"
                placeholder="1234"
              />
            </div>
          </div>

          <Button name="Save Information" />
        </div>
      </Modal>
      <div className="space-y-7.5">
        <Banner {...project} />

        <Card>
          <div className="card-header mb-5">
            <h1 className="text-2xl">Manage Project</h1>
          </div>
          <div className="card-content grid md-lg:grid-cols-2 gap-3.75">
            {/* left */}
            <div className="w-full space-y-3.75">
              {/* Project name */}
              <div className="w-full space-y-2.5">
                <span className="text-base">Project Name</span>
                <InputEmpty
                  id="projectName"
                  name="projectName"
                  type="text"
                  placeholder="Project Name Here"
                />
              </div>
              {/* Pair Token & Base Token */}
              <div className="grid md-lg:grid-cols-2 gap-3.75">
                <div>
                  <span className="text-base">Pair Token</span>
                  <InputWithIcon
                    id="pairToken"
                    name="pairToken"
                    type="number"
                    placeholder="2324"
                  />
                </div>
                <div>
                  <span className="text-base">Base Token</span>
                  <InputWithIcon
                    id="baseToken"
                    name="baseToken"
                    type="number"
                    placeholder="2324"
                  />
                </div>
              </div>
              {/* Description */}
              <div className="flex flex-col space-y-3.75">
                <h1 className="text-base">Description</h1>
                <TextArea
                  id="description"
                  name="description"
                  placeholder="Type here"
                />
              </div>
              {/* Add Social Information */}
              <div className="flex flex-col space-y-3.75">
                <h1 className="text-base">Add Social Information</h1>
                <Select
                  id="socialName"
                  name="socialName"
                  placeholder="Social Name"
                  options={SOCIALDATA}
                />
              </div>
              {/* Social Items */}
              <div className="flex flex-row gap-3.75">
                <SocialItem icon="facebook-f" bgColor="bg-indigo-400" />
                <SocialItem icon="twitter" bgColor="bg-sky-400" />
                <SocialItem icon="linkedin" bgColor="bg-indigo-400" />
                <SocialItem icon="telegram" bgColor="bg-sky-400" />
              </div>
            </div>
            {/* right */}
            <div className="flex flex-col w-full space-y-3.75">
              {/* Project name */}
              <div className="w-full space-y-2.5">
                <span className="text-base">Website</span>
                <InputEmpty
                  id="projectName"
                  name="projectName"
                  type="text"
                  placeholder="Enter Your Website"
                />
              </div>
              {/* Whitepaper & Audit */}
              <div className="grid md-lg:grid-cols-2 gap-3.75">
                <div>
                  <span className="text-base">Whitepaper</span>
                  <InputEmpty
                    id="whitepager"
                    name="whitepager"
                    type="text"
                    placeholder="Whitepager"
                  />
                </div>
                <div>
                  <span className="text-base">Audit</span>
                  <InputEmpty
                    id="audit"
                    name="audit"
                    type="text"
                    placeholder="Audit"
                  />
                </div>
              </div>
              {/* Inside Banner */}
              <div className="grow w-full space-y-3.75">
                <span className="text-base">Banner</span>
                <div className="w-full h-full">
                  <img
                    src="/projects/default_banner.png"
                    className="w-full h-[85%] rounded-0.5xl"
                  />
                </div>
              </div>
              {/* Edit Button */}
              <Button
                name="Edit Information"
                handleClick={() => setOpenEditProject(true)}
              />
            </div>
          </div>
        </Card>

        <div className="grid md-lg:grid-cols-2 gap-3.75">
          <Card>
            <div className="flex flex-col p-3.75 space-y-4">
              <h1 className="text-base text-center">Nothing See Yeat</h1>
              <Button name="Create Vault" />
            </div>
          </Card>
          <Card>
            <div className="flex flex-col p-3.75 space-y-4">
              <h1 className="text-base text-center">Nothing See Yeat</h1>
              <Button
                name="Create Market Making Pool"
                handleClick={() => setOpenEditMMPool(true)}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
