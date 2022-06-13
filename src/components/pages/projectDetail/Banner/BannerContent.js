import BannerSocialButton from "./BannerSocialButton";

export default function PreviewContent(props) {
  return (
    <div
      className="absolute flex flex-col space-y-5 md-lg:space-y-0 md-lg:flex-row w-full h-full bottom-0 px-5 pb-5 pt-7.5 md-lg:h-[233px] md-lg:px-7.5 md-lg:pb-7.5 md-lg:pt-11 rounded-2.5xl md-lg:justify-between"
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 32, 76, 0) 0%, #00204C 100%)",
      }}
    >
      <div className="flex flex-col space-y-5 w-full md-lg:w-1/2 md-lg:h-full">
        <div className="flex md-lg:w-full md-lg:h-1/2 md-lg:space-x-3.5">
          <div className="flex-none w-[67px] h-[67px] px-5 py-2.5 bg-white/10 rounded-0.5xl">
            <img className={'w-100 '} src={props.tokenImage} />
          </div>
          <div className="flex-1 w-1/2 h-[67px] space-y-2">
            <div className="text-white text-lg font-poppins leading-none">
              {props.name}
            </div>
            <div className="text-white/80 text-xs font-poppins">
              Total value locked : <span className="text-white">$100,000</span>
            </div>
            <div className="text-white/80 text-xs font-poppins">
              Website : <span className="text-white"><a href={props.website} target={'_blank'} rel={'noreferrer'}>{props.website}</a></span>
            </div>
          </div>
        </div>
        <div className="md-lg:w-full md-lg:h-1/2 text-white leading-6 font-poppins opacity-80">
          {props.description}
        </div>
      </div>
      <div className="relative w-48 md-lg:h-full">
        <div className="absolute flex flex-col w-full md-lg:h-1/2 md-lg:bottom-0 md-lg:right-0 space-y-5">
          <div className="">
            <div className="flex text-white/80 text-md-lg font-poppins leading-normal justify-between">
              <span>Document :</span>
              <span className="text-white text-indigo-500 font-semibold">
                Whitepaper
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <BannerSocialButton>
              <svg
                width="16"
                height="18"
                viewBox="0 0 9 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.48448 17.2304V9.28965H0.384766V6.43058H2.48448V3.98857C2.48448 2.06961 3.72479 0.307373 6.58272 0.307373C7.73986 0.307373 8.5955 0.418304 8.5955 0.418304L8.52808 3.08819C8.52808 3.08819 7.65546 3.07969 6.70322 3.07969C5.6726 3.07969 5.50748 3.55464 5.50748 4.34293V6.43058H8.61001L8.47501 9.28965H5.50748V17.2304H2.48448Z"
                  fill="white"
                />
              </svg>
            </BannerSocialButton>
            <BannerSocialButton>
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6922 2.32972C15.1265 2.58041 14.5187 2.7498 13.8798 2.82637C14.539 2.43189 15.0323 1.81102 15.2674 1.07962C14.648 1.44753 13.9701 1.7065 13.2632 1.84526C12.7878 1.33768 12.1581 1.00125 11.4719 0.888195C10.7858 0.775143 10.0814 0.891798 9.46835 1.22005C8.85526 1.5483 8.36769 2.06978 8.08134 2.70353C7.79499 3.33727 7.72588 4.04783 7.88474 4.72488C6.62969 4.66187 5.40192 4.33566 4.2811 3.76743C3.16028 3.1992 2.17147 2.40165 1.37884 1.42653C1.10781 1.89405 0.951974 2.43609 0.951974 3.01337C0.951672 3.53305 1.07965 4.04478 1.32455 4.50314C1.56945 4.9615 1.9237 5.35232 2.35587 5.64094C1.85467 5.62499 1.36452 5.48956 0.926227 5.24592V5.28658C0.926176 6.01545 1.1783 6.7219 1.63982 7.28605C2.10134 7.85019 2.74382 8.23729 3.45826 8.38166C2.99331 8.50749 2.50584 8.52603 2.03268 8.43586C2.23425 9.06302 2.62689 9.61144 3.15564 10.0044C3.68439 10.3973 4.32276 10.615 4.98141 10.6271C3.86332 11.5048 2.4825 11.9809 1.06106 11.9788C0.809268 11.9789 0.557687 11.9642 0.307617 11.9348C1.75046 12.8625 3.43003 13.3548 5.14538 13.3529C10.952 13.3529 14.1264 8.54359 14.1264 4.37255C14.1264 4.23704 14.123 4.10017 14.1169 3.96466C14.7344 3.51813 15.2673 2.96519 15.6909 2.33175L15.6922 2.32972Z"
                  fill="white"
                />
              </svg>
            </BannerSocialButton>
            <BannerSocialButton>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.7506 15.692H0.561036V5.42056H3.7506V15.692ZM2.15389 4.01946C1.13411 4.01946 0.306641 3.17441 0.306641 2.15463C0.306641 1.6647 0.501261 1.19485 0.847688 0.848421C1.19412 0.501994 1.66397 0.307373 2.15389 0.307373C2.64382 0.307373 3.11367 0.501994 3.4601 0.848421C3.80653 1.19485 4.00115 1.6647 4.00115 2.15463C4.00115 3.17441 3.17367 4.01946 2.15389 4.01946ZM15.688 15.692H12.5055V10.692C12.5055 9.50023 12.4814 7.97221 10.8473 7.97221C9.18906 7.97221 8.93466 9.26671 8.93466 10.6063V15.692H5.7484V5.42056H8.80719V6.82166H8.8517C9.27752 6.01452 10.3176 5.16287 11.8693 5.16287C15.0973 5.16287 15.6907 7.28869 15.6907 10.0497V15.692H15.688Z"
                  fill="white"
                />
              </svg>
            </BannerSocialButton>
            <BannerSocialButton>
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6484 2.02047L13.3267 12.9694C13.1514 13.742 12.6948 13.9344 12.0458 13.5706L8.50807 10.9637L6.80129 12.6057C6.61226 12.7947 6.45455 12.9524 6.09023 12.9524L6.34465 9.34982L12.9008 3.42557C13.186 3.17169 12.8387 3.03047 12.4579 3.28489L4.35268 8.38873L0.863301 7.2963C0.104429 7.05947 0.0906917 6.53743 1.02156 6.17311L14.6697 0.914859C15.3016 0.678021 15.8545 1.05553 15.6484 2.02102V2.02047Z"
                  fill="white"
                />
              </svg>
            </BannerSocialButton>
          </div>
        </div>
      </div>
    </div>
  );
}
