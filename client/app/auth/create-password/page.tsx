"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/api/api";

const CreatePasswordPage = () => {
  const router = useRouter();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.patch("/auth/create-password", { password });
      console.log(res);
      if (res.data) {
        router.push("/business-details");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update business details");
    }
  };

  return (
    <div className="bg-muted flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
     <div className="flex w-full max-w-sm flex-col gap-6">

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create your Password
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="password">Password </Label>
          <Input
            id="password"
            type="password"
            placeholder="Set a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Confirm Password </Label>
          <Input
            id="password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Save & Continue
        </Button>
      </form>
      </div>
    </div>
  );
};

export default CreatePasswordPage;
