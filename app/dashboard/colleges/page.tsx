import Header from "@/components/dashboard/colleges/Header";
import { Colleges } from "./Colleges";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CollegesPage() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }
  return (
    <main>
      <Header title="Colleges" />
      <Colleges session={session} />
    </main>
  );
}
