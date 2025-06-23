import React from "react";
import UserCard from "../../../components/UserCard";
import FinanceChart from "../../../components/FinanceChart";
import EventCalendar from "../../../components/EventCalendar";
import Announcements from "../../../components/Announcements";
import CountChartContainer from "@/components/CountChartContainer";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import EventCalenderContainer from "@/components/EventCalenderContainer";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className=" p-4 flex gap-4 flex-col md:flex-row">
      {/* Left side  */}
      <div className="w-full lg:w-2/3 ">
        {/*--------- users cards -------- */}
        <div className="  gap-4 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>

        {/* middle charts  */}
        <div className="flex gap-4 flex-col lg:flex-row mt-4 h-[450px] w-full">
          {/* left side  */}
          <div className=" w-full lg:w-1/3 h-full ">
            <CountChartContainer />
          </div>

          {/* right side  */}
          <div className="w-full lg:w-2/3  h-full">
            <AttendanceChartContainer />
          </div>
        </div>

        {/*------- bottom chart---------  */}
        <div className=" w-full h-[500px] mt-4">
          <FinanceChart />
        </div>
      </div>

      {/* Right side  */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 ">
      <EventCalenderContainer searchParams={searchParams} />
      <Announcements/>
      
      </div>
    </div>
  );
};

export default AdminPage;
