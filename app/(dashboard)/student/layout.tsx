import { auth } from "@/lib/auth";
import NotAllowed from "../NotAllowed";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role != "student") return <NotAllowed />;

  return <>{children}</>;
}
