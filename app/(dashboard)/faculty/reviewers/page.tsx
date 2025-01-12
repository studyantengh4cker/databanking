import Header from "@/components/dashboard/colleges/Header";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Reviewers from "./Reviewers";


export default async function FacultyReviewersPage() {
    const session = await auth();
    if (!session) {
      return redirect("/login");
    }
  return (
    <main>
      <Header title="Reviewers" />
      <Suspense fallback={<>Loading Reviewers</>}>
        <Reviewers session={session}/>
      </Suspense>
    </main>
  );
}
