"use client"

import {
  ArrowUpDown,
  Edit,
  ListFilter,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { TableCell, TableRow } from "../../components/ui/table";
import PaginationComponent from "../../components/PaginationComponent";
import Link from "next/link";
import TableComponent from "../../components/TableComponent";
import type { Event } from "@prisma/client";
import { useRouter } from "next/navigation";

interface columnsProps {
  header: string;
  accessor: string;
  classes?: string;
}

const columns: columnsProps[] = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    classes: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    classes: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    classes: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type eventsDataProps = Event & { class: { name: string } | null };

const Event = ({
  data,
  page,
  count,
  role
}: {
  data: eventsDataProps[];
  page: number;
  count: number;
  role: string|null;
}) => {
  const [text, setText] = useState("");
  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    if (text.trim()) {
      params.set("search", text);
    } else {
      params.delete("search", text);
    }

    router.push(`${window.location.pathname}?${params}`);
  };

  const renderRow = (item: eventsDataProps) => (
    <TableRow
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <TableCell className=" md:table-cell">{item.title}</TableCell>
      <TableCell>{item.class?.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </TableCell>

      <TableCell>
        {/* Detail Button */}
        <Link href={`/list/teachers/${item.id}`}>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Edit className="text-gray-600 w-5 h-5" />
          </button>
        </Link>

        {/* Notifications Button */}
        {role === "admin" && (
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Trash className="text-gray-600 w-5 h-5" />
          </button>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      {/*------------ Top ---------- */}
      <div className=" flex justify-between items-center">
        <h2 className=" hidden md:block text-lg font-semibold">All Events</h2>
        <div className=" flex md:flex-row md:w-fit w-full flex-col gap-4 items-center">
          {/*---------- search bar section --------- */}
          <form
            onSubmit={submitHandler}
            className="flex items-center relative w-full "
          >
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-400 w-5 h-5" aria-hidden="true" />
            </div>
            <Input
              type="text"
              value={text}
              onChange={(e)=> setText(e.target.value)}
              placeholder="Search..."
              className=" w-full rounded-full pl-10 pr-4 py-2 border-gray-300 focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Search"
            />
          </form>

          {/*---------- filter icons ---------- */}
          <div className="flex items-center gap-2 ml-auto">
            {/* filter Button */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Sort"
            >
              <ListFilter className="text-gray-600 w-5 h-5" />
            </button>

            {/* price filter Button */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="up-down"
            >
              <ArrowUpDown className="text-gray-600 w-5 h-5" />
            </button>

            {/* Plus Button */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="up-down"
            >
              <Plus className="text-gray-600 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/*-------------- list section ------------ */}
      <div>
        <TableComponent columns={columns} renderRow={renderRow} data={data} />
        <PaginationComponent page={page} count={count} />
      </div>
    </div>
  );
};

export default Event;
