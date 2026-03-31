import { Link } from "react-router";

import ModeToggle from "@/components/navbar/ModeToggle";
import ProfileDropdownMenu from "@/components/navbar/ProfileDropdown";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { authClient } from "@/lib/auth-client";

function NavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b h-16 w-full flex items-center justify-center">
      <nav className="flex items-center justify-between max-w-5xl w-full mx-auto px-4">
        <Link to={ROUTES.HOME} className="font-bold">
          Home
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {children}
        </div>
      </nav>
    </div>
  );
}

function NotSignedIn() {
  return (
    <Button asChild>
      <Link to={ROUTES.SIGN_IN}>Sign in</Link>
    </Button>
  );
}

function SignedIn({ imageUrl }: { imageUrl: string | null | undefined }) {
  return <ProfileDropdownMenu image={imageUrl} />;
}

function Loading() {
  return <Skeleton className="h-9 w-9 rounded-full" />;
}

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  let content;

  if (isPending) {
    content = <Loading />;
  } else if (session?.user?.id) {
    content = <SignedIn imageUrl={session.user.image} />;
  } else {
    content = <NotSignedIn />;
  }
  return <NavbarLayout>{content}</NavbarLayout>;
}
