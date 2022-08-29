import React, { useState } from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title } from "chart.js";
import { Balances, Hashes } from './Details';

const DonutChart = (
    { balances, hashes }:
        {
            balances: Balances | undefined,
            hashes: Hashes | undefined
        }
) => {

    ChartJS.register(ArcElement, Title);

    enum DONUT {
        NFTS,
        HASHES,
    }
    const [donut, setDonut] = useState(DONUT.NFTS);

    const dataNFTs = {
        labels: ["Black NFts", "Blue NFTs"],
        datasets: [
            {
                label: "Dataset",
                data: [balances?.totalBlack, balances?.totalBlue],
                backgroundColor: ["#171717", "#215FFF"],
                borderColor: ["#363636", "#215FFF"],
                hoverOffset: 4,
                cutout: 120,
            },
        ],
    };

    const dataHashes = {
        labels: ["Black Hashes", "Blue Hashes"],
        datasets: [
            {
                label: "Dataset",
                data: [hashes?.totalBlackHases, hashes?.totalBlueHases],
                backgroundColor: ["#171717", "#215FFF"],
                borderColor: ["#363636", "#215FFF"],
                cutout: 100,
            },
        ],
    };

    const nullData = {
        datasets: [
            {
                label: "Dataset",
                data: [100],
                backgroundColor: ["#ff7171"],
                borderColor: ["#ff3f3f"],
                cutout: 100,
            },
        ],
    };

    return (
        <div className="bg-[#121212] flex flex-col justify-between rounded-3xl px-5 py-3 max-w-[442px] w-full ">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl">
                    <span className="text-[#F4931E]">NFT</span> Portfolio
                </h1>

                <select
                    className="bg-[#000000] cursor-pointer"
                    onChange={(e) => setDonut(Number(e.target.value))}
                >
                    <option value={DONUT.NFTS}>NFTs</option>
                    <option value={DONUT.HASHES}>Hashes</option>
                </select>
            </div>

            <div className=" w-[270px] mx-auto my-4 flex items-center justify-between"></div>
            <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                    {donut === DONUT.NFTS ? ` ${balances?.total} Tokens` : `${hashes?.total} Terrahash`}
                </div>

                {
                    hashes && hashes.total > 0 && (
                        <Doughnut
                            width={250}
                            height={250}
                            data={donut === DONUT.NFTS ? dataNFTs : dataHashes}
                        />
                    )
                }


                {
                    hashes && hashes.total === 0 && (
                        <Doughnut
                            width={250}
                            height={250}
                            data={nullData}
                        />
                    )
                }

            </div>

        </div>
    )
}

export default DonutChart