"use client";
import { useRouter } from "next/navigation";
import { plans } from "@/constants";

import api from "@/api/api";
import PriceCard from "@/components/PriceCard";

const page = () => {
  const router = useRouter();

  const handlePlanSelect = async (priceId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/auth/login");

    try {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout`,
        { priceId }
      );

      if (res.data?.checkout_url) {
        router.push(res.data.checkout_url);
      } else {
        console.log("Stripe error:", res.data);
      }
    } catch (err) {
      console.log("Error creating session:", err);
    }
  };
  return (
    <section className="mx-auto  w-full px-4 mt-16 pb-20">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
        Choose the Plan That Fits Your Business
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <PriceCard key={p.name} plan={p} onSelect={handlePlanSelect} />
        ))}
      </div>
    </section>
  );
};

export default page;
