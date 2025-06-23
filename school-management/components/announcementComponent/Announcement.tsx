"use client";

import {
  ArrowUpDown,
  Edit,
  ListFilter,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { TableCell, TableRow } from "../../components/ui/table";
import PaginationComponent from "../../components/PaginationComponent";
import Link from "next/link";
import TableComponent from "../../components/TableComponent";
import type { Announcement } from "@prisma/client";
import { useRouter } from "next/navigation";

interface columnsProps {
  header: string;
  accessor: string;
  classes?: string;
}

type dataProps = Announcement & { class: { name: string } | null };

const Announcement = ({
  data,
  page,
  count,
  role,
}: {
  data: dataProps[];
  page: number;
  count: number;
  role: string | null ;
}) => {
  const columns: columnsProps[] = [
    {
      header: "Title",
      accessor: "title",
      classes: "font-bold text-md",
    },
    {
      header: "Class",
      accessor: "class",
      classes: "font-bold text-md",
    },
    {
      header: "Date",
      accessor: "date",
      classes: "hidden md:table-cell font-bold text-md",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
            classes: "font-bold text-md",
          },
        ]
      : []),
  ];

  const [text, setText] = useState("");
  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    if (text.trim()) {
      params.set("search", text);
    } else {
      params.delete("search");
    }

    router.push(`${window.location.pathname}?${params}`);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (text.trim().length <= 0) {
        router.push("/list/announcements");
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [text, router]);

  console.log("data of announcements",data)

  const renderRow = (item: dataProps) => (
    <TableRow
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <TableCell className=" md:table-cell">{item.title}</TableCell>
      <TableCell>{item.class?.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.date.toLocaleDateString()}
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
    <>
      {/*------------ Top ---------- */}
      <div className=" flex justify-between items-center">
        <h2 className=" hidden md:block text-lg font-semibold">
          All Announcements
        </h2>
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
              onChange={(e) => setText(e.target.value)}
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
    </>
  );
};

export default Announcement;
