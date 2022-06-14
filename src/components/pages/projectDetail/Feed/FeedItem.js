import Button from "../../../core/Button/Button";

export default function FeedItem(props) {
  return (
    <div className="flex space-x-5">
      <div className="flex-none">
        <img
          src={"/coins/" + props.item + ".png"}
          alt={props.item}
          className="w-25 h-25 md-lg:w-38 md-lg:h-36 rounded-2.5xl"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-col h-full justify-between">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
            ultrices ultricies pellentesque porttitor rhoncus lacus, nunc,
            tincidunt. Interdum amet mattis
          </div>

          <Button name="View Full News" />
        </div>
      </div>
    </div>
  );
}
