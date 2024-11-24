import UserListTable from "@/components/dashboard/UserListTable";
import { College } from "../Colleges";
import { useGetCollegeUsers } from "@/app/(custom_hooks)/useGetCollegeUsers";
import Loading from "@/components/dashboard/Loading/Loading";

interface FacultyProps {
  college: College | null;
}

export default function Faculty({ college }: FacultyProps) {
  const { users, isLoading, error } = useGetCollegeUsers("faculty", college?.id, {
    role: "faculty",
    college: college?.id,
  });

  return (
    <div className="h-auto w-full flex flex-col gap-5 shadow-md rounded-3xl min-h-[40vh] items-start py-10 px-14">
      <header className="flex w-full gap-4 items-center">
        <button
          className="px-3 py-2 text-white rounded-md"
          style={{
            backgroundColor: college?.color || "#720000",
          }}
        >
          Add Faculty
        </button>
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
