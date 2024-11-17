import Image from "next/image";
import { Separator } from "../ui/separator";
import { NavLinks } from "./NavLinks";

export function Sidebar() {
  return (
    <div className="h-screen w-[18rem] bg-red-900 md:flex flex-col hidden max-h-screen overflow-y-auto">
      <div className="flex flex-col gap-8 items-center justify-center p-10">
        <Image src="/logo.png" alt="Logo" width={80} height={80} />
        <h1 className="font-bold text-lg text-white">
          St. Peter&amp;lsquo;s College
        </h1>
        <Separator className="opacity-50" />
      </div>
      <div className="px-10">
        <NavLinks />
      </div>
    </div>
  );
}
