import BannerSocialButton from "./BannerSocialButton";
import ButtonOutline from "../../../core/Button/ButtonOutline";
import Link from "next/link";
import Image from "next/image";

export default function PreviewContent(props) {
  const socials = Object.entries(
    Object.fromEntries(
      Object.entries(props).filter(([key]) => key.includes("social_"))
    )
  );

  const mapSocials = () => {
    return socials.map((social) => {
        if (social[1]) {
            return (
                <a
                    key={social[0]}
                    href={social[1]}
                    target={"_blank"}
                    rel={"noreferrer"}
                >
                    <BannerSocialButton>
                        <i
                            className={`text-white text-base fa-brands fa-${social[0].replace(
                                "social_",
                                ""
                            )}`}
                        />
                    </BannerSocialButton>
                </a>
            );
        }
    });
  };

  return (
    <div
      className="absolute flex flex-col space-y-5 md-lg:space-y-0 md-lg:flex-row w-full h-full bottom-0 px-5 pb-5 pt-7.5 md-lg:h-[233px] md-lg:px-7.5 md-lg:pb-7.5 md-lg:pt-11 rounded-2.5xl md-lg:justify-between"
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 32, 76, 0) 0%, #00204C 100%)",
      }}
    >
      <div className="flex flex-col justify-end space-y-5 w-full md-lg:w-1/2 md-lg:h-full">
        <div className="flex md-lg:w-full md-lg:space-x-3.5">
          <div className="flex items-center w-[67px] h-[67px] px-5 py-2.5 bg-white/10 rounded-0.5xl">
            {props.image && <Image src={props.image} alt="tokeImage" width={27} height={27}/>}
          </div>
          <div className="flex-1 w-1/2 space-y-2">
            <div className="text-white text-lg font-poppins leading-none">
              {props.name}
            </div>
            <div className="text-white/80 text-xs font-poppins">
                Circulating Supply : <span className="text-white">$1,000,000</span>
            </div>
            {props.website ? (
              <div className="truncate text-white/80 text-xs font-poppins">
                Website :{" "}
                <span className="text-white">
                  <a href={props.website} target={"_blank"} rel={"noreferrer"}>
                    {props.website}
                  </a>
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="relative grow flex flex-col justify-end w-full md-lg:w-1/3 md-lg:h-full">
        <div className="absolute flex flex-col w-full md-lg:bottom-0 md-lg:right-0 space-y-5">
          <div className="w-full">
            <a href={props.whitepaper} target={"_blank"} rel={"noreferrer"}>
              <ButtonOutline>
                <span className="pr-2.5 text-white">
                  <i className="fa-solid fa-file-code" />
                </span>
                <span className="text-white">
                  View Whitepaper
                </span>
              </ButtonOutline>
            </a>
          </div>
          <div className="flex flex-row justify-between w-full">
            {mapSocials()}
          </div>
        </div>
      </div>
    </div>
  );
}
