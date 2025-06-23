import React from "react";
import EventCalendar from "./EventCalendar";
import prisma from "@/lib/prisma";

const EventCalenderContainer = async ({
  searchParams,
}: {
  searchParams?: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams ?? {};
  const actualDate = date ? new Date(date) : new Date();

  const events = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(actualDate.setHours(0, 0, 0, 0)),
        lte: new Date(actualDate.setHours(23, 59, 59, 999)),
      },
    },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
      </div>
      <div className="flex flex-col gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky-400 even:border-t-purple-400"
              key={event.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-gray-300 text-xs">
                  {event.startTime.toLocaleTimeString("en-UK", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No events scheduled for this date
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalenderContainer;