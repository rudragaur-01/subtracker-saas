import PricingPage from "@/components/PricingPage";

export default function Home() {
  return (
    <section className="text-center mx-auto px-4 pt-32 text-foreground/90">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        Smart Subscription & Renewal Reminder Tool for Small Businesses
      </h1>
      <p className="mt-3 text-sm md:text-md">
        Let your customers know when their subscription is expiring...
      </p>
      <div className=" mx-auto   ">
        <PricingPage />
      </div>
    </section>
  );
}
