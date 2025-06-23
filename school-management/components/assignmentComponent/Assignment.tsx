"use client";

import {
  ArrowUpDown,
  Edit,
  ListFilter,
  Plus,
  Search,
  Trash,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { TableCell, TableRow } from "../../components/ui/table";
import PaginationComponent from "../../components/PaginationComponent";
import Link from "next/link";
import TableComponent from "../../components/TableComponent";
import type { Assignment } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Model from "../Model";

interface columnsProps {
  header: string;
  accessor: string;
  classes?: string;
}

type assignmentProps = Assignment & {
  lesson: {
    class: { name: string };
    subject: { name: string };
    teacher: { name: string };
  };
};

const Assignment = ({
  data,
  page,
  count,
  role,
}: {
  data: assignmentProps[];
  page: number;
  count: number;
  role: string | null;
}) => {
  const columns: columnsProps[] = [
    {
      header: "Subject Name",
      accessor: "name",
      classes: "font-bold text-md",
    },
    {
      header: "Class",
      accessor: "class",
      classes: "font-bold text-md",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      classes: "hidden md:table-cell font-bold text-md",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
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
  const [visible, setVisible] = useState(false);
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

  const renderRow = (item: assignmentProps) => (
    <TableRow
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <TableCell className=" md:table-cell">
        {item.lesson.subject.name}
      </TableCell>
      <TableCell>{item.lesson.class.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.lesson.teacher.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.dueDate.toLocaleDateString()}
      </TableCell>

      <TableCell>
        {/* Notifications Button */}
        {role === "admin" || role === "teacher" && (
          <div>
            <Link href={`/list/teachers/${item.id}`}>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <Edit className="text-gray-600 w-5 h-5" />
              </button>
            </Link>
            <button
              onClick={() => setVisible(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <Trash className="text-gray-600 w-5 h-5" />
            </button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {/*------------ Top ---------- */}
      <div className=" flex justify-between items-center">
        <h2 className=" hidden md:block text-lg font-semibold">
          All Assignment
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
        <Model
          openModel={visible}
          content={
            <div className=" flex justify-center flex-col text-center gap-4">
              <p className=" flex justify-end">
                <span
                  onClick={() => setVisible(false)}
                  className=" hover:cursor-pointer"
                >
                  <X />
                </span>
              </p>
              <h2>
                All data will be lost. Are you sure you want to delete this
                event?
              </h2>
              <Button className="w-fit mx-auto bg-red-500 hover:bg-red-600">
                Delete
              </Button>
            </div>
          }
        />
        {data.length <= 0 ? (
          <div className="text-center text-gray-500 h-64">
            No parents found.
          </div>
        ) : (
          <div>
            <TableComponent
              columns={columns}
              renderRow={renderRow}
              data={data}
            />
            <PaginationComponent page={page} count={count} />
          </div>
        )}
      </div>
    </>
  );
};

export default Assignment;
