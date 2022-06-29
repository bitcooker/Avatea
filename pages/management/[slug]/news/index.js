import * as React from "react";
import {useEffect, useState} from "react";
import Link from "next/link";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";

// news component
import NewsCard from "../../../../src/components/pages/management/news/NewsCard";
import helper from "../../../../src/helpers";


export default function NewsList(props) {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {

            setArticles(
                await helper.article.getArticles({project: props.slug})
            );
        };
        fetchArticles();
    }, []);


    return (
        <div className="w-full">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl">News List</h1>
                <Link href={`/management/${props.slug}/news/add`} passHref>
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

export async function getServerSideProps(context) {
    const {slug} = context.query;
    return {props: {slug: slug}}
}