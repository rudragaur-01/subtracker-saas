const page = () => {
  // Example data
  const customers = [
    {
      id: 1,
      name: "John Doe",
      expiry: "2025-12-31",
      paymentMode: "Credit Card",
    },
    { id: 2, name: "Jane Smith", expiry: "2026-01-15", paymentMode: "UPI" },
    { id: 3, name: "Bob Johnson", expiry: "2025-11-30", paymentMode: "Cash" },
  ];

  return (
    <div className="">
      <h2 className="text-black text-2xl font-semibold mb-4">Customers</h2>

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
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Payment Mode
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {customer.name}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {customer.expiry}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {customer.paymentMode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
