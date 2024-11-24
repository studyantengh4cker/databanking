import { College } from "../Colleges";
import UserListTable from "@/components/dashboard/UserListTable";
import { useGetCollegeUsers } from "@/app/(custom_hooks)/useGetCollegeUsers";
import Loading from "@/components/dashboard/Loading/Loading";
import { AddUserModal } from "@/components/modal/AddUserModal";
import AddStudentForm from "@/components/forms/AddStudentForm";

interface StudentsProps {
  college: College | null;
}

export default function Students({ college }: StudentsProps) {
  const { users, isLoading, error } = useGetCollegeUsers(
    "student",
    college?.id,
    {
      role: "student",
      college: college?.id,
    }
  );

  return (
    <div className="h-auto w-full flex flex-col gap-5 shadow-md rounded-3xl min-h-[40vh] items-start py-10 px-14">
      <header className="flex w-full gap-4 items-center">
        <AddUserModal college={college} title="Add Student" buttonTitle="Add Student" children={<AddStudentForm/>} />
        <input
          type="text"
          name="search"
          placeholder="Search for Dean/Program Head by name or email"
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          name="role-filter"
          id="role-filter"
          className="border rounded px-3 py-2"
        >
          <option value="">Add Filter</option>
          <option value="Faculty">Student</option>
        </select>
      </header>
      <main className="w-full">
        {!isLoading ? <UserListTable datas={users} /> : <Loading />}
      </main>
    </div>
  );
}
