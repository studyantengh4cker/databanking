import Header from "@/components/dashboard/colleges/Header";
import { Suspense } from "react";
import { Reviewers } from "./Reviewers";

export default function AdminReviewersPage() {
  return (
    <main>
      <Header title="Reviewers" />
      <Suspense fallback={<>Loading Reviewers</>}>
        <Reviewers />
      </Suspense>
    </main>
  );
}
