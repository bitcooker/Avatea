import {useCallback, useEffect, useState} from "react";
import {useWallet} from "@albs1/use-wallet";
import {ethers} from "ethers";
import Image from "next/image";

import helper from "../../../helpers";
import {AVATEA_TOKEN_IMAGE} from "../../../helpers/constants";

// core components
import Button from "../../core/Button/Button";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";

// page components
import MaxButton from "../projects/Button/MaxButton";
import Card from "../projectDetail/Card/Card";

export default function VaultCard({project, vault}) {

    const wallet = useWallet();

    const [vaultTLV, setVaultTLV] = useState("0");
    const [rewardPerToken, setRewardPerToken] = useState("0");
    const [baseTokenWalletBalance, setBaseTokenWalletBalance] = useState("0");
    const [amountBaseTokenToStake, setAmountBaseTokenToStake] = useState("0");

    useEffect(() => {
        if (wallet.status === "connected" && vault.address) {
            const initWalletConnected = async () => {
                setVaultTLV(
                    helper.formatting.web3Format(
                        await helper.web3.vault.totalSupply(wallet, vault.address)
                    )
                );
                setRewardPerToken(
                    await helper.web3.vault.rewardPerToken(wallet, vault.address)
                );

                setBaseTokenWalletBalance(
                    helper.formatting.web3Format(
                        await helper.token.balanceOf(wallet, project.token, wallet.account)
                    )
                );

            };
            initWalletConnected();
        }
    }, [wallet, vault, project]);

    const addReward = useCallback(async () => {
        const wei = ethers.utils.parseEther(amountBaseTokenToStake);
        let success = await helper.web3.vault.addReward(wallet, vault.address, wei);
    }, [amountBaseTokenToStake, wallet, vault]);

    const setMax = useCallback(async (amount, setter) => {
        setter(amount);
    }, []);

    return (

        <Card className={'col-span-full md:col-span-1'}>
            {vault.address ? (
                <div className="flex flex-col p-3.75 space-y-4">
                    <h2 className="text-2xl"><i className="fa-solid fa-nfc-lock"/> Vault</h2>
                    <div className="flex justify-between">
                        <span className="text-sm"><i className="fa-solid fa-users"/> Users Staked</span>
                        <span className="text-base font-medium">
                      {vault.num_invested}
                    </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">
                        <i className="fa-solid fa-money-bill-transfer"/> TVL
                      </span>
                        <span className="flex text-base font-medium">
                        <Image
                            src={AVATEA_TOKEN_IMAGE}
                            alt="avateaTokenImage"
                            width={24}
                            height={24}
                        />
                        <span className="ml-2.5">{vaultTLV}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">
                        <i className="fa-solid fa-hands-holding-dollar"/>{" "}
                          Reward Per Avatea Token
                      </span>
                        <span className="flex text-base font-medium">
                        <Image
                            src={project.image}
                            alt="projectImage"
                            width={24}
                            height={24}
                        />
                        <span className="ml-2.5">{rewardPerToken}</span>
                      </span>
                    </div>

                    <div className="flex flex-row items-center justify-between text-base">
                        <div>
                            <i className="fa-solid fa-coin"/> Add rewards
                        </div>
                        <span>
                            <MaxButton
                                balance={baseTokenWalletBalance}
                                handleClick={() =>
                                    setMax(
                                        baseTokenWalletBalance,
                                        setAmountBaseTokenToStake
                                    )
                                }
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
                </div>
            ) : (
                <div className="flex flex-col p-3.75 space-y-4">
                    <h1 className="text-2xl text-center"><i className="fa-solid fa-nfc-lock"/> Vault</h1>
                    <div className="bg-gray-200 border border-gray-400 px-4 py-3 rounded relative text-center"
                         role="alert">
                        <span>No vault created yet</span>

                    </div>
                    <Button name="Request a vault"/>
                </div>
            )}
        </Card>

    )
}