import InputWithIconSubmit from '../../core/Input/InputWithIconSubmit'
import {useEffect, useState} from "react";
import {useWallet} from "@albs1/use-wallet";
import {WETH_ADDRESS} from "../../../helpers/constants";
import MaxButton from "../projects/Button/MaxButton";
import helper from "../../../helpers";
import {ethers} from "ethers";
import InputApproveWithIconSubmit from "../../core/Input/InputApproveWithIconSubmit";

export default function MarketMakingDeployment({project, marketMakingPool}) {

    const wallet = useWallet();

    const [amountBaseTokenBalance, setAmountBaseTokenBalance] = useState('0');
    const [amountPairTokenBalance, setAmountPairTokenBalance] = useState('0');
    const [amountBaseTokenToWithdraw, setAmountBaseTokenToWithdraw] = useState('0');
    const [amountPairTokenToWithdraw, setAmountPairTokenToWithdraw] = useState('0');
    const [amountBaseTokenToStake, setAmountBaseTokenToStake] = useState('0');
    const [amountPairTokenToStake, setAmountPairTokenToStake] = useState('0');
    const [baseTokenWalletBalance, setBaseTokenWalletBalance] = useState('0');
    const [pairedTokenWalletBalance, setPairedTokenWalletBalance] = useState('0');
    const [pairedTokenIsWeth, setPairedTokenIsWeth] = useState(false);

    const loadWeb3 = async () => {

        if (marketMakingPool.paired_token === WETH_ADDRESS[wallet.chainId]) {
            setPairedTokenIsWeth(true)
            setPairedTokenWalletBalance(helper.formatting.web3Format(await helper.token.wethBalanceOf(wallet, wallet.account)));
        } else {
            setPairedTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, marketMakingPool.paired_token, wallet.account)));
        }

        setBaseTokenWalletBalance(helper.formatting.web3Format(await helper.token.balanceOf(wallet, project.token, wallet.account)));
        const {
            balanceInBaseToken,
        } = await helper.web3.marketMaker.fetchHoldersMapping(wallet, marketMakingPool.address, wallet.account);

        setAmountBaseTokenBalance(helper.formatting.web3Format(balanceInBaseToken));
        setAmountPairTokenBalance(helper.formatting.web3Format(await helper.web3.marketMaker.getWithdrawablePairedTokens(
            wallet,
            marketMakingPool.address,
            wallet.account
        )));

    };

    useEffect(() => {
        if (wallet.isConnected() && marketMakingPool.address) {
            loadWeb3();
        }

    }, [wallet]);

    const setMax = async (amount, setter) => {
        setter(amount);
    };


    const stakePairedToken = async () => {
        const wei = ethers.utils.parseEther(amountPairTokenToStake);
        let success;
        if (pairedTokenIsWeth) {
            success = await helper.web3.marketMaker.stakePairedTokenInETH(wallet, marketMakingPool.address, wei);
        } else {
            success = await helper.web3.marketMaker.stakePairedToken(wallet, marketMakingPool.address, wei);
        }
    };

    const stakeBaseToken = async () => {
        const wei = ethers.utils.parseEther(amountBaseTokenToStake);
        let success = await helper.marketMaker.stake(wallet, marketMakingPool.address, wei);
    };

    const withdrawPairToken = async () => {
        let full_withdrawal = parseFloat(amountPairTokenToWithdraw) === parseFloat(amountPairTokenBalance) && parseFloat(amountBaseTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountPairTokenToWithdraw);
        let success = await helper.web3.marketMaker.withdrawPairToken(wallet, marketMakingPool.address, wei, full_withdrawal);
    };

    const withdrawBaseToken = async () => {
        let full_withdrawal = parseFloat(amountBaseTokenToWithdraw) === parseFloat(amountBaseTokenBalance) && parseFloat(amountPairTokenBalance) === 0;
        const wei = ethers.utils.parseEther(amountBaseTokenToWithdraw);
        let success = await helper.marketMaker.withdrawBaseToken(wallet, marketMakingPool.address, wei, full_withdrawal);
    };

    return (

        <div className="card-content space-y-3.75">


            <div className="space-y-2.5">
                <div className="flex flex-row items-center justify-between text-base">
                    <div>
                        <i className="fa-solid fa-circle-dollar mr-1"/>
                        Cash
                    </div>
                    <MaxButton
                        balance={amountPairTokenBalance}
                        handleClick={() => setMax(amountPairTokenBalance, setAmountPairTokenToWithdraw)}
                    />
                </div>
                <InputWithIconSubmit
                    id="withdrawCash"
                    name="withdrawCash"
                    type="number"
                    placeholder="Input amount to withdraw"
                    submitName="Withdraw"
                    image={marketMakingPool.paired_token_image}
                    icon="fa-light fa-circle-minus"
                    value={amountPairTokenToWithdraw}
                    setValue={setAmountPairTokenToWithdraw}
                    submitFunction={withdrawPairToken}
                />
            </div>
            <div className="space-y-2.5">
                <div className="flex flex-row items-center justify-between text-base">
                    <div>
                        <i className="fa-solid fa-coin mr-1"/>
                        Tokens
                    </div>
                    <MaxButton
                        balance={amountBaseTokenBalance}
                        handleClick={() => setMax(amountBaseTokenBalance, setAmountBaseTokenToWithdraw)}
                    />
                </div>
                <InputWithIconSubmit
                    id="withdrawToken"
                    name="withdrawToken"
                    type="number"
                    placeholder="Input amount to withdraw"
                    submitName="Withdraw"
                    image={project.image}
                    icon="fa-light fa-circle-minus"
                    value={amountBaseTokenToWithdraw}
                    setValue={setAmountBaseTokenToWithdraw}
                    submitFunction={withdrawBaseToken}
                />
            </div>

            <div className="space-y-2.5">
                <div className="flex flex-row items-center justify-between text-base">
                    <div>
                        <i className="fa-solid fa-coin"/> Cash
                    </div>
                    <MaxButton
                        balance={pairedTokenWalletBalance}
                        handleClick={() => setMax(pairedTokenWalletBalance, setAmountPairTokenToStake)}
                    />
                </div>
                <InputApproveWithIconSubmit
                    id="cash"
                    name="cash"
                    type="number"
                    icon="fa-light fa-circle-plus"
                    submitName="Deposit"
                    submitFunction={stakePairedToken}
                    value={amountPairTokenToStake}
                    image={marketMakingPool.paired_token_image}
                    setValue={setAmountPairTokenToStake}
                    address={marketMakingPool.address}
                    token={marketMakingPool.paired_token}
                />
            </div>

            <div className="space-y-2.5">

                <div className="flex flex-row items-center justify-between text-base">
                    <div>
                        <i className="fa-solid fa-coin"/> Token
                    </div>
                    <MaxButton
                        balance={baseTokenWalletBalance}
                        handleClick={() => setMax(baseTokenWalletBalance, setAmountBaseTokenToStake)}
                    />
                </div>
                <InputApproveWithIconSubmit
                    id="token"
                    name="token"
                    type="number"
                    icon="fa-light fa-circle-plus"
                    submitName="Deposit"
                    image={project.image}
                    submitFunction={stakeBaseToken}
                    value={amountBaseTokenToStake}
                    setValue={setAmountBaseTokenToStake}
                    address={marketMakingPool.address}
                    token={project.token}
                />
            </div>
        </div>

    )
}