import { colleges, Programs } from "../dashboard/colleges/Colleges";


export const useChooseCollege = (collegeid: number, programid: number) => {
    const college_id = String(collegeid);
    const currentCollege = colleges.find(
      (currentCollege) => college_id === currentCollege.id
    );
    const currentProgram = currentCollege?.programs.find(
      (program: Programs) => program.id === String(programid)
    );
    const collegeData = {
        ...currentCollege,
        currentProgram,
      };
    return collegeData
  };