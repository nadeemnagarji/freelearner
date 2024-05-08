import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className=" min-h-screen flex-col items-center justify-between p-24">
      <p>This is a protected route</p>
    </main>
  );
}
