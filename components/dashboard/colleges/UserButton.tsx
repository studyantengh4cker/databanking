import { auth } from "@/lib/auth";
import { SignOut } from "../../LogoutButton";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export async function UserButton() {
  const session = await auth();

  if (!session) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>
            {session?.user.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[15rem]">
        <DropdownMenuLabel>
          <div className="text-sm font-medium">{session?.user.email}</div>
          <div className="text-xs text-muted-foreground">
            {session?.user.role.charAt(0).toUpperCase() +
              session?.user.role.slice(1)}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <section className="w-full">
          <SignOut />
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
