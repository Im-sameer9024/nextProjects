import React from "react";
import CountChart from "./CountChart";
import { Ellipsis } from "lucide-react";
import prisma from "@/lib/prisma";

 


const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["gender"],
    _count: true,
  });

  const boys = data.find((item) => item.gender === "MALE")?._count ?? 0;
  const girls = data.find((item) => item.gender === "FEMALE")?._count ?? 0;

 const totalPercent:number = boys+girls

   const entriesData = [
  {
    name: "Total",
    count: Math.round((totalPercent/totalPercent)*100),
    fill: "white",
  },
  {
    name: "Girls",
    count: Math.round((girls/totalPercent)*100),
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count:Math.round((boys/totalPercent)*100),
    fill: "#C3EBFA",
  },
];

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg ">
      {/* Title can be added here if needed */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-semibold">Students</h1>
        <span className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors  hover:cursor-pointer">
          <Ellipsis />
        </span>
      </div>

      {/* Chart Container */}
      <div className="flex-1 w-full">
        <CountChart girls={girls} boys={boys} />
      </div>

      {/* Custom Legend at Bottom */}
      <div className="flex justify-center gap-6 mt-4">
        {entriesData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <div className="text-sm">
              <span className="font-medium">{entry.name}</span>
              <span className="block text-gray-600">{entry.count}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountChartContainer;
