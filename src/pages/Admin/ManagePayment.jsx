import { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";

const ManageTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/all-transactions");
      setTransactions(res.data.data);
      setFilteredTransactions(res.data.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axiosInstance.post(`/api/v1/update-transaction-status/${id}`, {
        status,
      });
      fetchTransactions(); // refresh
    } catch (err) {
      console.error("Failed to update transaction status", err);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchQuery(keyword);

    const filtered = transactions.filter((trx) =>
      trx.invoiceId.toLowerCase().includes(keyword)
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Manage Transactions</h1>

        <input
            type="text"
            placeholder="serach by Invoice Id..."
            value={searchQuery}
            onChange={handleSearch}
            className="border px-3 py-2 rounded w-full max-w-md"
        />
      {filteredTransactions.map((trx) => (
        <div key={trx.id} className="border p-4 rounded shadow space-y-2">
          <p><strong>Invoice:</strong> {trx.invoiceId}</p>
          <p><strong>Status:</strong> {trx.status}</p>
          <p><strong>Total:</strong> Rp{trx.totalAmount.toLocaleString()}</p>
          <p><strong>Metode:</strong> {trx.payment_method.name}</p>
          {trx.proofPaymentUrl && (
            <img
              src={trx.proofPaymentUrl}
              alt="Payment Proof"
              className="w-48 rounded border"
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdateStatus(trx.id, "success")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Accept Payment
            </button>
            <button
              onClick={() => handleUpdateStatus(trx.id, "failed")}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>

          <div className="mt-2">
            <p className="font-semibold">Items:</p>
            <ul className="list-disc ml-6">
              {trx.transaction_items.map((item) => (
                <li key={item.id}>
                  {item.title} - Qty: {item.quantity}
                  <br />
                  <img
                    src={item.imageUrls[0]}
                    alt={item.title}
                    className="w-32 mt-1 rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default-activity.jpg";
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageTransaction;
