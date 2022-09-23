import Image from "next/image";
import { TopLeft, TopRight } from "../../public/assets/icons";

const Graph = () => {
  return (
    <div id="graph" className="relative my-28 p-5">
      <div className="absolute left-0 top-0">
        <TopLeft />
      </div>
      <div className="absolute right-0 top-0">
        <TopRight />
      </div>
      <div className="flex justify-center relative">
        <div className="absolute -top-[30px]">
          <Image
            alt="line"
            width={700}
            height={10}
            src={"/assets/icons/line.svg"}
          />
        </div>
        <div className="absolute -top-[93px]  left-1/2 -translate-x-1/2">
          <Image
            alt="star"
            width={170}
            height={150}
            src={"/assets/icons/star.svg"}
          />
        </div>
      </div>

      <div className="bg-[#f7931a] w-[400px] h-[200px] blur-[350px] absolute top-10 left-10"></div>
      {/* Graph Images */}

      <img
        className="mx-auto h-[520px]"
        alt="graph"
        src={"/assets/pictures/graph.png"}
      />

      <div className="bg-[#f7931a] w-[400px] h-[200px] blur-[300px] absolute bottom-0 right-0 "></div>

      <div className="flex justify-center relative">
        <div className="absolute top-0">
          <Image
            alt="line"
            width={700}
            height={10}
            src={"/assets/icons/line.svg"}
          />
        </div>
        <div className="absolute -top-[62px]  left-1/2 -translate-x-1/2">
          <Image
            alt="star"
            width={170}
            height={150}
            src={"/assets/icons/star.svg"}
          />
        </div>
      </div>
      <div className="absolute left-0 bottom-0">
        <Image
          alt="bottomleft"
          width={40}
          height={36}
          src={"/assets/icons/bottomleft.svg"}
        />
      </div>
      <div className="absolute right-0 bottom-0">
        <Image
          alt="bottomright"
          width={40}
          height={36}
          src={"/assets/icons/bottomright.svg"}
        />
      </div>
    </div>
  );
};

export default Graph;
