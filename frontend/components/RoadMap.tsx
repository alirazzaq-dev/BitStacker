import Image from "next/image";
import {ArrowRightDown} from "../assets/"

const RoadMap = () => {
  return (
    <div id="roadmaps" className="my-32">
      <h1 className=" font-bold text-[60px]">Bitstacker Roadmap</h1>
      <p className="font-light text-base mt-5">
        Follow our journey to become one of the premier mining NFT project
      </p>

      <div className="relative my-10 ml-10">
        <div className="absolute top-0 left-6">
          <Image
            alt="straightline"
            width={5}
            height={1150}
            src={"/assets/icons/straightline.svg"}
          />
        </div>
        <div className="relative flex justify-between my-5">
          <div className="max-w-[130px]">
            <h2 className="text-[#F7931A] font-bold text-3xl">Phase 1</h2>
            <p className="text-xl font-light">Pre-mint</p>
          </div>

          <div className="flex-1 ml-20 mt-5 flexs font-medium text-xl ">
            <div className="flex">
              <h3>Launch Discord Server</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>
            <div className="flex ml-40">
              <h3 className="text-[#F7931A]">Smart contract development</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>
            <div className="flex ml-80">
              <h3>Graphical design for NFT & Dashboard</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>

            <h3 className="ml-[40rem]">
              Marketing campaign to grow community & user base
            </h3>

            <div className="bg-[#fff] max-w-[615px] mx-auto h-px my-5 opacity-5"></div>
          </div>
        </div>

        <div className="relative flex justify-between my-5">
          <div className="max-w-[130px]">
            <h2 className="text-[#F7931A] font-bold text-3xl">Phase 2</h2>
            <p className="text-xl font-light">Public & Private Mint</p>
          </div>

          <div className="flex-1 ml-20 mt-5 flexs font-medium text-xl ">
            <div className="flex">
              <h3>Privacy Equity & Venture Capital</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>
            <h3 className="ml-60">General Public (No Whitelist)</h3>

            <div className="bg-[#fff] max-w-[615px] mx-auto h-px my-5 opacity-5"></div>
          </div>
        </div>

        <div className="relative flex justify-between my-5">
          <div className="max-w-[130px]">
            <h2 className="text-[#F7931A] font-bold text-3xl">Phase 3</h2>
            <p className="text-xl font-light">Post mint</p>
          </div>

          <div className="flex-1 ml-20 mt-5 flexs font-medium text-xl ">
            <div className="flex">
              <h3>White & convert funds for procurement of ASICs</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>
            <div className="flex ml-[30rem]">
              <h3 className="text-[#999999]">+30 days</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>
            <div className="flex ml-[37rem]">
              <h3>Site installation & facility setup</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>

            <h3 className="ml-[58rem]">Initialize mining pool</h3>

            <div className="bg-[#fff] max-w-[615px] mx-auto h-px my-5 opacity-5"></div>
          </div>
        </div>

        <div className="relative flex justify-between my-5">
          <div className="max-w-[130px]">
            <h2 className="text-[#F7931A] font-bold text-3xl">Phase 4</h2>
            <p className="text-xl font-light">Miners go live</p>
          </div>

          <div className="flex-1 ml-20 mt-5 flexs font-medium text-xl ">
            <div className="flex">
              <h3>Mining farm fully operationalized</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>

            <h3 className="ml-64">
              {`First payout to holders (must hold NFT in wallet for > 30 days)`}
            </h3>

            <div className="bg-[#fff] max-w-[615px] mx-auto h-px my-5 opacity-5"></div>
          </div>
        </div>

        <div className="relative flex justify-between my-5">
          <div className="max-w-[130px]">
            <h2 className="text-[#F7931A] font-bold text-3xl">Phase 5</h2>
            <p className="text-xl font-light">Project Launchpad</p>
          </div>

          <div className="flex-1 ml-20 mt-5 flexs font-medium text-xl ">
            <div className="flex">
              <h3>DAO votes on proposed startups</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>
            <div className="flex ml-80">
              <h3>Award winniers of launchpad</h3>
              <div className="mt-4">
                <Image
                  alt="arrowrightdown"
                  width={77}
                  height={38.5}
                  src={"/assets/icons/arrowrightdown.svg"}
                />
              </div>
            </div>

            <h3 className="ml-[36rem]">
              Launch new project backed by Bitstacker
            </h3>

            <div className="bg-[#fff] max-w-[615px] mx-auto h-px my-5 opacity-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
