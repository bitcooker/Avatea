import Button from "../../core/Button/Button";
import {useWallet} from "use-wallet";
import Card from "../projectDetail/Card/Card";
import {useCallback, useEffect, useState} from "react";
import helper from "../../../helpers";
import InputWithIcon from "../../core/Input/InputWithIcon";
import MarketMakingDeployment from "./MarketMakingDeployment";
import Modal from "../../core/modal/Modal";
import {useRouter} from "next/router";

export default function MarketMakingCard({project, marketMakingPool}) {

    const wallet = useWallet();
    const router = useRouter();
    const [baseTokenBalance, setBaseTokenBalance] = useState("0");
    const [pairedTokenBalance, setPairedTokenBalance] = useState("0");
    const [maxBuyingAmount, setMaxBuyingAmount] = useState("0");
    const [maxSellingAmount, setMaxSellingAmount] = useState("0");
    const [volume, setVolume] = useState("0");
    const [createMMPool, setCreateMMPool] = useState(false);

    useEffect(() => {
        if (wallet.status === "connected" && marketMakingPool?.address) {
            const initWalletConnected = async () => {
                setBaseTokenBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(
                            wallet,
                            project.token,
                            marketMakingPool.address
                        ) || '0'
                    )
                );
                setPairedTokenBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(
                            wallet,
                            marketMakingPool.paired_token,
                            marketMakingPool.address
                        ) || '0'
                    )
                );
            };
            initWalletConnected();
        }
    }, [wallet, marketMakingPool,project]);

    const updateMarketMakingPool = useCallback(async () => {
        const settings = {
            volume,
            max_selling_amount: maxBuyingAmount,
            max_buying_amount: maxSellingAmount,
            id: marketMakingPool.id,
        };

        await helper.marketMaking.updateMarketMakingPool({
            settings,
            wallet,
        });
    }, [volume, maxBuyingAmount, maxSellingAmount, marketMakingPool, wallet]);


    useEffect(() => {
        setMaxSellingAmount(marketMakingPool?.max_selling_amount);
        setMaxBuyingAmount(marketMakingPool?.max_buying_amount);
        setVolume(marketMakingPool?.volume);
    }, [marketMakingPool]);


    return (

        <Card className={'col-span-full md:col-span-1'}>
            <Modal
                title="Create a Market Making pool"
                size="sm"
                open={createMMPool}
                handleClose={() => setCreateMMPool(false)}
            >
                <MarketMakingDeployment project={project}/>
            </Modal>
            {marketMakingPool?.address ? (
                <div className="flex flex-col p-3.75 space-y-4">
                    <h2 className="text-2xl"><i className="fa-solid fa-sliders"/> Market Making Pool</h2>

                    <div className="flex justify-between">
                      <span className="text-sm">
                        <i className="fa-solid fa-money-bill-transfer"/> TVL
                      </span>
                        <span className="flex text-base font-medium">
                        <img src={project.image} className="w-6 h-6 mr-2.5"/>
                            {baseTokenBalance}
                            <img
                                src={marketMakingPool.paired_token_image}
                                className="w-6 h-6 ml-2.5 mr-2.5"
                            />{" "}
                            {pairedTokenBalance}
                      </span>
                    </div>
                    <div className="w-full py-2 grid md-lg:grid-cols-2 gap-3.75">
                        <div className="w-full space-y-2.5">
                        <span className="text-base">
                          Max Buying Amount per day
                        </span>
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
                        <span className="text-base">
                          Max Selling Amount per day
                        </span>
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
                            image={project.image}
                        />
                    </div>
                    <Button
                        name="Update Market Making Pool Settings"
                        handleClick={updateMarketMakingPool}
                    />
                    {/* Edit Button */}
                    <Button name="Stake for participants"/>
                    <div className="w-full space-x-3.75 grid grid-cols-2">
                        {/* Edit Button */}
                        <Button name="Create Vesting schedules" handleClick={(e) => {
                            router.push(`${project.slug}/vesting/add`)
                        }}/>
                        <Button name="View Vesting schedules" handleClick={(e) => {
                            router.push(`${project.slug}/vesting/overview`)
                        }}/>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col p-3.75 space-y-4">
                    <h1 className="text-2xl"><i className="fa-solid fa-sliders"/> Settings</h1>
                    <div className="bg-gray-200 border border-gray-400 px-4 py-3 rounded relative text-center"
                         role="alert">
                        <span>No market making pool created yet</span>

                    </div>
                    <Button
                        name="Create Market Making Pool"
                        handleClick={() => setCreateMMPool(true)}
                    />
                </div>
            )}
        </Card>

    )
}