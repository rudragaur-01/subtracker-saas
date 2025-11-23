'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { useRouter } from "next/navigation";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  expiry: string;
  payment_mode: string;
}

const AllCustomerTable = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [renewLoadingId, setRenewLoadingId] = useState<string | null>(null);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const response = await api.get("/admin/all_customer_list");
        if (response.data && Array.isArray(response.data.customers)) {
          setCustomers(response.data.customers);
        } else {
          setCustomers([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch customers", err);
        setError(err.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCustomers();
  }, []);

  const handleRenewal = async (customerId: string) => {
    setRenewLoadingId(customerId);
    try {
      const response = await api.post("/admin/send", { customerId });
      console.log("Renewal response:", response.data);
      alert("Renewal email sent successfully!");
    } catch (err: any) {
      console.error("Failed to send renewal email", err);
      alert(
        err.response?.data?.message || err.message || "Failed to send email"
      );
    } finally {
      setRenewLoadingId(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-black text-2xl font-semibold mb-4">Customers</h2>

      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push("/admin/new-customer")}>
          Add Customer
        </Button>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading customers...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Payment Mode
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Renewal
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No customers found
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => {
                  const { id, name, phone, email, expiry, payment_mode } =
                    customer;
                  return (
                    <tr
                      key={id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {name}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {phone}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {email || "-"}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {expiry}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {payment_mode}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        <Button
                          disabled={renewLoadingId === id}
                          onClick={() => handleRenewal(id)}
                        >
                          {renewLoadingId === id ? "Sending..." : "Renewal"}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllCustomerTable;
