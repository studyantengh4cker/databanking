import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SideBar } from "./SideBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <main className="h-screen flex">
      <SideBar user={session.user} />
      <ScrollArea className="h-screen flex-1 p-10">{children}</ScrollArea>
    </main>
  );
}
