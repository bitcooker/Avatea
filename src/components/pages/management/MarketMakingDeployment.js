import Button from "../../core/Button/Button";
import InputWithIcon from "../../core/Input/InputWithIcon";
import {useEffect, useState} from "react";
import {useWallet} from "@albs1/use-wallet";
import helper from "../../../helpers";
import {PAIRED_TOKEN_DEFAULT_IMAGE, PAIRED_TOKEN_IMAGES} from "../../../helpers/constants";
import {ethers} from "ethers";
import Checkbox from "../../core/Checkbox/Checkbox";

export default function MarketMakingDeployment({project}) {

    const wallet = useWallet();
    const [pairedToken, setPairedToken] = useState('');
    const [pairedTokenCheckSum, setPairedTokenCheckSum] = useState('');
    const [pairedTokenImage, setPairedTokenImage] = useState(PAIRED_TOKEN_DEFAULT_IMAGE);
    const [volume, setVolume] = useState('0');
    const [maxBuyingAmount, setMaxBuyingAmount] = useState('0');
    const [maxSellingAmount, setMaxSellingAmount] = useState('0');
    const [maxPreferredDrawdown, setMaxPreferredDrawdown] = useState("0");
    const [lowerPreferredPriceRange, setLowerPreferredPriceRange] = useState("0");
    const [upperPreferredPriceRange, setUpperPreferredPriceRange] = useState("0");
    const [revocable, setRevocable] = useState(false);
    const [paused, setPaused] = useState(false);

    const deployMarketMakingPool = async () => {
        let success = await helper.web3.marketMaker.deploy(wallet,
            project.token,
            pairedTokenCheckSum,
            revocable,
            paused,
            project.slug,
            volume,
            maxBuyingAmount,
            maxSellingAmount,
            maxPreferredDrawdown,
            lowerPreferredPriceRange,
            upperPreferredPriceRange,
            pairedTokenImage);
        if (success) location.reload();
    };

    useEffect(() => {
        if (pairedToken.length === 42) {
            let checkSum = pairedToken;
            try {
                checkSum = ethers.utils.getAddress(pairedToken.toLowerCase())
            } catch (e) {
                console.log('checkSum error', e);
            }
            setPairedTokenCheckSum(checkSum)
            if (PAIRED_TOKEN_IMAGES[checkSum]) {
                setPairedTokenImage(PAIRED_TOKEN_IMAGES[checkSum])
            } else {
                setPairedTokenImage(PAIRED_TOKEN_DEFAULT_IMAGE)
            }
        }
    }, [pairedToken]);


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
                    image={pairedTokenImage}
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
                        image={pairedTokenImage}
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
            <div className="w-full py-2 grid md-lg:grid-cols-2 gap-3.75">
                <div className="w-full space-y-2.5">
                    <span className="text-base">Max Preferred Drawdown</span>
                    <InputWithIcon
                        id="editPairToken"
                        name="editPairToken"
                        type="number"
                        value={maxPreferredDrawdown}
                        setValue={setMaxPreferredDrawdown}
                        image={pairedTokenImage}
                    />
                </div>
                <div className="w-full space-y-2.5">
                    <span className="text-base">Volume per day</span>
                    <InputWithIcon
                        id="editPairToken"
                        name="editPairToken"
                        type="number"
                        value={volume}
                        setValue={setVolume}
                        image={project.image}
                    />
                </div>
            </div>
            <div className="w-full py-2 grid md-lg:grid-cols-2 gap-3.75">
                <div className="w-full space-y-2.5">
                        <span className="text-base">
                          Lower Preferred Price Range
                        </span>
                    <InputWithIcon
                        id="editMaxBuyingAmount"
                        name="editMaxBuyingAmount"
                        type="number"
                        value={lowerPreferredPriceRange}
                        setValue={setLowerPreferredPriceRange}
                        image={pairedTokenImage}
                    />
                </div>
                <div className="w-full space-y-2.5">
                        <span className="text-base">
                                Upper Preferred Price Range
                        </span>
                    <InputWithIcon
                        id="editMaxBuyingAmount"
                        name="editMaxBuyingAmount"
                        type="number"
                        value={upperPreferredPriceRange}
                        setValue={setUpperPreferredPriceRange}
                        image={pairedTokenImage}
                    />
                </div>
            </div>
            <div className="w-full space-y-2.5">
                <span className="text-base">Make vesting of users revocable by project owner </span>
                <Checkbox setValue={setRevocable}/>
            </div>
            <div className="w-full space-y-2.5">
                <span className="text-base">Deploy contract in paused state</span>
                <Checkbox setValue={setPaused}/>
            </div>
            <Button name="Deploy" handleClick={deployMarketMakingPool}/>
        </div>

    )
}