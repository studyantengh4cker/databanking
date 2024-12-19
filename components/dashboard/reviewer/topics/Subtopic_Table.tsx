import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Subtopic } from "@/lib/types";

import React from "react";

interface SubtopicProps {
  subtopics: Subtopic[] | null;
}

export default function Subtopic_Table({ subtopics }: SubtopicProps) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Subtopic Name</TableCell>
            <TableCell>Subtopic Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subtopics ? (
            subtopics.length > 0 ? (
              subtopics.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow className={`transition-all duration-300`}>
                    <TableCell>{row.subtopic_name}</TableCell>
                    <TableCell>{row.subtopic_description}</TableCell>
                    <TableCell>
                      <button className="text-blue-500 hover:text-blue-700">
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
