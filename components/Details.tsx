import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

const Details = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <div className="flex space-x-5">
      <div className="flex-1 space-y-5">
        <div className="rounded-3xl bg-[#121212] flex items-center py-5 px-6">
          <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
            <Image
              alt="etherum"
              width={24}
              height={24}
              src="/assets/icons/etherum.svg"
            />
          </div>
          <div className="ml-5">
            <h2 className="font-medium text-xl">Ethereum Wallet Address:</h2>
            <p className="opacity-50 font-lighter text-2xl leading-[36px]">
              0xsd5sds8d4d84sd6s4d6s5d4s65d46sd
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="rounded-3xl flex-1 bg-[#121212] flex items-center py-5 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Image
                alt="bitcoin-black"
                width={24}
                height={24}
                src="/assets/icons/bitcoin-black.svg"
              />
            </div>
            <div className="ml-5 flex items-center justify-between flex-1">
              <div>
                <h2 className="font-medium text-xl">Total BTC Earned</h2>
                <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                  0.18300
                </p>
              </div>
              <Image
                alt="chart"
                width={80}
                height={55}
                src={"/assets/icons/chart.svg"}
              />
            </div>
          </div>

          <div className="rounded-3xl flex-1 bg-[#121212] flex items-center py-5 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Image
                alt="bitcoin-black"
                width={24}
                height={24}
                src="/assets/icons/bitcoin-black.svg"
              />
            </div>
            <div className="ml-5 flex items-center justify-between flex-1">
              <div>
                <h2 className="font-medium text-xl">Total BTC Earned</h2>
                <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                  0.18300
                </p>
              </div>
              <Image
                alt="chart"
                width={80}
                height={55}
                src={"/assets/icons/chart.svg"}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="rounded-3xl bg-[#121212] flex items-center py-5 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Image
                alt="timer"
                width={24}
                height={24}
                src="/assets/icons/timer.svg"
              />
            </div>
            <div className="ml-5">
              <h2 className="font-medium text-xl">Total hashpower</h2>
              <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                2350
              </p>
            </div>
          </div>
          <div className="rounded-3xl flex-1 opacity-50 bg-[#121212] flex items-center py-5 px-6">
            <div className="bg-white flex items-center justify-center rounded-full w-14 h-14">
              <Image
                alt="bitcoin-black"
                width={24}
                height={24}
                src="/assets/icons/bitcoin-black.svg"
              />
            </div>
            <div className="ml-5 flex-1 flex justify-between items-center">
              <div>
                <h2 className="font-medium text-xl">Available Balance</h2>
                <p className="opacity-50 font-lighter text-2xl leading-[36px]">
                  0
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-[#F5931B] rounded-xl px-8 py-3"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#121212] rounded-3xl px-5 py-3 max-w-[442px] w-full ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">
            <span className="text-[#F4931E]">NFT</span> Portfolio
          </h1>

          <div
            onClick={() => {
              setIsDropDownOpen(!isDropDownOpen);
            }}
            className="bg-[#000000] relative rounded-full flex items-center justify-center font-lighter text-xs px-4 py-2  cursor-pointer"
          >
            <span>Monthly</span>
            <svg
              width="8"
              height="7"
              viewBox="0 0 8 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_597_1310)">
                <path
                  d="M1.19976 2.32935L3.52908 4.65866L5.8584 2.32935"
                  stroke="white"
                  strokeWidth="0.873494"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_597_1310">
                  <rect
                    width="6.98795"
                    height="6.98795"
                    fill="white"
                    transform="translate(7.02344) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div
              className={`${
                isDropDownOpen ? " block " : " hidden "
              } absolute top-9 left-0 bg-[#000000] w-full p-2 rounded-lg space-y-1`}
            >
              <h5
                onClick={() => {
                  setIsDropDownOpen(!isDropDownOpen);
                }}
                className="text-center duration-300 hover:bg-[#121212] p-1 rounded-lg"
              >
                Weekly
              </h5>
              <h5
                onClick={() => {
                  setIsDropDownOpen(!isDropDownOpen);
                }}
                className="text-center duration-300 hover:bg-[#121212] p-1 rounded-lg"
              >
                Yearly
              </h5>
            </div>
          </div>
        </div>

        <div className=" flex justify-center items-center my-4">
          <Image
            width={234}
            height={236}
            src="/assets/pictures/nft-profit.png"
            alt="nft-profit"
          />
        </div>

        <div className="flex items-center justify-center space-x-5">
          <div className="flex items-center">
            <div className="bg-[#215FFF] w-3 h-3 rounded-full" />
            <h3 className="font-medium text-xl ml-1.5">Blue</h3>
          </div>{" "}
          <div className="flex items-center">
            <div className="bg-[#000000] w-3 h-3 rounded-full" />
            <h3 className="font-medium text-xl ml-1.5">Black</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
