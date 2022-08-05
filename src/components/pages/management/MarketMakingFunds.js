import InputApproveWithIconSubmit from '../../core/Input/InputApproveWithIconSubmit'
import InputWithIconSubmit from '../../core/Input/InputWithIconSubmit'
import { useState} from "react";
import {useWallet} from "@albs1/use-wallet";
import {PAIRED_TOKEN_DEFAULT_IMAGE, PAIRED_TOKEN_IMAGES} from "../../../helpers/constants";
import {ethers} from "ethers";
import InputSubmit from "../../core/Input/InputSubmit";

export default function MarketMakingDeployment({project, marketMakingPool}) {

    const wallet = useWallet();
    const pairedTokenImage = PAIRED_TOKEN_DEFAULT_IMAGE;
    const [depositBaseAmount, setDepositBaseAmount] = useState('0');
    const [depositPairAmount, setDepositPairAmount] = useState('0');
    const [withdrawBaseAmount, setWithdrawBaseAmount] = useState('0');
    const [withdrawPairAmount, setWithdrawPairAmount] = useState('0');



    const depositBaseToken = async () => {

    }

    const depositPairToken = async () => {

    }

    const withrdawBaseToken = async () => {

    }

    const withdrawPairToken = async () => {

    }

    console.log(marketMakingPool ,project)
    return (

        <div className="card-content space-y-3.75">
            {/* Pair Token */}
            <div className="w-full space-y-2.5">
                <span className="text-base">Deposit Base token</span>
                <InputApproveWithIconSubmit
                    id="depositBaseToken"
                    name="depositBase"
                    type="text"
                    placeholder=""
                    setValue={setDepositBaseAmount}
                    value={depositBaseAmount}
                    image={project.image}
                    submitName="Deposit"
                    icon="fa-light fa-circle-plus"
                    submitFunction={depositBaseToken}
                    address={marketMakingPool.address}
                    token={project.token}
                />
            </div>
            <div className="w-full space-y-2.5">
                <span className="text-base">Deposit Pair token</span>
                <InputApproveWithIconSubmit
                    id="depositPairToken"
                    name="depositPair"
                    type="text"
                    placeholder=""
                    setValue={setDepositPairAmount}
                    value={depositPairAmount}
                    image={marketMakingPool.paired_token_image}
                    icon="fa-light fa-circle-plus"
                    submitName="Deposit"
                    submitFunction={depositPairToken}
                    address={marketMakingPool.address}
                    token={marketMakingPool.paired_token}
                />
            </div>
            <div className="w-full space-y-2.5">
                <span className="text-base">Withdraw Base token</span>
                <InputWithIconSubmit
                    id="withdrawBaseToken"
                    name="withdrawBase"
                    type="text"
                    placeholder=""
                    setValue={setWithdrawBaseAmount}
                    value={withdrawBaseAmount}
                    image={project.image}
                    submit={withdrawBaseAmount}
                    submitName="Withdraw"
                    icon="fa-light fa-circle-minus"
                />
            </div>
            <div className="w-full space-y-2.5">
                <span className="text-base">Withdraw Pair token</span>
                <InputWithIconSubmit
                    id="withdrawPairToken"
                    name="withdrawPair"
                    type="text"
                    placeholder=""
                    setValue={setWithdrawPairAmount}
                    value={withdrawPairAmount}
                    image={marketMakingPool.paired_token_image}
                    submit={withdrawPairToken}
                    submitName="Withdraw"
                    icon="fa-light fa-circle-minus"

                />
            </div>

        </div>

    )
}