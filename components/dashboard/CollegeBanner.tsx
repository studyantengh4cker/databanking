import { College } from "@/app/dashboard/colleges/Colleges";
import Image from "next/image";

export default function CollegeBanner({
  college,
}: {
  college: College | null;
}) {
  const color = college ? college.color : "#720000";

  return (
    <section className="relative h-[8rem] rounded-2xl overflow-hidden flex flex-col justify-center items-center">
      <Image
        src="/0.jpg"
        alt="College Background"
        layout="fill"
        objectFit="cover"
        className="z-0 mix-blend-darken absolute top-0"
      />
      <div
        className="absolute top-0 inset-0 opacity-50 z-10 transition-all"
        style={{ backgroundColor: color }}
      ></div>
      <div
        className="absolute h-4 w-full z-20 transition-all top-0"
        style={{ backgroundColor: color }}
      ></div>

      {college ? (
        <h1 className="md:text-3xl text-lg text-white text-center relative z-20 transition-all">
          <span className="opacity-75">COLLEGE OF </span>
          <span className="font-bold">{college.name.toUpperCase()}</span>
        </h1>
      ) : (
        <h1 className="md:text-3xl text-lg text-white text-center relative z-20">
          <span className="font-bold">ST. PETER'S COLLEGE</span>
        </h1>
      )}
    </section>
  );
}
