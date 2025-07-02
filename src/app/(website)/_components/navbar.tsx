import { Button } from "@/components/ui/button";
import { MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import nightView from "/public/nightView.png";

export default function LandingPageNavbar() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-x-3 text-white">
        <MenuIcon className="h-10 w-10" />
        <Image src={nightView} alt="logo" height={70} width={70} />
        <h1 className="text-2xl font-semibold font-mono">roboPlay</h1>
      </div>
      <div className="hidden items-center gap-x-10 text-xl lg:flex text-white">
        <Link href="/">Home</Link>
        <Link href="/">Pricing</Link>
        <Link href="/">About</Link>
      </div>
      <Link href="/auth/sign-in">
        <Button variant="outline" className="text-base flex gap-x-2">
          <User fill="#000" /> Login
        </Button>
      </Link>
    </div>
  );
}
