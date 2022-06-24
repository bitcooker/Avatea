import Button from "../../../core/Button/Button";
import Image from "next/image";
import Link from "next/link";

export default function FeedItem(props) {
  const { description, title, image, link } = props.article;
  return (
    <div className="flex space-x-5">
      <div className="flex-none">
        <Image
          src={image}
          alt={title}
          className="md-lg:w-38 md-lg:h-36 rounded-2.5xl"
          width={155}
          height={145}
        />
      </div>
      <div className="grow">
        <div className="flex flex-col h-full justify-between">
          <span className="text-base font-bold">{title}</span>
          <div>{description}</div>

          <Button>
            <Link href={link}>
              <>
                Read more{" "}
                <i className="fa-solid fa-circle-chevron-right pl-2 mt-0.5" />
              </>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
