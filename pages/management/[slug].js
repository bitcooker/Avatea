import * as React from "react";
import {useCallback, useEffect, useState} from "react";

// core components
import InputEmpty from "../../src/components/core/Input/InputEmpty";
import InputWithIcon from "../../src/components/core/Input/InputWithIcon";
import Select from "../../src/components/core/Select/Select";
import TextArea from "../../src/components/core/TextArea/TextArea";
import SocialItem from "../../src/components/pages/Linked/SocialItem";
import Button from "../../src/components/core/Button/Button";
import Modal from "../../src/components/core/modal/Modal";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Card from "../../src/components/pages/projectDetail/Card/Card";

// social icons without background
import {socialFacebookWithOutBG, socialLinkedWithOutBG, socialTelegramWithOutBG, socialTwitterWithOutBG,} from "../../src/components/SVG";
import {useWallet} from "use-wallet";
import {useRouter} from "next/router";
import helper from "../../src/helpers";
import InputApproveWithIconSubmit from "../../src/components/core/Input/InputApproveWithIconSubmit";
import MaxButton from "../../src/components/pages/projects/Button/MaxButton";
import {ethers} from "ethers";


export default function VaultsDetail(props) {
    const [project, setProject] = React.useState({});

    const wallet = useWallet();
    const router = useRouter();
    const [openEditProject, setOpenEditProject] = React.useState(false);
    const [CreateMMPool, setCreateMMPool] = React.useState(false);
    const [otcPercent, setOtcPercent] = React.useState(10);
    const [vault, setVault] = useState({});
    const [marketMakingPool, setMarketMakingPool] = useState({});
    const [vaultTLV, setVaultTLV] = useState('0');
    const [rewardPerToken, setRewardPerToken] = useState('0');
    const [baseTokenBalance, setBaseTokenBalance] = useState('0');
    const [pairedTokenBalance, setPairedTokenBalance] = useState('0');
    const [baseTokenWalletBalance, setBaseTokenWalletBalance] = useState('0');
    const [amountBaseTokenToStake, setAmountBaseTokenToStake] = useState('0');
    const [volume, setVolume] = useState('0');
    const [maxBuyingAmount, setMaxBuyingAmount] = useState('0');
    const [maxSellingAmount, setMaxSellingAmount] = useState('0');


    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        if (props.marketMakingPool) setMarketMakingPool(props.marketMakingPool);
        if (props.vault) setVault(props.vault); else {
            const fetchProject = async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
                setMarketMakingPool(result?.marketMakingPool);
                setVault(result?.vault);
            };
            fetchProject();
        }
    }, []);

    useEffect(() => {
        if (wallet.status === "connected" && vault.address) {
            const initWalletConnected = async () => {
                setVaultTLV(helper.formatting.web3Format(await helper.web3.vault.totalSupply(wallet, vault.address)));
                setRewardPerToken(await helper.web3.vault.rewardPerToken(wallet, vault.address));
                setBaseTokenBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, project.token, marketMakingPool.address)));
                setPairedTokenBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, marketMakingPool.paired_token, marketMakingPool.address)));
                setBaseTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, project.token, wallet.account)));
            };
            initWalletConnected();
        }
    }, [wallet, vault, marketMakingPool]);

    useEffect(() => {
        setMaxSellingAmount(marketMakingPool.max_selling_amount)
        setMaxBuyingAmount(marketMakingPool.max_buying_amount)
        setVolume(marketMakingPool.volume)
    }, [marketMakingPool.max_buying_amount]);

    const addReward = async () => {
        const wei = ethers.utils.parseEther(amountBaseTokenToStake);
        let success = await helper.web3.vault.addReward(wallet, vault.address, wei);
    };

    const updateMarketMakingPool = async () => {
        const settings = {
            volume: volume,
            max_selling_amount: maxBuyingAmount,
            max_buying_amount: maxSellingAmount,
            id: marketMakingPool.id,
        };

        await helper.marketMaking.updateMarketMakingPool({
            settings, wallet
        });
    };


    const setMax = useCallback(async (amount, setter) => {
        setter(amount);
    }, []);


    return (<div>
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
                            <div
                                className="absolute flex items-center justify-center w-9 h-9 top-[15px] right-[15px] text-white rounded-full bg-purple-900/50 hover:cursor-pointer hover:bg-purple-900/80 transition">
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

        {/* Create Market making pool */}
        <Modal
            title="Create a Market Making pool"
            size="sm"
            open={CreateMMPool}
            handleClose={() => setCreateMMPool(false)}
        >
            <div className="card-content space-y-3.75">
                {/* Pair Token */}
                <div className="w-full space-y-2.5">
                    <span className="text-base">Pair Token</span>
                    <InputWithIcon
                        id="editPairToken"
                        name="editPairToken"
                        type="number"
                        placeholder="0"
                    />
                </div>
                {/* Max buying amount & Max selling amount */}
                <div className="w-full py-2 grid md-lg:grid-cols-2 gap-3.75">
                    <div className="w-full space-y-2.5">
                        <span className="text-base">Max Buying Amount per day</span>
                        <InputWithIcon
                            id="editMaxBuyingAmount"
                            name="editMaxBuyingAmount"
                            type="number"
                            placeholder="0"
                        />
                    </div>
                    <div className="w-full space-y-2.5">
                        <span className="text-base">Max Selling Amount per day</span>
                        <InputWithIcon
                            id="editMaxSellingAmount"
                            name="editMaxSellingAmount"
                            type="number"
                            placeholder="0"
                                                        image={project.image}
                        />
                    </div>
                </div>
                <div className="w-full space-y-2.5">
                    <span className="text-base">Volume per day</span>
                    <InputWithIcon
                        id="editPairToken"
                        name="editPairToken"
                        type="number"
                        placeholder="0"
                        image={project.image}
                    />
                </div>


                <Button name="Save Information"/>
            </div>
        </Modal>
        <div className="space-y-7.5">
            <Banner {...project} />

            <div className="grid md-lg:grid-cols-2 gap-3.75">
                <Card>
                    {vault.address ? <div className="flex flex-col p-3.75 space-y-4">
                        <h1 className="text-base text-center">Vault</h1>
                        <div className="flex justify-between">
                            <span className="text-sm"><i className="fa-solid fa-money-bill-transfer"/> TVL</span>
                            <span className="flex text-base font-medium">
                                    <img
                                        src="/avatea-token.png"
                                        className="w-6 h-6 ml-2.5 mr-2.5"
                                    /> {vaultTLV}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm"><i className="fa-solid fa-hands-holding-dollar"/> Reward Per Avatea Token Per Day</span>
                            <span className="flex text-base font-medium">
                                    <img
                                        src={project.image}
                                        className="w-6 h-6 ml-2.5 mr-2.5"
                                    /> {rewardPerToken}
                            </span>
                        </div>

                        <div className="flex flex-row items-center justify-between text-base">
                            <div>
                                <i className="fa-solid fa-coin"/> Add rewards
                            </div>
                            <span>
                        {baseTokenWalletBalance} &nbsp;
                                <MaxButton
                                    handleClick={() => setMax(baseTokenWalletBalance, setAmountBaseTokenToStake)}
                                />
                      </span>
                        </div>
                        <InputApproveWithIconSubmit
                            id="cash"
                            name="cash"
                            type="number"
                            icon="fa-light fa-circle-plus"
                            submitName="Deposit"
                            image={project.image}
                            submitFunction={addReward}
                            value={amountBaseTokenToStake}
                            setValue={setAmountBaseTokenToStake}
                            address={vault.address}
                            token={project.token}
                        />


                    </div> : <div className="flex flex-col p-3.75 space-y-4">
                        <h1 className="text-base text-center">No Vault created</h1>
                        <Button name="Request a vault"/>
                    </div>}
                </Card>
                <Card>
                    {marketMakingPool.address ? <div className="flex flex-col p-3.75 space-y-4">
                            <h1 className="text-base text-center">Market Making Pool</h1>
                            <div className="flex justify-between">
                                <span className="text-sm"><i className="fa-solid fa-money-bill-transfer"/> TVL</span>
                                <span className="flex text-base font-medium">
                                    <img
                                        src={project.image}
                                        className="w-6 h-6 mr-2.5"
                                    />
                                    {baseTokenBalance}
                                    <img
                                        src={marketMakingPool.paired_token_image}
                                        className="w-6 h-6 ml-2.5 mr-2.5"
                                    /> {pairedTokenBalance}
                            </span>
                            </div>
                            <div className="w-full py-2 grid md-lg:grid-cols-2 gap-3.75">
                                <div className="w-full space-y-2.5">
                                    <span className="text-base">Max Buying Amount per day</span>
                                    <InputWithIcon
                                        id="editMaxBuyingAmount"
                                        name="editMaxBuyingAmount"
                                        type="number"
                                        value={maxBuyingAmount}
                                        setValue={setMaxBuyingAmount}
                                        image={marketMakingPool.paired_token_image}
                                    />
                                </div>
                                <div className="w-full space-y-2.5">
                                    <span className="text-base">Max Selling Amount per day</span>
                                    <InputWithIcon
                                        id="editMaxSellingAmount"
                                        name="editMaxSellingAmount"
                                        type="number"
                                        value={maxSellingAmount}
                                        setValue={setMaxSellingAmount}
                                        image={project.image}
                                    />
                                </div>
                            </div>
                            <div className="w-full space-y-2.5">
                                <span className="text-base">Volume</span>
                                <InputWithIcon
                                    id="editPairToken"
                                    name="editPairToken"
                                    type="number"
                                    value={volume}
                                    setValue={setVolume}
                                    image={project.image}/>
                            </div>
                            <Button
                                name="Update Market Making Pool"
                                handleClick={updateMarketMakingPool}
                            />
                        </div> :
                        <div className="flex flex-col p-3.75 space-y-4">
                            <h1 className="text-base text-center">No Market Making Pool created</h1>
                            <Button
                                name="Create Market Making Pool"
                                handleClick={() => setCreateMMPool(true)}
                            />
                        </div>

                    }
                </Card>
            </div>

            <Card>
                <div className="card-header mb-5">
                    <h1 className="text-2xl">Manage Project</h1>
                </div>
                <div className="card-content grid md-lg:grid-cols-2 gap-3.75">
                    {/* left */}
                    <div className="w-full space-y-3.75">
                        {/* Edit Button */}
                        <Button
                            name="Edit Information"
                            handleClick={() => setOpenEditProject(true)}
                        />
                        <Button
                            name="Edit Articles"
                        />
                    </div>
                    {/* right */}
                    <div className="flex flex-col w-full space-y-3.75">
                        {/* Edit Button */}
                        <Button
                            name="Create Vesting schedules"
                        />
                        <Button
                            name="Stake for participants"
                        />
                    </div>
                </div>
            </Card>

        </div>
    </div>);
}

export async function getServerSideProps(context) {
    const {slug} = context.query;
    if (slug !== "undefined") {
        let projectDetails;
        try {
            projectDetails = await helper.project.getProject(slug);
        } catch (e) {
            console.log(e);
            projectDetails = null;
        }
        return {
            props: {
                projectDetail: projectDetails?.project, marketMakingPool: projectDetails?.marketMakingPool, vault: projectDetails?.vault,
            },
        };
    } else {
        return {
            props: {
                projectDetail: null, marketMakingPool: null, vault: null,
            },
        };
    }
}
