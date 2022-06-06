import FeedItem from "./FeedItem";

export default function Feed(props) {
  return (
    <div className="flex flex-col h-96 overflow-hidden overflow-scroll scroll-smooth space-y-7.5">
      <FeedItem item="ethImage" />
      <FeedItem item="maticImage" />
      <FeedItem item="ftmImage" />
    </div>
  );
}
