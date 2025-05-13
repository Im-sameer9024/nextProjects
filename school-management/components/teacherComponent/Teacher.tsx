"use client"

import { useState } from "react";
import { role, teacherDataProps, teachersData } from "../../assets/dummyData/Data";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { ArrowUpDown, Eye, ListFilter, Plus, Search, Trash, X } from "lucide-react";
import { Input } from "../ui/input";
import Model from "../Model";
import { Button } from "../ui/button";
import TableComponent from "../TableComponent";
import PaginationComponent from "../PaginationComponent";
import Link from "next/link";

interface columnsProps {
  header: string;
  accessor: string;
  classes?: string;
}

const columns: columnsProps[] = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    classes: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    classes: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    classes: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    classes: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    classes: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const Teacher = () => {
  const [visible, setVisible] = useState(false);

  const renderRow = (item: teacherDataProps) => (
    <TableRow
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <TableCell className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{item.teacherId}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.subjects.join(",")}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.classes.join(",")}
      </TableCell>
      <TableCell className="hidden md:table-cell">{item.phone}</TableCell>
      <TableCell className="hidden md:table-cell">{item.address}</TableCell>
      <TableCell>
        {/* Detail Button */}
        <Link href={`/list/teachers/${item.id}`}>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Eye className="text-gray-600 w-5 h-5" />
          </button>
        </Link>

        {/* Notifications Button */}
        {role === "admin" && (
          <button
            onClick={() => setVisible(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          >
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
        <h2 className=" hidden md:block text-lg font-semibold">All Teachers</h2>
        <div className=" flex md:flex-row md:w-fit w-full flex-col gap-4 items-center">
          {/*---------- search bar section --------- */}
          <div className="flex items-center relative w-full ">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-400 w-5 h-5" aria-hidden="true" />
            </div>
            <Input
              type="text"
              placeholder="Search..."
              className=" w-full rounded-full pl-10 pr-4 py-2 border-gray-300 focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Search"
            />
          </div>

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
        <TableComponent
          columns={columns}
          renderRow={renderRow}
          data={teachersData}
        />
        <PaginationComponent />
      </div>
    </>
  );
};

export default Teacher;
