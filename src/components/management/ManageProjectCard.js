import Button from "../core/Button/Button";
import {useWallet} from "use-wallet";
import Card from "../pages/projectDetail/Card/Card";
import {useEffect, useState} from "react";
import helper from "../../helpers";
import InputWithIcon from "../core/Input/InputWithIcon";
import Modal from "../core/modal/Modal";
import InputEmpty from "../core/Input/InputEmpty";
import TextArea from "../core/TextArea/TextArea";
import Select from "../core/Select/Select";
import SocialItem from "../pages/Linked/SocialItem";
import {socialFacebookWithOutBG, socialLinkedWithOutBG, socialTelegramWithOutBG, socialTwitterWithOutBG} from "../SVG";
import {useRouter} from "next/router";

export default function ManageProjectCard({ project,vault }) {

    const wallet = useWallet();
    const [openEditProject, setOpenEditProject] = useState(false);
    const [rewardPerToken, setRewardPerToken] = useState("0");
    const router = useRouter();

    useEffect(() => {
        if (wallet.status === "connected" && vault.address) {
            const initWalletConnected = async () => {
                setRewardPerToken(
                    await helper.web3.vault.rewardPerToken(wallet, vault.address)
                );
            };
            initWalletConnected();
        }
    }, [wallet,vault]);



    return (

            <Card className={'col-span-2'} >
                <Modal title="Edit Project" open={openEditProject} handleClose={() => setOpenEditProject(false)}>
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
                                    placeholder={project.name}
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
                                    options={[{name: "Test"}]}
                                />
                            </div>
                            {/* Social Items */}
                            <div className="flex flex-row gap-3.75">
                                <SocialItem
                                    icon={socialFacebookWithOutBG}
                                    bgColor="bg-indigo-400"
                                />
                                <SocialItem icon={socialTwitterWithOutBG} bgColor="bg-sky-400"/>
                                <SocialItem
                                    icon={socialLinkedWithOutBG}
                                    bgColor="bg-indigo-400"
                                />
                                <SocialItem icon={socialTelegramWithOutBG} bgColor="bg-sky-400"/>
                            </div>
                        </div>
                        <div className="flex justify-between">
            <span className="text-sm">
              <i className="fa-solid fa-hands-holding-dollar"/> Reward Per
              Avatea Token Per Day
            </span>
                            <span className="flex text-base font-medium">
              <img src={project.image} className="w-6 h-6 ml-2.5 mr-2.5"/>{" "}
                                {rewardPerToken}
            </span>
                        </div>
                    </div>
                </Modal>
                <div className="card-header mb-5">
                    <h1 className="text-2xl text-center">Manage Project</h1>
                </div>
                <div className="w-full space-x-3.75 grid grid-cols-2">
                    {/* Edit Button */}
                    <Button
                        name="Edit Information"
                        handleClick={() => setOpenEditProject(true)}
                    />
                    <Button name="Edit Articles" handleClick={(e) => {router.push(`${project.slug}/news`)}}/>
                </div>
            </Card>
    )
}