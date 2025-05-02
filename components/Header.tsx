import Link from "next/link";
import { Button } from "./ui/button";
import AuthServerButton from "./auth/AuthServerButton";

const Header = () => {
  return (
    <header className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">
        <Button variant="outline">Home</Button>
      </Link>
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
