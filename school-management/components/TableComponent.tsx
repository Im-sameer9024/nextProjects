/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table";

const TableComponent = ({
  columns,
  renderRow,
  data,
}: {
  columns: {
    header: string;
    accessor: string;
    classes?: string;
  }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.accessor} className={col.classes}>
              {col.header}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{data.map((item) => renderRow(item))}</TableBody>
    </Table>
  );
};

export default TableComponent;
