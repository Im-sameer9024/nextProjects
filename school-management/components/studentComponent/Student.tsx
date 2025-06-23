"use client";

import {
  ArrowUpDown,
  Eye,
  ListFilter,
  Plus,
  Search,
  Trash,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import TableComponent from "../TableComponent";
import PaginationComponent from "../PaginationComponent";
import type {
  Student,
  Class,
  Grade,
  Parent,
  Attendance,
  Result,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import Model from "../Model";
import { Button } from "../ui/button";

interface columnsProps {
  header: string;
  accessor: string;
  classes?: string;
}

const columns: columnsProps[] = [
  {
    header: "Info",
    accessor: "info",
    classes: "font-bold  text-md",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    classes: "hidden md:table-cell font-bold  text-md",
  },
  {
    header: "Grade",
    accessor: "grade",
    classes: "hidden md:table-cell font-bold  text-md",
  },
  {
    header: "Phone",
    accessor: "phone",
    classes: "hidden md:table-cell font-bold  text-md",
  },
  {
    header: "Address",
    accessor: "address",
    classes: "hidden md:table-cell font-bold  text-md",
  },
  {
    header: "Actions",
    accessor: "action",
    classes: " font-bold  text-md",
  },
];

type StudentDataProps = Student & { class: Class } & { grade: Grade } & {
  parent: Parent;
} & { attendances: Attendance[] } & { results: Result[] };

const Student = ({
  data,
  page,
  count,
  role
}: {
  data: StudentDataProps[];
  page: number;
  count: number;
  role: string | null;
}) => {


  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    if (text.trim()) {
      params.set("search", text);
    } else {
      params.delete("search");
    }

    router.push(`${window.location.pathname}?${params}`);
  };

  //----------------row for the rending in the body of the table----------

  const renderRow = (item: StudentDataProps) => (
    <TableRow
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <TableCell className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class?.name}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{item.username}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.grade?.level}
      </TableCell>
      <TableCell className="hidden md:table-cell">{item.phone}</TableCell>
      <TableCell className="hidden md:table-cell">{item.address}</TableCell>

      <TableCell>
        {/* Detail Button */}
        <Link href={`/list/students/${item.id}`}>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Eye className="text-gray-600 w-5 h-5" />
          </button>
        </Link>

        {/* Notifications Button */}
        {role === "admin" && (
          <button onClick={() => setVisible(true)} className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
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
        <h2 className=" hidden md:block text-lg font-semibold">All Students</h2>
        <div className=" flex md:flex-row md:w-fit w-full flex-col gap-4 items-center">
          {/*---------- search bar section --------- */}
          <form
            onSubmit={handleSubmit}
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
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No students found</p>
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

export default Student;
