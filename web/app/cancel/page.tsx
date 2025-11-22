"use client";

import Link from "next/link";
import React from "react";

const CancelPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center bg-gray-50 ">
      <div className="bg-white p-8 rounded-xl max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          Your payment was not completed. You can try again or return to the
          homepage.
        </p>

        <Link href="/">
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
