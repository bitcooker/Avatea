import React, { useEffect, useState } from "react";

export default function Progress(props) {
  const [init, setInit] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!init) setInit(true);
    else setPercentage(props.percentage);
    return () => {};
  }, [init]);

  // Size of the enclosing square
  const sqSize = props.sqSize;
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (props.sqSize - props.strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <>
      <svg width={props.sqSize} height={props.sqSize} viewBox={viewBox}>
        <circle
          className="progress__bg"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
        />
        <circle
          className="progress__fill"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
      <span className="progress__text">{`${props.percentage}%`}</span>
    </>
  );
}
