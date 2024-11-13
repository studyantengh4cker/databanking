import { SignOut } from "@/components/LogoutButton";
import { auth } from "@/lib/auth";

export default async function LandingPage() {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut />
    </div>
  );
}
