import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewsCard(props) {
  return (
    <div className="relative flex flex-col w-full bg-white rounded-lg overflow-hidden shadow-lg">
      <Image
        className="w-full"
        src="/projects/default_banner.png"
        alt="Mountain"
        layout="responsive"
        width="100%"
        height={50}
      />
      <div className="grow px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.news.title}</div>
        <p className="text-gray-700 text-base">{props.news.description}</p>
      </div>
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {props.news.date}
        </span>
        <Link href={`news/${props.news.id}`}>
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100/50 hover:ring-2 hover:ring-red-200/50 hover:cursor-pointer transition">
            <i className="fa-solid fa-pen-line text-red-500"></i>
          </div>
        </Link>
      </div>
    </div>
  );
}
