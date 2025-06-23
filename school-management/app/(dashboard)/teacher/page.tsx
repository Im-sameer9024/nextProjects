import React from "react";
import Announcements from "../../../components/Announcements";
import getRoleForServerSide from "@/lib/role";
import BigCalendarContainer from "@/components/BIgCalendarContainer";

const TeacherPage = async() => {

  const {currentUserId} = await getRoleForServerSide()

  return (
    <div className=" p-4 flex gap-4 flex-col xl:flex-row">
      {/* Left side  */}
      <div className="w-full xl:w-2/3 ">
        <div className="h-full bg-white p-4 rounded-md">
          <h2 className=" text-xl font-semibold">Schedule (4A)</h2>
          <BigCalendarContainer type="teacherId" id={currentUserId!} />
        </div>
      </div>

      {/* Right side  */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8 ">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
