"use client";

import { Session } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthClientButton = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return <Button onClick={handleSignIn}>Login</Button>;
};

export default AuthClientButton;
