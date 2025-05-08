import Link from "next/link";
import { Button } from "./ui/button";
import AuthServerButton from "./auth/AuthServerButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Header = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getSession();

  return (
    <header className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">
        <Button variant="outline">Home</Button>
      </Link>
      {user.session && (
        <Link href="/dashboard" className="ml-4">
          <Button variant="outline">dashboard</Button>
        </Link>
      )}
      <Link href="/pricing" className="ml-4">
        <Button variant="outline">price</Button>
      </Link>
      <div className="ml-auto">
        <AuthServerButton />
      </div>
    </header>
  );
};

export default Header;
