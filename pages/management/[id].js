import * as React from "react";

// core components
import InputEmpty from "../../src/components/core/Input/InputEmpty";
import InputWithIcon from "../../src/components/core/Input/InputWithIcon";
import InputWithIconSubmit from "../../src/components/core/Input/InputWithIconSubmit";
import Select from "../../src/components/core/Select/Select";
import TextArea from "../../src/components/core/TextArea/TextArea";
import SocialItem from "../../src/components/pages/Linked/SocialItem";
import Button from "../../src/components/core/Button/Button";

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

export default function VaultsDetail(props) {
  const [project, setProject] = React.useState({
    banner: "/projects/default.png",
    whitepaper: "",
    website: "http://www.cloud.com",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum nam blandit praesent tellus mauris quam ut. Pulvinar nunc, posuere tellus odio enim, posuere. Enim tincidunt arcu.",
    name: "Bitcoin (BTC)",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022",
  });

  return (
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
              <div className="w-full h-full">
                <img
                  src="/projects/default_banner.png"
                  className="w-full h-[85%] rounded-0.5xl"
                />
              </div>
            </div>
            {/* Edit Button */}
            <Button name="Edit Information" />
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
            <Button name="Create Market Making Pool" />
          </div>
        </Card>
      </div>
    </div>
  );
}
