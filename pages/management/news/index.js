import * as React from "react";
import Link from "next/link";

// core components
import ButtonFit from "../../../src/components/core/Button/ButtonFit";

// news component
import NewsCard from "../../../src/components/pages/management/news/NewsCard";

const news = [
  {
    id: 1,
    title: "News Title1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    date: "2022-06-23",
  },
  {
    id: 2,
    title: "News Title2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    date: "2022-06-21",
  },
  {
    id: 3,
    title: "News Title3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    date: "2022-06-23",
  },
  {
    id: 4,
    title: "News Title4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    date: "2022-06-22",
  },
  {
    id: 5,
    title: "News Title5",
    description: "Lorem ipsum dolor sit",
    date: "2022-06-24",
  },
  {
    id: 6,
    title: "News Title6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    date: "2022-06-23",
  },
];

export default function NewsList(props) {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">News List</h1>
        <Link href="news/add" passHref>
          <a>
            <ButtonFit name="Add News" icon="fa-regular fa-plus-large" />
          </a>
        </Link>
      </div>
      <div className="grid md-lg:grid-cols-2 lg-xl:grid-cols-4 gap-4 m-2">
        {news.map((news, index) => (
          <NewsCard news={news} key={index} />
        ))}
      </div>
    </div>
  );
}
