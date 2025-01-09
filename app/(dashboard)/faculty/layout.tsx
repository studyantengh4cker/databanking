import { auth } from "@/lib/auth";
import NotAllowed from "../NotAllowed";

export default async function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role != "faculty") return <NotAllowed />;

  return <>{children}</>;
}
