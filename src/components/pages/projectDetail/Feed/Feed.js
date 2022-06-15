import FeedItem from "./FeedItem";

export default function Feed(props) {

    const mapFeedItems = () => {
        if (props.articles) {
            return props.articles.map(article => {
                return (<FeedItem key={article.id} article={article}/>)
            })
        }
    }
  return (
    <div className="flex flex-col h-96 overflow-hidden overflow-scroll scroll-smooth space-y-7.5">
        {mapFeedItems()}
    </div>
  );
}
