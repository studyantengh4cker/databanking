import { StudentData } from '@/lib/DummyData';
import React, { useMemo } from 'react'
import { College } from '../Colleges';
import UserListTable from '@/components/dashboard/UserListTable';

interface StudentsProps{
  college : College | null
}

export default function Students({college}: StudentsProps) {
  const filteredData = useMemo(() => {
    if (college) {
      return StudentData.filter((data) => data.college === college.shortname);
    }
    return StudentData;
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
        Add Student
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
        <option value="Faculty">Student</option>
      </select>
    </header>
    <main className="w-full">
      <UserListTable datas={filteredData} />
    </main>
  </div>
  )
}