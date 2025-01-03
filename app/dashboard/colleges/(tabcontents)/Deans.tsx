import UserListTable from "@/components/dashboard/colleges/UserListTable";
import { College } from "../Colleges";
import { useGetCollegeUsers } from "@/app/(custom_hooks)/useGetCollegeUsers";
import Loading from "@/components/dashboard/Loading/Loading";
import AddUserForm from "@/components/forms/AddDeanForm";
import { AddDataModal } from "@/components/modal/AddDataModal";

// import PaginationComponent from "@/components/dashboard/Pagination";

interface DeansProps {
  college: College | null;
}

export default function Deans({ college }: DeansProps) {
  const { users, isLoading } = useGetCollegeUsers({
    role: "dean",
    college: college?.id,
  });

  return (
    <div className="h-auto w-full flex flex-col gap-5 shadow-md rounded-3xl min-h-[40vh] items-start py-10 px-14">
      <header className="flex w-full gap-4 items-center">
        <AddDataModal
          title="Add Dean/Program Head"
          buttonTitle="Add Dean"
          college={college}
        >
          <AddUserForm />
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
          <option value="Dean">Dean</option>
          <option value="Program Head">Program Head</option>
        </select>
      </header>
      <main className="w-full">
        {!isLoading ? <UserListTable datas={users} /> : <Loading />}
        {/* <PaginationComponent pagination={pagination} setCurrentPage={setCurrentPage} /> */}
      </main>
    </div>
  );
}
