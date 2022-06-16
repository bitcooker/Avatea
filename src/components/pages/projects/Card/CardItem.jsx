import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  socialFacebook,
  socialLinked,
  socialTelegram,
  socialTwitter,
} from "../../../SVG";

export default function CardItem(props) {
  return (
    <div className="cardItem">
      <CardImage image={props.banner} id={props.slug} />
      <div className="cardItem__body">
        <div className="cardItem__body-icon">
          <img src={props.image} alt={props.slug} />
        </div>
        <div className="cardItem__body-general">
          <div className="cardItem__body-name">{props.name}</div>
          <div className="cardItem__body-social">
            <Link href={props.social_facebook}>{socialFacebook}</Link>
            <Link href={props.social_twitter}>{socialTwitter}</Link>
            <Link href={props.social_linkedin}>{socialLinked}</Link>
            <Link href={props.social_telegram}>{socialTelegram}</Link>
          </div>
        </div>
        <div className="cardItem__body-row">
          <div className="cardItem__body-row-title">Total value lcoked :</div>
          <div className="cardItem__body-row-info">$ 100.000</div>
        </div>
        <div className="cardItem__body-row">
          <div className="cardItem__body-row-title">Whitepaper :</div>
          <div className="cardItem__body-row-info purple">
            <a href={props.whitepaper} target={"_blank"} rel={"noreferrer"}>
              View
            </a>
          </div>
        </div>
        <div className="cardItem__body-row">
          <div className="cardItem__body-row-title">Website :</div>
          <div className="cardItem__body-row-info">
            <a href={props.website} target={"_blank"} rel={"noreferrer"}>
              View
            </a>
          </div>
        </div>
        <Link href={`projects/${props.slug}`} className="button primary">
          <a className={"button primary"}>View Project</a>
        </Link>
      </div>
    </div>
  );
}

export const CardImage = (props) => {
  const [load, setLoad] = useState(false);
  const image = useRef(null);

  useEffect(() => {
    if (image.current) {
      // image.current.onload = () => setLoad(true);
      // this one for test purposes
      image.current.onload = () => setTimeout(() => setLoad(true), 3000);
    }
  });

  return (
    <div className={`cardItem__image ${load ? "" : "spinner"}`}>
      {!load && (
        <div className="ldspinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <img src={props.image} alt={props.slug} ref={image} />
    </div>
  );
};
