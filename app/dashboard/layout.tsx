import { Sidebar } from "@/components/dashboard/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <main className="h-screen flex">
      <Sidebar user={session.user} />
      <ScrollArea className="h-screen flex-1 p-10">{children}</ScrollArea>
    </main>
  );
}
