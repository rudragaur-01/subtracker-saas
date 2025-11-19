"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/business-details", {
        businessName,
        contactNumber,
        address,
        businessType,
        industry,
        description,
        website,
      });

      if (res.data) {
        alert("Details saved successfully!");
        router.push("/admin/dashboard");
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
          Personal Details
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Business Name */}
          <div>
            <Label htmlFor="business-name">Brand Name / Business Name</Label>
            <Input
              required
              id="business-name"
              type="text"
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          {/* Contact Number */}
          <div>
            <Label htmlFor="contact-number">Contact Number</Label>
            <Input
              required
              id="contact-number"
              type="tel"
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Official Address</Label>
            <Input
              required
              id="address"
              type="text"
              placeholder="Enter official address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Business Type */}
          <div>
            <Label htmlFor="business-type">Business Type</Label>
            <Input
              required
              id="business-type"
              type="text"
              placeholder="e.g. Individual, Company, Startup"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            />
          </div>

          {/* Industry */}
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              required
              id="industry"
              type="text"
              placeholder="e.g. Events, Services, Education"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Short description about your business"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Website */}
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://yourwebsite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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

export default page;
