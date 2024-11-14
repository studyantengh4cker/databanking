import { College } from "@/app/dashboard/colleges/Colleges";
import Image from "next/image";

export default function CollegeBanner({
  college,
}: {
  college: College | null;
}) {
  const color = college ? college.color : "#FF0000";

  return (
    <section className="relative h-[8rem] rounded-2xl overflow-hidden flex flex-col">
      <Image
        src="/0.jpg"
        alt="College Background"
        layout="fill"
        objectFit="cover"
        className="z-0 mix-blend-darken"
      />
      <div
        className="absolute inset-0 opacity-50 z-10 transition-all"
        style={{ backgroundColor: color }}
      ></div>
      <div
        className="h-4 w-full z-20 relative transition-all"
        style={{ backgroundColor: color }}
      ></div>

      {college ? (
        <h1 className="md:text-3xl text-lg text-white text-center pt-10 relative z-20 transition-all">
          <span className="opacity-75">COLLEGE OF </span>
          <span className="font-bold">{college.name.toUpperCase()}</span>
        </h1>
      ) : (
        <h1 className="md:text-3xl text-lg text-white text-center pt-10 relative z-20">
          <span className="font-bold">ST. PETER'S COLLEGE</span>
        </h1>
      )}
    </section>
  );
}
