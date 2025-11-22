import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center text-center gap-6 px-6 md:px-16  ">
      <div className="max-w-5xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          Become a Gym Retention Growth Partner
        </h1>
        <p className="mt-4 text-sm md:text-md lg:text-lg text-muted-foreground">
          Help gyms turn expiring memberships into loyal customers
          automatically.
        </p>

        <Link href="/plans">
          <Button size="lg" className="mt-6">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
