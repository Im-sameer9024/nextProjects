"use client";

import { Ellipsis } from "lucide-react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Total",
    count: 100,
    fill: "white",
  },
  {
    name: "Girls",
    count: 55,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 45,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
  return (
    <>
      {/*--------- chart----------  */}
      <div className="w-full h-full flex flex-col bg-white rounded-lg ">
        {/* Title can be added here if needed */}
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Students</h1>
          <span className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors  hover:cursor-pointer">
            <Ellipsis />
          </span>
        </div>
        {/* <div className="text-lg font-semibold mb-2">Gender Distribution</div> */}

        {/* Chart Container */}
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="80%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="100%"
              barSize={62}
              data={data}
            >
              <RadialBar
                background
                label={{ position: "insideStart", fill: "#fff" }}
                dataKey="count"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend at Bottom */}
        <div className="flex justify-center gap-6 mt-4">
          {data.map((entry, index) => (
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
    </>
  );
};

export default CountChart;
