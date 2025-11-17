"use client";

import { useState } from "react";
import Modal from "./Modal";
import AuthLogin from "./AuthLogin";
import AuthSignup from "./AuthSignup";

import PriceCard from "./PriceCard";
import { plans } from "@/constants";

const PricingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <section className="text-center mx-auto px-4 pt-20 text-foreground/90">
        <h1 className="text-5xl font-bold text-primary">
          Smart Subscription & Renewal Reminder Tool for Small Businesses
        </h1>
        <p className="mt-3">
          Let your customers know when their subscription is expiring. Add
          customers, track renewal dates, and automate Email/WhatsApp reminders
          — all from one dashboard.
        </p>
      </section>

      <section className=" mx-auto px-4 mt-16 pb-20">
        <h2 className="text-3xl font-bold text-foreground-light text-center mb-10">
          Choose the Plan That Fits Your Business
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <PriceCard
              key={p.name}
              plan={p}
              onClick={() => setShowLogin(true)}
            />
          ))}
        </div>
      </section>

      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <AuthLogin
            openSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
            closeLogin={() => setShowLogin(false)}
          />
        </Modal>
      )}

      {showSignup && (
        <Modal onClose={() => setShowSignup(false)}>
          <AuthSignup
            openLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
              
            }}
            closeSignup={() => setShowSignup(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default PricingPage;
