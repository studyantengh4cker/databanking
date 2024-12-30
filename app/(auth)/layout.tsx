import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  //Change back after using, remove session role
  if (session) {
    return redirect(`/${session.user.role}/dashboard`);
  }

  return <main>{children}</main>;
}
