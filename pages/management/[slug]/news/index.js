import * as React from "react";
import {useState} from "react";
import Link from "next/link";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";

// news component
import NewsCard from "../../../../src/components/pages/management/news/NewsCard";
import helper from "../../../../src/helpers";
import {useRouter} from "next/router";


export default function NewsList(props) {

    const [articles, setArticles] = useState([]);
    const router = useRouter();
    const {slug} = router.query;

    const fetchArticles = async () => {
        if (slug) {
            setArticles(
                await helper.article.getArticles({project: slug})
            );
        }
    };
    fetchArticles();


    return (
        <div className="w-full">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl">News List</h1>
                <Link href="news/add" passHref>
                    <a>
                        <ButtonFit name="Add News" icon="fa-regular fa-plus-large"/>
                    </a>
                </Link>
            </div>
            <div className="grid md-lg:grid-cols-2 lg-xl:grid-cols-4 gap-4 m-2">
                {articles.map((news, index) => (
                    <NewsCard news={news} key={index}/>
                ))}
            </div>
        </div>
    );
}
