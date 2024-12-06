"use client";
import { colleges, Programs } from "../dashboard/colleges/Colleges";

export const useChooseCollege = (collegeid: number, programid: number) => {
  const college_id = String(collegeid);

  const currentCollege = colleges.find(
    (currentCollege) => college_id === currentCollege.id
  ) || {
    id: "",
    name: "",
    shortname: "",
    color: "",
    image: "",
    programs: [],
    currentProgram: "",
  };

  const currentProgram = currentCollege.programs.find(
    (program: Programs) => program.id === String(programid)
  ) || {
    id: "",
    name: "",
    shortname: "",
  };

  const collegeData = {
    ...currentCollege,
    currentProgram,
  };

  return collegeData;
};
