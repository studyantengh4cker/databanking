import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MyCollegeMainPage from "./page/MyCollegeMainPage";
import Header from "@/components/dashboard/colleges/Header";

export default async function MyCollege() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col w-full">
      <Header title="My College" />
      <MyCollegeMainPage session={session} />
    </div>
  );
}
