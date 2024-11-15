
import UserListTable from "@/components/dashboard/UserListTable";
import { College } from "../Colleges";
import { DeansProHeadsData } from "@/lib/DummyData";
import { useMemo } from "react";

interface DeansProps {
  college: College | null;
}

export default function Deans({ college }: DeansProps) {
  const filteredData = useMemo(() => {
    if (college) {
      return DeansProHeadsData.filter(
        (data) => data.college === college.shortname
      );
    }
    return DeansProHeadsData;
  }, [college]);

  return (
    <div className="h-auto w-full flex flex-col gap-5 shadow-md rounded-3xl min-h-[40vh] items-start py-10 px-14">
      <header className="flex w-full gap-4 items-center">
        <button
          className="px-3 py-2 text-white rounded-md"
          style={{
            backgroundColor: college?.color || "#720000",
          }}
        >
          Add Dean/Program Head
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
          <option value="Dean">Dean</option>
          <option value="Program Head">Program Head</option>
        </select>
      </header>
      <main className="w-full">
       <UserListTable datas={filteredData} />
      </main>
    </div>
  );
}
