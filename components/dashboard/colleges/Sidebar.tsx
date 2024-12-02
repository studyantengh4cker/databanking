import Image from "next/image";
import { Separator } from "../../ui/separator";
import { NavLinks } from "./NavLinks";
import { User } from "next-auth";

export function Sidebar({ user }: { user: User }) {
  return (
    <div className="h-screen w-[18rem] bg-red-950 md:flex flex-col hidden max-h-screen overflow-y-auto">
      <div className="flex flex-col gap-8 items-center justify-center p-10">
        <Image src="/logo.png" alt="Logo" width={80} height={80} />
        <h1 className="font-bold text-lg text-white">
          St. Peter&apos;s College
        </h1>
        <Separator className="opacity-50" />
      </div>
      <div className="px-10">
        <NavLinks role={user.role} />
      </div>
      <div className="mt-auto w-full p-5 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-sm text-primary font-bold flex items-center justify-center">
            <p className="text-xs text-center">{user.role.toUpperCase()}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-white text-lg font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-white/50 text-sm">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
