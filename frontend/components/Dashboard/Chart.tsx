// import { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { ArrowDownOrange } from "../../assets/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = ({revenue}: any) => {
  // const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const lables = Object.keys(revenue).slice(0, 31)
  const allValues = Object.values(revenue).slice(0, 31) 
  const values = allValues.map((val: any) => {
    if (val !== "") {
      return val;
    }
  })

  // console.log("lables :", lables);
  // console.log("values :", values);

  const data = {
    labels: lables,
    datasets: [
      {
        lineTension: 0.4,
        fill: true,
        label: "BitStacker",
        data: values,
        borderColor: "#F4931E",
        backgroundColor: "#F4931E1A",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: revenue.sheetName,
      },
    },
    maintainAspectRatio: false,
  };
  
  return (
    <div className="bg-[#121212] rounded-3xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">
          <span className="text-[#F9921C] "> BTC</span> Holding
        </h1>

        {/* <div
          onClick={() => {
            setIsDropDownOpen(!isDropDownOpen);
          }}
          className="bg-[#F4931E1A] relative rounded-full flex items-center justify-center font-light text-xs px-4 py-2 text-[#F4931E]  cursor-pointer"
        >
          <span className="mr-3">Monthly</span>

          <ArrowDownOrange />
          <div
            className={`${
              isDropDownOpen ? " block " : " hidden "
            } absolute top-9 left-0 bg-[#121212] w-full p-2 rounded-lg space-y-1`}
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
        </div> */}
      </div>

      <div>
        <Line width={"100%"} height={"248px"} options={options} data={data} />
      </div>
    </div>
  );
};

export default Chart;
