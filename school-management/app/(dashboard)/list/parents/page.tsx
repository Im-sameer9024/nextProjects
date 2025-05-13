import {
  ArrowUpDown,
  Edit,
  ListFilter,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import React from "react";
import { Input } from "../../../../components/ui/input";
import {
    parentsData,
    parentsDataProps,
  role,
} from "../../../../assets/dummyData/Data";
import { TableCell, TableRow } from "../../../../components/ui/table";
import PaginationComponent from "../../../../components/PaginationComponent";
import Link from "next/link";
import TableComponent from "../../../../components/TableComponent";

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
    header: "Student Names",
    accessor: "students",
    classes: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    classes: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    classes: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ParentsListPage = () => {
  const renderRow = (item: parentsDataProps) => (
    <TableRow
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <TableCell className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{item.students.join(",")}</TableCell>
      <TableCell className="hidden md:table-cell">{item.phone}</TableCell>
      <TableCell className="hidden md:table-cell">{item.address}</TableCell>

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
        <h2 className=" hidden md:block text-lg font-semibold">All Parents</h2>
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
        <TableComponent
          columns={columns}
          renderRow={renderRow}
          data={parentsData}
        />
        <PaginationComponent />
      </div>
    </div>
  );
};

export default ParentsListPage;
