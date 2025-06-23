"use client";

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";



const CountChart = ({boys,girls}: { boys: number, girls: number }) => {

  const data = [
  {
    name: "Total",
    count: boys + girls,
    fill: "white",
  },
  {
    name: "Girls",
    count: girls,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: boys,
    fill: "#C3EBFA",
  },
];

  return (
    <>
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
    </>
  );
};

export default CountChart;
