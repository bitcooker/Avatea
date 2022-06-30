import Card from "../projectDetail/Card/Card";
import Button from "../../../core/Button/Button";

export default function NoVesting(props) {



    return ( <Card>
        <div className="vesting-header">
            <h1 className="text-2xl"><i className="fa-solid fa-unlock"></i> Vesting</h1>
            <p>No vesting available</p>
            <div className="pt-9">
                <Button name="Return to project" handleClick={() => {}}/>
            </div>
        </div>
    </Card>)
}
