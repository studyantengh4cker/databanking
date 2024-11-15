import CollegeBanner from "@/components/dashboard/CollegeBanner";
import { College } from "./Colleges";
import { collegeLinks } from "@/lib/globals";
import Tabcontents from "@/components/dashboard/Tabcontents";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CollegeDataProps {
  college: College | null;
}

export default function CollegeData({ college }: CollegeDataProps) {
  const [activeTabContent, setActiveTabContent] = useState<string | null>(
    "deans"
  );
  const handleBackgroundChange = (link: { href: string }) => {
    return activeTabContent && activeTabContent === link.href
      ? "opacity-100"
      : "opacity-60";
  };

  return (
    <section className="transition-colors">
      <CollegeBanner college={college} />
      <nav className="w-full flex flex-wrap items-center justify-center gap-8 p-4">
        {collegeLinks.map((link, i) => (
          <button
            onClick={() => setActiveTabContent(link.href)}
            key={i}
            className={`relative cursor-pointer transition-opacity bg-[#E3E3E3] flex items-center justify-between gap-2 border-solid border-2 rounded-2xl px-3 py-1 overflow-hidden max-w-[180px] min-w-[180px] min-h-[50px]   ${
              link.tag === "Dean/Program Head"
                ? "text-[12px] text-wrap"
                : " text-[20px]"
            } ${handleBackgroundChange(link)}`}
          >
            <div
              className=" absolute z-10 w-1/6 h-full left-0"
              style={{
                backgroundColor: college ? college.color : "#720000",
              }}
            ></div>
            <div
              className="weird-box absolute  h-full max-w-[70%] w-[70%] px-2 flex items-center top-0 left-0 text-wrap -skew-x-[30deg] rounded-tr-[32px]"
              style={{
                backgroundColor: college ? college.color : "#720000",
              }}
            ></div>
            <p className="text-white relative z-10 max-w-[50%] text-start">
              {link.tag}
            </p>
            <div
              className="div"
              style={{ color: `${college ? college?.color : "#720000"}` }}
            >
              {" "}
              <link.icon />
            </div>
          </button>
        ))}
      </nav>
      <ScrollArea className="w-[12rem] md:w-full whitespace-nowrap rounded-md border">
        <Tabcontents college={college} activeTabContent={activeTabContent} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
