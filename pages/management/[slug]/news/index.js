import * as React from "react";
import {useEffect, useState} from "react";
import Link from "next/link";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";

// news component
import NewsCard from "../../../../src/components/pages/management/news/NewsCard";
import helper from "../../../../src/helpers";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";
import {useWallet} from "use-wallet";
import {useRouter} from "next/router";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";


export default function NewsList(props) {

    const router = useRouter();
    const wallet = useWallet();
    const [articles, setArticles] = useState([]);
    const [project, setProject] = React.useState({});
    const { slug } = router.query;

    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        else {
            (async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
            })();
        }
    }, [props]);

    useEffect(() => {
        const fetchArticles = async () => {
            setArticles(
                await helper.article.getArticles({project: slug})
            );
        };
        fetchArticles();
    }, [props]);


    return (
        <ManagementAuthentication wallet={wallet} project={project}>
            <div className="w-full">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl">News List</h1>
                    <div className={'grid grid-cols-2 gap-2.5'}>
                        <ButtonOutlineFit name="Back" icon="fa-regular fa-arrow-left" handleClick={() => router.back()} />
                        <Link href={`/management/${slug}/news/add`} passHref>
                            <a>
                                <ButtonFit name="Add News" icon="fa-regular fa-plus-large"/>
                            </a>
                        </Link>
                    </div>

                </div>
                <div className="grid md-lg:grid-cols-2 lg-xl:grid-cols-3 gap-4 m-2">
                    {articles.map((news, index) => (
                        <NewsCard news={news} key={index}/>
                    ))}
                </div>
            </div>
        </ManagementAuthentication>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}