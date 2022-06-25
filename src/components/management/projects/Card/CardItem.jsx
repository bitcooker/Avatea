/* eslint-disable @next/next/no-img-element */
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
    <div className="rounded-2.5xl bg-white overflow-hidden transition hover:shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
      <CardImage image={props.banner} id={props.slug} />
      <div className="relative py-7.5 px-5">
        <div className="absolute -top-9 p-2 flex items-center justify-center w-14 h-14 bg-white shadow-[0_4px_8px_rgba(0,0,0,0.08)] rounded-0.5xl">
          <img src={props.image} alt={props.slug} />
        </div>
        <div className="flex mb-3.75 items-center justify-between">
          <div className="overflow-hidden text-ellipsis font-medium text-base">
            {props.name}
          </div>
          <div className="flex items-center space-x-1">
            <Link href={props.social_facebook}>
              <a>{socialFacebook}</a>
            </Link>
            <Link href={props.social_twitter}>
              <a>{socialTwitter}</a>
            </Link>
            <Link href={props.social_linkedin}>
              <a>{socialLinked}</a>
            </Link>
            <Link href={props.social_telegram}>
              <a>{socialTelegram}</a>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-sm text-black/60">Total value locked :</div>
          <div className="font-semibold text-sm text-right text-black">
            $ 100.000
          </div>
        </div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-sm text-black/60">Whitepaper :</div>
          <div className="font-semibold text-sm text-right text-indigo-500">
            <a href={props.whitepaper} target={"_blank"} rel={"noReferrer"}>
              View
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-sm text-black/60">Website :</div>
          <div className="font-semibold text-sm text-right text-black">
            <a href={props.website} target={"_blank"} rel={"noReferrer"}>
              View
            </a>
          </div>
        </div>
        <Link href={`projects/${props.slug}`}>
          <a className="block py-2.5 mt-5 w-full bg-indigo-500 text-white text-center rounded-full hover:bg-indigo-500/80">
            View Project
          </a>
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
