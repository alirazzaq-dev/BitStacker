import { useState } from "react";

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
const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  maintainAspectRatio: false,
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const data = {
  labels,
  datasets: [
    {
      lineTension: 0.4,
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => Math.floor(Math.random() * 60)),
      borderColor: "#F4931E",
      backgroundColor: "#F4931E1A",
    },
  ],
};
const Chart = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <div className="bg-[#121212] rounded-3xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">
          <span className="text-[#F9921C] "> BTC</span> Holding
        </h1>

        <div
          onClick={() => {
            setIsDropDownOpen(!isDropDownOpen);
          }}
          className="bg-[#F4931E1A] relative rounded-full flex items-center justify-center font-light text-xs px-4 py-2 text-[#F4931E]  cursor-pointer"
        >
          <span className="mr-3">Monthly</span>
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
                stroke="#F4931E"
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
                  fill="#F4931E"
                  transform="translate(7.02344) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>

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
        </div>
      </div>

      <div>
        <Line width={"100%"} height={"248px"} options={options} data={data} />
      </div>
    </div>
  );
};

export default Chart;
