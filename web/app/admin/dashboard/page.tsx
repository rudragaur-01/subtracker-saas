"use client";

import React, { useEffect, useState } from "react";
import api from "@/api/api";
import DashboardSummaryCard from "@/components/DashboardSummaryCard";
import AllCustomerTable from "@/components/AllCustomerTable";

const Dashboard = () => {
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const result = await api.get("/admin/dashboardSummary");
        setDashboardSummary(result.data);
      } catch (error) {
        console.error("Failed to fetch dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  if (!dashboardSummary) {
    return <p className="text-center mt-10">No data available</p>;
  }

  const metrics = [
    {
      title: "Total Customers",
      description: "Number of customers registered",
      value: dashboardSummary.totalCustomer,
    },
    {
      title: "Total Revenue",
      description: "Revenue generated from customers",
      value: `$${dashboardSummary.totalRevenue}`,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-wrap mb-4">
        {metrics.map((metric, index) => (
          <DashboardSummaryCard
            key={index}
            title={metric.title}
            description={metric.description}
            value={metric.value}
          />
        ))}
      </div>
      <AllCustomerTable />
    </div>
  );
};

export default Dashboard;
