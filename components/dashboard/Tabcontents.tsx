import Deans from "@/app/dashboard/colleges/(tabcontents)/Deans";
import Faculty from "@/app/dashboard/colleges/(tabcontents)/Faculty";
import Reviewers from "@/app/dashboard/colleges/(tabcontents)/Reviewers";
import Students from "@/app/dashboard/colleges/(tabcontents)/Students";
import { College } from "@/app/dashboard/colleges/Colleges";
import React from "react";


interface TabcontentsProps {
  activeTabContent: string | null;
  college: College | null
}

export default function Tabcontents({ activeTabContent, college }: TabcontentsProps) {
  return (
    <div>
      {activeTabContent === "deans" ? (
        <Deans college={college} />
      ) : activeTabContent === "faculty" ? (
        <Faculty college={college} />
      ) : activeTabContent === "students" ? (
        <Students college={college} />
      ) : activeTabContent === "reviewers" ? (
        <Reviewers college={college} />
      ) : (
        "No active content"
      )}
    </div>
  );
}
