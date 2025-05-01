import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">
        <Button variant="outline">Home</Button>
      </Link>
      <Link href="/pricing" className="ml-4">
        <Button variant="outline">price</Button>
      </Link>
      <Link href="/login" className="ml-auto">
        <Button>login</Button>
      </Link>
    </header>
  );
};

export default Header;
