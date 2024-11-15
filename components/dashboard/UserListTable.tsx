import React from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

interface UserListTable {
  datas: {
    IDNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    college: string;
  }[];
}

export default function UserListTable({ datas }: UserListTable) {
  return (
    <Table>
      <TableCaption>A list of all Deans and Program Heads</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Role</TableHead>
          <TableHead className="text-right">College</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.length > 0 ? (
          datas.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{data.IDNumber}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>
                {data.firstName} {data.lastName}
              </TableCell>
              <TableCell className="text-right">{data.role}</TableCell>
              <TableCell className="text-right">{data.college}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
