import UserListTable from "@/components/dashboard/colleges/UserListTable";
import { College } from "../Colleges";
import { useGetCollegeUsers } from "@/app/(custom_hooks)/useGetCollegeUsers";
import Loading from "@/components/dashboard/Loading/Loading";
import AddFacultyForm from "@/components/forms/AddFacultyForm";
import { AddDataModal } from "@/components/modal/AddDataModal";

interface FacultyProps {
  college: College | null;
}

export default function Faculty({ college }: FacultyProps) {
  const { users, isLoading } = useGetCollegeUsers({
    role: "faculty",
    college: college?.id,
  });

  return (
    <div className="h-auto w-full flex flex-col gap-5 shadow-md rounded-3xl min-h-[40vh] items-start py-10 px-14">
      <header className="flex w-full gap-4 items-center">
        <AddDataModal
          title="Add Faculty Member"
          buttonTitle="Add Faculty"
          college={college}
        >
          <AddFacultyForm />
        </AddDataModal>
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
          <option value="Faculty">Faculty</option>
        </select>
      </header>
      <main className="w-full">
        {!isLoading ? <UserListTable datas={users} /> : <Loading />}
      </main>
    </div>
  );
}
