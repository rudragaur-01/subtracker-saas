"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api/api";

const NewCustomerPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [expiry, setExpiry] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [amount,setAmount] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/admin/create_new_customer", {
        name,
        phone,
        email,
        expiry,
        amount,
        payment_mode: paymentMode,
      });
      setSuccess("Customer created successfully!");
      setName("");
      setPhone("");
      setEmail("");
      setExpiry("");
      setPaymentMode("");
      setAmount("")
      console.log(response.data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || err.message || "Error creating customer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto  p-6 bg-white rounded ">
      <h2 className="text-2xl font-semibold mb-4">Create New Customer</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter customer name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email (optional)"
          />
        </div>
         <div>
          <label className="block mb-1 font-medium">Amount</label>
          <Input
           type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Expiry Date</label>
          <Input
            type="date"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Mode</label>
          <Input
            type="text"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            placeholder="Cash / UPI / Credit Card"
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Customer"}
        </Button>
      </form>
    </div>
  );
};

export default NewCustomerPage;
