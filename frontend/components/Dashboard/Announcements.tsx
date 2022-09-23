import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";

const Announcements = () => {

  type Announcements = {
    announcements: string[];
    dates: string[];
  }

  const [announcements, setAnnouncements] = useState<Announcements>();
  const [loading, setLoading] = useState(false);

  const fetchAnnoucements = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/getAnnouncements");
      console.log("data", res.data)
      setAnnouncements({
        announcements: (Object.values(res.data.announcements) as string[]).reverse(),
        dates: (Object.values(res.data.dates) as string[]).reverse()
      })
      setLoading(false);
    }
    catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnnoucements();
  }, []);

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

              {
                loading ? (
                  <Flex w="1200px" justifyContent="center" m={10}> <Spinner size="lg" /> </Flex>
                ) :
                  announcements?.announcements.map((announcement, index) => (
                    <div className="flex" key={index}>
                      <h2 className="font-bold text-sm mr-4">{announcements?.dates[index]}</h2>
                      <p className="text-[#C1C1C1] font-normal text-sm">
                        {announcement}
                      </p>
                    </div>
                  ))
              }
            </div>

          </div>

          {/* <p className="font-normal text-sm text-[#C1C1C1] mt-8">
            Please submit your{" "}
            <span className="underline text-[#fff]">votes</span> below
          </p> */}

        </div>
      </div>
    </div>
  );
};

export default Announcements;
