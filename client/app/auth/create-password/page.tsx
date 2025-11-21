"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createPassword } from "@/api/auth";

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
      const res = await createPassword({ password });
      console.log(res);
      if (res) {
        localStorage.setItem("user", JSON.stringify(res.user));
        router.push("/"); // will redirect to price page
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update business details");
    }
  };

  return (
    <div className="flex w-full max-w-md px-5 flex-col gap-6">
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
  );
};

export default CreatePasswordPage;
