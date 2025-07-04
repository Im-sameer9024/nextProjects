import React from "react";
import AttendanceChart from "./AttendanceChart";
import { Ellipsis } from "lucide-react";
import prisma from "@/lib/prisma";


const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDate();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);

  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const responseDate = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
      Sat: { present: 0, absent: 0 },
      Sun: { present: 0, absent: 0 },
    };

  responseDate.forEach((item) => {
    // const itemData = new Date(item.date);

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayDame = daysOfWeek[dayOfWeek - 1];

      if (item.present) {
        attendanceMap[dayDame].present += 1;
      } else {
        attendanceMap[dayDame].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) =>({
    name:day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }))

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Attendance</h1>
        <span className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors  hover:cursor-pointer">
          <Ellipsis />
        </span>
      </div>

      <AttendanceChart data1={data} />
    </div>
  );
};

export default AttendanceChartContainer;
