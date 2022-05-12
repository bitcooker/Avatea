import Act from "./../src/components/pages/myActivity/Act/Act";
import Chart from "./../src/components/pages/myActivity/Chart/Chart";
import Info from "./../src/components/pages/myActivity/Info/Info";

export default function Activity() {

    return (
        <div className="activity">
            <div className="activity__inner">
                <Info />
                <div className="activity__inner-row">
                    <Chart />
                    <Act />
                </div>
            </div>
        </div>
    );
}
