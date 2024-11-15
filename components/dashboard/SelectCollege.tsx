import { College, colleges } from "@/app/dashboard/colleges/Colleges";
import Image from "next/image";

export default function SelectCollege({
  activeCollege,
  handleChange,
}: {
  activeCollege: College | null;
  handleChange: (college: College | null) => void;
}) {
  return (
    <div className="w-full flex flex-wrap gap-4 items-center justify-center p-5">
      {colleges.map((college, i) => {
        const isActive = college === activeCollege;
        return (
          <div
            key={i}
            onClick={() => handleChange(college)}
            className={`w-[20rem] transition-all flex items-center gap-2 drop-shadow-md hover:bg-primary/5 p-4 rounded-full cursor-pointer border-2`}
            style={{
              borderColor: isActive ? college.color : "#e0e0e0",
              color: college.color,
            }}
          >
            <Image
              src={college.image}
              alt={`${college.name} logo`}
              width={50}
              height={50}
            />
            <div>
              <h1 className="font-black text-2xl">{college.shortname}</h1>
              <p className="opacity-75 max-w-[14rem] truncate">
                College of <span className="font-bold">{college.name}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
