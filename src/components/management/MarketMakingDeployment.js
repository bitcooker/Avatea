import Button from "../core/Button/Button";
import InputWithIcon from "../core/Input/InputWithIcon";
import {useState} from "react";
import {useWallet} from "use-wallet";
import helper from "../../../src/helpers";

export default function MarketMakingDeployment({project}) {

    const wallet = useWallet();
    const [pairedToken, setPairedToken] = useState('');
    const [volume, setVolume] = useState('0');
    const [maxBuyingAmount, setMaxBuyingAmount] = useState('0');
    const [maxSellingAmount, setMaxSellingAmount] = useState('0');
    const [revocable, setRevocable] = useState(false);
    const [paused, setPaused] = useState(false);

    const deployMarketMakingPool = async () => {
        await helper.web3.marketMaker.deploy(wallet, project.token, pairedToken, revocable, paused, project.slug, volume, maxBuyingAmount, maxSellingAmount);
    };


    return (

        <div className="card-content space-y-3.75">
            {/* Pair Token */}
            <div className="w-full space-y-2.5">
                <span className="text-base">Pair Token Address</span>
                <InputWithIcon
                    id="editPairToken"
                    name="editPairToken"
                    type="text"
                    placeholder="0x..."
                    setValue={setPairedToken}
                    value={pairedToken}
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
                        setValue={setMaxBuyingAmount}
                        value={maxBuyingAmount}
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
                        setValue={setMaxSellingAmount}
                        value={maxSellingAmount}
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
                    setValue={setVolume}
                    value={volume}
                />
            </div>


            <Button name="Deploy" handleClick={deployMarketMakingPool}/>
        </div>

    )
}