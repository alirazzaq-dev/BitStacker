import Image from "next/image";
import { ArrowRight } from "../assets/icons";

const Banner = () => {
  return (
    <>
      <div id="home" className="flex pt-36 mt-0 items-center my-14">
        <div className="max-w-[506px] pl-14 w-full">
          <h1
            style={{ backgroundImage: "url('/assets/icons/curve.svg')" }}
            className="font-bold text-6xl bg-no-repeat bg-bottom leading-[70px]"
          >
            Redefining the future of Bitcoin mining through Ethereum NFTs
          </h1>
          <h5 className="font-normal text-2xl text-[#C0C0C0] mt-5 leading-[35px]">
            An innovative cloud mining solution utilizing Ethereum NFTs as a
            perpetual contract to reward its holders with Bitcoin.
          </h5>
          <div className="flex items-center  mt-14">
            <button className="rounded-lg bg-[#F7931A] font-medium text-xl py-3 px-7">
              Dashboard
            </button>
            <button className="rounded-lg flex items-center  font-normal text-xl py-3 px-7">
              Minting
              <span>
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <div
            className="bg-center relative"
            style={{ backgroundImage: "url('./assets/pictures/pattern.png')" }}
          >
            <Image
              alt="landing-img"
              width={714}
              height={430}
              src={"/assets/pictures/landing-img.png"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
