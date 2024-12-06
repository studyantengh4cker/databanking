import React from "react";
import Reviewersmainpage from "./pages/Reviewersmainpage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/colleges/Header";

export default async function Reviewers() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  return <div>
    <Header title={"Reviewers"} />
    <Reviewersmainpage session={session} />
  </div>
}
