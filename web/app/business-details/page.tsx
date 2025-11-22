"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const BusinessDetailsPage = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
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
    <div className="flex items-center justify-center w-full ">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Business Details</CardTitle>
          <CardDescription>
            Tell us about your brand or business.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="business-name">
                  Brand / Business Name
                </FieldLabel>
                <Input
                  required
                  id="business-name"
                  placeholder="Enter business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="contact-number">Contact Number</FieldLabel>
                <Input
                  required
                  id="contact-number"
                  type="tel"
                  placeholder="Enter contact number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="address">Official Address</FieldLabel>
                <Input
                  required
                  id="address"
                  placeholder="Enter official address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="business-type">Business Type</FieldLabel>
                <Input
                  required
                  id="business-type"
                  placeholder="eg. Individual, Company, Startup"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="industry">Industry</FieldLabel>
                <Input
                  required
                  id="industry"
                  placeholder="eg. Events, Services, Education"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Input
                  id="description"
                  placeholder="Short description about your business"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="website">Website (Optional)</FieldLabel>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Field>

              <Button className="w-full mt-2" type="submit">
                Save & Continue
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDetailsPage;
