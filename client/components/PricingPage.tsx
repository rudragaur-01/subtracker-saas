"use client";
import { plans } from "@/constants";
import PriceCard from "./PriceCard";
import { useRouter } from "next/navigation";

const PricingPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
    <>
      <section className="text-center mx-auto px-4 pt-10 md:pt-20 text-foreground/90">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          Smart Subscription & Renewal Reminder Tool for Small Businesses
        </h1>
        <p className="mt-3 text-sm md:text-md">
          Let your customers know when their subscription is expiring. Add
          customers, track renewal dates, and automate Email/WhatsApp reminders
          — all from one dashboard.
        </p>
      </section>

      <section className=" mx-auto px-4 mt-16 pb-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-light text-center mb-10">
          Choose the Plan That Fits Your Business
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <PriceCard key={p.name} plan={p} onClick={handleClick} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PricingPage;
