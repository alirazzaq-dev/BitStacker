import Image from "next/image";

const TheTeam = () => {
  return (
    <div id="team" className="my-14">
      <div>
        <h1
          style={{ backgroundImage: "url('/assets/icons/curve.svg')" }}
          className="text-center bg-no-repeat  bg-center font-bold text-7xl"
        >
          The team
        </h1>
        <p className="text-base font-light text-center mt-2 max-w-[1066px] mx-auto text-[#BDBDBD] leading-7">
          BitStacker is a collaboration between Brunei Crypto & Blockchain Labs
          Singapore – who have been in the cryptocurrency industry since 2016 –
          providing turnkey service & solutions by helping clients design,
          source, set-up and operate mining farms across South East Asia.
        </p>
      </div>

      <div className="relative">
        <div className="flex justify-center relative">
          <div className="absolute top-10">
            <Image
              alt="line"
              width={304}
              height={10}
              src={"/assets/icons/line.svg"}
            />
          </div>
          <div className="absolute -top-[23px]  left-1/2 -translate-x-1/2">
            <Image
              alt="star"
              width={170}
              height={150}
              src={"/assets/icons/star.svg"}
            />
          </div>
        </div>
        <div className="bg-[#f7931a] w-[400px] h-[400px] blur-[300px] absolute top-[100px] left-1/2 -translate-x-1/2"></div>
        <div className=" mt-28 flex flex-col  items-center text-center">
          <h3 className="text-center font-medium z-40  text-3xl">
            Blockchain Labs Singapore
          </h3>
          <div className="flex  items-start justify-center my-10">
            <div className="flex flex-col mx-8 items-center z-40 justify-center max-w-[220px] text-center">
              <Image
                alt="wong"
                width={133}
                height={133}
                src={"/assets/pictures/wong.png"}
              />
              <h1 className="text-3xl font-bold mt-5 mb-1">KC Wong</h1>
              <p className="text-base text-[#F3F3F3] opacity-50">
                Consultant, Strategy DevOps and Cyber Security
              </p>
            </div>
            <div className="flex flex-col mx-8 items-center z-40 justify-center max-w-[220px] text-center">
              <Image
                alt="cheng"
                width={133}
                height={133}
                src={"/assets/pictures/cheng.png"}
              />
              <h1 className="text-3xl font-bold mt-5 mb-1">Marc Cheng</h1>
              <p className="text-base text-[#F3F3F3] opacity-50">
                Consulting & Strategy
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute top-10">
            <Image
              alt="line"
              width={304}
              height={10}
              src={"/assets/icons/line.svg"}
            />
          </div>
          <div className="absolute -top-[23px]  left-1/2 -translate-x-1/2">
            <Image
              alt="star"
              width={170}
              height={150}
              src={"/assets/icons/star.svg"}
            />
          </div>
        </div>

        <div className="my-8 mt-28 flex flex-col items-center text-center">
          <h3 className="text-center font-medium text-3xl">Brunei Crypto</h3>
          <div className="flex items-start justify-center my-10">
            <div className="flex flex-col mx-8 items-center justify-center max-w-[220px] text-center">
              <Image
                alt="shaz"
                width={133}
                height={133}
                src={"/assets/pictures/shaz.png"}
              />
              <h1 className="text-3xl font-bold mt-5 mb-1">Shaz Ali</h1>
              <p className="text-base text-[#F3F3F3] opacity-50">
                Founder & Project Manager
              </p>
            </div>
            <div className="flex flex-col mx-8 items-center justify-center max-w-[220px] text-center">
              <Image
                alt="hilmi"
                width={133}
                height={133}
                src={"/assets/pictures/hilmi.png"}
              />
              <h1 className="text-3xl font-bold mt-5 mb-1">Hilmi Shah</h1>
              <p className="text-base text-[#F3F3F3] opacity-50">
                Community & Marketing Manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheTeam;
