"use client";

import { Session } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";

const AuthClientButton = ({ session }: { session: Session | null }) => {
  const handleSignIn = () => console.log("sign in");

  return <Button onClick={handleSignIn}>Login</Button>;
};

export default AuthClientButton;
