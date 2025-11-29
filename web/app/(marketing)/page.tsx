"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <section className="min-h-[90vh] w-full flex flex-col justify-center items-center text-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Smart automation for gym membership management
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Simplify Membership Renewals <br /> for Your Gym
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
          Never miss a member renewal. Track expiry dates, send automated
          reminders via Email, WhatsApp, or SMS, and grow your gym revenue
          effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/plans">
            <Button size="lg" className="px-8 h-12" variant="outline">
              Explore Plans
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" className="px-8 h-12">
              Signup Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
