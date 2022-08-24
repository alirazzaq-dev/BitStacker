import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="bg-[#121212] flex items-center p-2 px-4 rounded-lg">
        <h3 className="font-semibold text-xl pr-2 border-r border-[#FFFFFF] border-opacity-10 mr-2">
          <span className="text-[#F4931E]">Notifi</span>
          cations 🛎️
        </h3>
        <h4 className="font-normal text-xs">
          Your Bitcoin wallet has not been registered. Please send email to
          <span className="text-[#F4931E] underline">
            {" "}
            support@bitstacker.nft
          </span>
        </h4>

        <div className="ml-10">
          <Image
            alt="close"
            width={11}
            height={13}
            src={"/assets/icons/close.svg"}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center relative">
          <div className="bg-[#F5931B] w-2 h-2 rounded-full absolute top-0 right-0 z-50"></div>
          <Image
            alt="bell"
            width={25}
            height={25}
            src={"/assets/icons/bell.svg"}
          />
        </div>

        <div className="bg-[#121212] rounded-lg flex items-center px-3 py-2">
          <Image
            alt="bitcoin"
            width={11}
            height={16}
            src={"/assets/icons/bitcoin.svg"}
          />
          <span className="font-normal ml-2 text-base">3,25 BTC</span>
        </div>

        <div className="bg-[#121212] rounded-lg flex items-center px-3 py-2">
          <Image
            alt="etherum"
            width={11}
            height={16}
            src={"/assets/icons/etherum.svg"}
          />
          <span className="font-normal ml-2 text-base">3,25 ETH</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
