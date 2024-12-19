import { auth } from "@/lib/auth";
import NotAllowed from "../NotAllowed";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role != "admin") return <NotAllowed />;

  return <>{children}</>;
}
