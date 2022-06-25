import {useState} from "react";
import helper from "../src/helpers";
import {useWallet} from "use-wallet";
import Papa from "papaparse";
import InputWithIconSubmit from "../src/components/core/Input/InputWithIconSubmit";
import {Chart} from "../src/components/pages/projects/Vesting/Chart";
import {ethers} from "ethers";
import Button from "../src/components/core/Button/Button";

export default function File() {

    const wallet = useWallet();

    //TODO load marketMakingPool from project
    const marketMakingPool = "0xB47E044d3bbd6b72ed9c94914a4Cb9DD16c00Bc5"

    const [addresses, setAddresses] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [amountsInWei, setAmountsInWei] = useState([]);
    const [start, setStart] = useState(0);
    const [cliff, setCliff] = useState(0);
    const [duration, setDuration] = useState(0);
    const [slicePeriodSeconds, setSlicePeriodSeconds] = useState(0);
    const [revocable, setRevocable] = useState(true);
    const [batchName, setBatchName] = useState('');
    const [projectName, setProjectName] = useState('cloud-project');

    const handleFileSelect = (event) => {

        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const addressesArray = [];
                const amountsArray = [];
                const amountsInWeiArray = [];

                results.data.map((d) => {
                    amountsArray.push(Object.values(d)[1]);
                    amountsInWeiArray.push(ethers.utils.parseEther(Object.values(d)[1]));
                    addressesArray.push(Object.values(d)[0]);
                });

                setAddresses(addressesArray);
                setAmounts(amountsArray);
                setAmountsInWei(amountsInWeiArray);
            },
        });

    }

    const createVesting = async () => {
        await helper.web3.marketMaker.createVesting(wallet, marketMakingPool, addresses, start, cliff, duration, slicePeriodSeconds, revocable, amountsInWei, amounts, batchName, projectName);
    };

    return (
        <div>
            <form>
                <input type="file" accept=".csv" onChange={handleFileSelect}/>
            </form>

            <table>
                <tr>
                    <th>Address</th>
                    <th>Amount</th>
                </tr>

                {addresses.map((address, index) => {
                    return (
                        <tr key={address}>
                            <td>{address}</td>
                            <td>{amounts[index]}</td>
                        </tr>
                    )
                })}
            </table>
            batch name
            <InputWithIconSubmit
                id="start"
                name="start"
                type="text"
                placeholder="batch name"
                value={batchName}
                setValue={setBatchName}
            />
            project name
            <InputWithIconSubmit
                id="start"
                name="start"
                type="text"
                placeholder="batch name"
                value={projectName}
                setValue={setProjectName}
            />
            start
            <InputWithIconSubmit
                id="start"
                name="start"
                type="number"
                placeholder="Duration"
                value={start}
                setValue={setStart}
            />
            cliff
            <InputWithIconSubmit
                id="cliff"
                name="cliff"
                type="number"
                placeholder="Duration"
                value={cliff}
                setValue={setCliff}
            />
            Duration
            <InputWithIconSubmit
                id="duration"
                name="duration"
                type="number"
                placeholder="Duration"
                value={duration}
                setValue={setDuration}
            />
            slicePeriodSeconds
            <InputWithIconSubmit
                id="slicePeriodSeconds"
                name="slicePeriodSeconds"
                type="number"
                placeholder="slicePeriodSeconds"
                value={slicePeriodSeconds}
                setValue={setSlicePeriodSeconds}
            />
            <Chart
                amountVested="100"
                cliff={parseInt(cliff) + parseInt(start)}
                start={start}
                duration={duration}
                slicePeriodSeconds={slicePeriodSeconds}
                ticker="%"
            />
            <Button name="Create Vesting" handleClick={createVesting}/>
        </div>
    )
}
