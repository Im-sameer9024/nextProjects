import React from 'react'
import EventCalendar from '../../../components/EventCalendar';
import Announcements from '../../../components/Announcements';
import getRoleForServerSide from '@/lib/role';
import prisma from '@/lib/prisma';
import BigCalendarContainer from '@/components/BIgCalendarContainer';

const StudentPage = async() => {

  const{currentUserId} = await getRoleForServerSide()

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: currentUserId! } },
    },
  });

  return (
    <div className=" p-4 flex gap-4 flex-col xl:flex-row">
      {/* Left side  */}
      <div className="w-full xl:w-2/3 ">
      <div className='h-full bg-white p-4 rounded-md'>
        <h2 className=' text-xl font-semibold'>Schedule (4A)</h2>
        <BigCalendarContainer type="classId" id={classItem[0]?.id} />

      </div>
        
      </div>

      {/* Right side  */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8 ">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}

export default StudentPage
