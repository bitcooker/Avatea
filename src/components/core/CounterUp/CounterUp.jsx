import * as React from "react";
import dynamic from 'next/dynamic'
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {ssr: false});

const CounterUp = (props) => {
    const [visibleCounterUp, setVisibleCounterUp] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setVisibleCounterUp(true)
        }, [700])
    })

    return (
        <div className="min-h-[36px]">
            {
                visibleCounterUp && 
                    <AnimatedNumbers
                        animateToNumber={props.end}
                        configs={(number, index) => {
                            return { mass:1, tension: 700 * (index + 1), friction: 200 };
                        }}
                    />
            }
        </div>
    )
}

export default React.memo(CounterUp);