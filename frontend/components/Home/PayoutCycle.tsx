import Image from "next/image";
import { Tick } from "../../assets/icons";

const PayoutCycle = () => {
  return (
    <div
      id="payoutcycle"
      className="bg-no-repeat my-14  "
      style={{ backgroundImage: "url('/assets/icons/wavyline.svg')" }}
    >
      <div
        style={{ backgroundImage: "url('/assets/icons/pattren.svg')" }}
        className="max-w-[1356px] h-[350px] mx-auto bg-center relative"
      >
        <div className="bg-[#FFB760] w-[400px] h-[250px] blur-[400px] absolute top-0 left-1/2 -translate-x-1/2">
          {" "}
        </div>
        <div className="bg-[#000000] blur-[50px] h-[120px] rounded-full w-[312px]  absolute top-0 left-0"></div>
        <div className=" absolute top-0 left-4 ">
          <div className="reltive flex items-start">
            <div className="w-7 h-7 bg-[#F7931A] border-4 border-[#fff] rounded-full"></div>
            <div className="ml-5">
              <h1 className="font-bold text-3xl">Day 1</h1>
              <div className="mt-5">
                <div className="flex items-center">
                  <Tick />
                  <p className="ml-2">User mint NFT</p>
                </div>
                <div className="flex items-center">
                  <Tick />
                  <p className="ml-2">30-Day holding period starts</p>
                </div>
                <div className="flex items-center">
                  <Tick />
                  <p className="ml-2">Commerce mining setup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#000000] blur-[50px] h-[120px] rounded-full w-[312px]  absolute bottom-[30px] left-[15rem]"></div>
        <div className=" absolute bottom-[30px] left-[21.5rem] ">
          <div className="reltive flex items-start">
            <div className="w-7 h-7 bg-[#F7931A] border-4 border-[#fff] rounded-full"></div>
            <div className="ml-5">
              <h1 className="font-bold text-3xl">Day 15</h1>
              <div className="mt-5">
                <div className="flex items-center">
                  <Tick />
                  <p className="ml-2">Mining setup complete</p>
                </div>
                <div className="flex items-center">
                  <Tick />
                  <p className="ml-2">Start hashing for user</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#000000] blur-[50px] h-[120px] rounded-full w-[312px]  absolute top-0 left-[35rem]"></div>
        <div className=" absolute top-0 left-[37.5rem] ">
          <div className="reltive flex items-start">
            <div className="w-7 h-7 bg-[#F7931A] border-4 border-[#fff] rounded-full"></div>
            <div className="ml-5">
              <h1 className="font-bold text-3xl">Day 30</h1>
              <div className="mt-5">
                <div className="flex items-center">
                  <Tick />
                  <p className="ml-2">Take snapshot of holding wallets</p>
                </div>
                <div className="flex items-center">
                  <Tick />
                  <p className="ml-2">Collect BTC wallets address on Discord</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#000000] blur-[50px] h-[120px] rounded-full w-[312px]  absolute bottom-5 right-[8rem]"></div>
        <div className=" absolute bottom-[55px] right-[11rem] ">
          <div className="reltive flex items-start">
            <div className="w-7 h-7 bg-[#F7931A] border-4 border-[#fff] rounded-full"></div>
            <div className="ml-5">
              <h1 className="font-bold text-3xl">Day 45</h1>
              <div className="mt-5">
                <div className="flex items-center">
                  <Tick />
                  <p className="ml-2">Payout to holders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutCycle;
