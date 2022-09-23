import Image from "next/image";
import {
  BottomLeft,
  Hashing,
  Locked,
  SettingLock,
  TopRight,
  Transfer,
} from "../../public/assets/icons";

const WhyChooseUs = () => {
  return (
    <div id="WhyChooseus" className="my-14">
      <h1
        style={{ backgroundImage: "url('/assets/icons/curve.svg')" }}
        className="text-center bg-no-repeat bg-right-bottom max-w-[703px] font-bold text-[60px] mx-auto"
      >
        Why choose Bitstacker?
      </h1>

      <p className="max-w-[1186px] mx-auto text-center text-[#BDBDBD] text-2xl my-4 leading-10">
        Since the advent of cloud mining solutions, there were many shortcomings
        in guaranteeing rewards to customers while sustaining the business built
        around Web 2.0 technology.
      </p>

      <div className="relative">
        <div className="bg-[#f7931a] w-[400px] h-[400px] blur-[300px] absolute top-60 left-1/2 -translate-x-1/2"></div>

        <div
          style={{ backgroundImage: "url('./assets/pictures/pattern.png')" }}
          className="bg-no-repeat bg-center my-10 relative	flex items-center justify-center h-[400px] "
        >
          <div className="absolute top-0 right-0">
            <Image
              alt="star"
              height={100}
              width={400}
              src={"/assets/icons/star.svg"}
            />
          </div>
          <div className="bg-[#1B1B21] relative mx-8 transform -skew-x-12 flex flex-col items-center justify-center max-w-[369px] rounded-lg p-10">
            <div className="absolute top-1 right-1">
              <TopRight />
            </div>

            <div className="bg-[#F71B1B33] w-[69px] h-[69px] flex items-center justify-center  rounded-lg">
              <SettingLock />
            </div>
            <div className="mt-3 mb-2">
              <Image
                alt="line"
                height={1}
                width={324}
                src={"/assets/icons/line.svg"}
              />
            </div>
            <h3 className="text-[#F71B1B] mb-2 font-bold text-base">
              No guarantee of ROI
            </h3>

            <p className="font-light text-xs max-w-[290px] text-[#fff] mx-auto text-center">
              In the event of a crypto winter, the client runs the risk of
              having the contract expire before achieving ROI
            </p>
            <div className="absolute bottom-0 left-0">
              <BottomLeft />
            </div>
          </div>
          <div className="relative bg-[#1B1B21] mx-8 transform -skew-x-12 flex flex-col items-center justify-center max-w-[369px] rounded-lg p-10">
            <div className="absolute top-1 right-1">
              <TopRight />
            </div>
            <div className="bg-[#F71B1B33] w-[69px] h-[69px] flex items-center justify-center  rounded-lg">
              <Locked />
            </div>
            <div className="mt-3 mb-2">
              <Image
                alt="line"
                height={1}
                width={324}
                src={"/assets/icons/line.svg"}
              />
            </div>
            <h3 className="text-[#F71B1B] mb-2 font-bold text-base">
              Locked-in Period
            </h3>

            <p className="font-light text-xs max-w-[290px] text-[#fff] mx-auto text-center">
              Investments are locked in for the contract duration and there is
              no way to exit without a loss
            </p>
            <div className="absolute bottom-0 left-0">
              <BottomLeft />
            </div>
          </div>

          <div className="absolute bottom-0 left-0">
            <Image
              alt="star"
              height={100}
              width={400}
              src={"/assets/icons/star.svg"}
            />
          </div>

          <div className="absolute bottom-0">
            <Image
              alt="line"
              width={304}
              height={10}
              src={"/assets/icons/line.svg"}
            />
          </div>
          <div className="absolute -bottom-[70px]  left-1/2 -translate-x-1/2">
            <Image
              alt="star"
              width={170}
              height={150}
              src={"/assets/icons/star.svg"}
            />
          </div>
        </div>
      </div>

      <p className="max-w-[1198px] mx-auto text-center text-[#BDBDBD] text-2xl my-4">
        Bitstacker aims to eliminate these shortcomings by leveraging on Web 3.0
        services to ensure ownership & liquidity through the use of smart
        contract NFTs. By owning our NFT, the users are guaranteed a portion of
        rewards from physical mining machines operated 24/7/365 by skilled
        technicians. In addition, holders of our NFT will also be able to:
      </p>

      <div className="relative">
        <div className="bg-[#f7931a] w-[400px] h-[300px] blur-[700px] absolute top-60 left-1/2 -translate-x-1/2"></div>

        <div
          style={{ backgroundImage: "url('./assets/pictures/pattern.png')" }}
          className="bg-no-repeat bg-center my-10 relative	flex items-center justify-center h-[400px] "
        >
          <div className="bg-[#1B1B21] relative mx-8 transform -skew-x-12 flex flex-col items-center justify-center max-w-[369px] rounded-lg p-10">
            <div className="absolute top-1 right-1">
              <TopRight />
            </div>

            <div className="bg-[#1BF73133] w-[69px] h-[69px] flex items-center justify-center  rounded-lg">
              <Transfer />
            </div>
            <div className="mt-3 mb-2">
              <Image
                alt="line"
                height={1}
                width={324}
                src={"/assets/icons/line.svg"}
              />
            </div>
            <h3 className="text-[#1BF731] mb-2 font-bold text-base">
              Transfer ownership
            </h3>

            <p className="font-light text-xs max-w-[290px] text-[#fff] mx-auto text-center">
              No lock in period, you are free to transfer you NFT to another
              party on Opensea, LooksRare or other NFT marketplaces. Due to the
              intrinsic value our NFT provides, you can be assured that your
              investment stays liquid as the value appreciates in the exploding
              NFT market.
            </p>
            <div className="absolute bottom-0 left-0">
              <BottomLeft />
            </div>
          </div>
          <div className="relative bg-[#1B1B21] mx-8 transform -skew-x-12 flex flex-col items-center justify-center max-w-[369px] rounded-lg p-10">
            <div className="absolute top-1 right-1">
              <TopRight />
            </div>
            <div className="bg-[#1BF73133] w-[69px] h-[69px] flex items-center justify-center  rounded-lg">
              <Hashing />
            </div>
            <div className="mt-3 mb-2">
              <Image
                alt="line"
                height={1}
                width={324}
                src={"/assets/icons/line.svg"}
              />
            </div>
            <h3 className="text-[#1BF731] mb-2 font-bold text-base">
              Perpetual Hashing power
            </h3>

            <p className="font-light text-xs max-w-[290px] text-[#fff] mx-auto text-center">
              We will be committing a part of our profits to our own treasury.
              The treasury funds shall be used to purchase new miners for our
              farms in the event of hardware failure requiring
              replacement/repair, allowing us to keep up with our hashing
              commitments into perpetuity.
            </p>
            <div className="absolute bottom-0 left-0">
              <BottomLeft />
            </div>
          </div>

          <div className="absolute bottom-0 right-0">
            <Image
              alt="star"
              height={100}
              width={400}
              src={"/assets/icons/star.svg"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
