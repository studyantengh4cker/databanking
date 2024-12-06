import { College } from "../dashboard/colleges/Colleges";

export const collegeChange = (
  form: any,
  setCollege: (selected: College | undefined) => void,
  colleges: College[],
  value: string
) => {
  const selected = colleges.find((c) => c.id === value);
  setCollege(selected);

  form.setValue("college_id", value);

  form.setValue("program_id", "");
};
