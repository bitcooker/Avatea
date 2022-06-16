import Button from "../../../core/Button/Button";
import Link from "next/link";

export default function FeedItem(props) {
    const { description, title, image, link} = props.article;
      return (
        <div className="flex space-x-5">
          <div className="flex-none">
            <img
              src={image}
              alt={title}
              className="w-25 h-25 md-lg:w-38 md-lg:h-36 rounded-2.5xl"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col h-full justify-between">
              <div>
                  {description}
              </div>

                <Button><Link href={link}>Read more</Link></Button>
            </div>
          </div>
        </div>
      );
}
