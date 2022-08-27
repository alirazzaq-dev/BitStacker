import Image from "next/image";

const Announcements = () => {
  return (
    <div className="bg-gradient-to-r	from-[#F5931B] top-[#00000000] p-px rounded-lg overflow-hidden">
      <div className="bg-[#121212] p-4 rounded-lg">
        <div
          style={{
            backgroundImage: "url('./assets/pictures/dots.png')",
          }}
          className="flex justify-between bg-center bg-contain bg-no-repeat"
        >
          <div className="">
            <h1>
              <span className="text-[#F4931E]">Announ</span>cements 🎉
            </h1>
            <div className="mt-5 space-y-1 ml-4">
              <div className="flex">
                <h2 className="font-bold text-sm mr-4">14 April, 2022</h2>
                <p className="text-[#C1C1C1] font-normal text-sm">
                  <span className="text-[#F4931E]">New submissions</span> for
                  Bitstacker Launchpad:
                </p>
              </div>
              <div className="flex">
                <h2 className="font-bold text-sm mr-4">28 April, 2022</h2>
                <p className="text-[#C1C1C1] font-normal text-sm">
                  2nd mining round for existing Holders is now{" "}
                  <span className="text-[#25FF62]">Open</span>
                </p>
              </div>
              <div className="flex">
                <h2 className="font-bold text-sm mr-4">04 May, 2022</h2>
                <p className="text-[#C1C1C1] font-normal text-sm">
                  2nd mining round for existing Holders is now{" "}
                  <span className="text-[#FF4242]">Close</span>
                </p>
              </div>
            </div>
          </div>

          {/* <div className="flex-1">
            <img alt="dots" src={"/assets/pictures/dots.png"} />
          </div> */}
          <p className="font-normal text-sm text-[#C1C1C1] mt-8">
            Please submit your{" "}
            <span className="underline text-[#fff]">votes</span> below
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
