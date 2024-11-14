import CollegeBanner from "@/components/dashboard/CollegeBanner";
import { College } from "./Colleges";
import { collegeLinks } from "@/lib/globals";

export default function CollegeData({ college }: { college: College | null }) {
  return (
    <section className="transition-colors">
      <CollegeBanner college={college} />
      <nav className="w-full flex flex-wrap items-center justify-center gap-8 p-4">
        {collegeLinks.map((link, i) => (
          <div
            key={i}
            className="p-4 rounded-lg w-44 text-white flex items-center justify-center gap-4"
            style={{ backgroundColor: college ? college.color : "#FF0000" }}
          >
            <link.icon />
            {link.tag}
          </div>
        ))}
      </nav>
    </section>
  );
}
