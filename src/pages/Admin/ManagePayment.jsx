import { useEffect, useState } from "react";
import { getAllTransactions, updateTransactionStatus } from "../../api/PaymentApi";
import { Check, X, SquarePen  } from 'lucide-react';
import { getAllUsers } from "../../api/ProfileApi";

const ManageTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [usersMap, setUsersMap] = useState({});
  const [actionUserId, setActionUserId] = useState(null);


  const openDetail = (trx) => {
    setSelectedTransaction(trx);
    setShowDetailModal(true);
  };

  const closeDetail = () => {
    setSelectedTransaction(null);
    setShowDetailModal(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await getAllTransactions();

      const sorted = res.sort(
        (a, b) =>
          new Date(b.orderDate || b.createdAt) -
          new Date(a.orderDate || a.createdAt)
      );

      setTransactions(sorted);
      setFilteredTransactions(sorted);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  useEffect(() => {
    const fetchDataUsers = async () => {
      try {
        const users = await getAllUsers();

        const map = Object.fromEntries(users.map(u => [u.id, u.name]));
        setUsersMap(map);

        fetchTransactions();
      } catch (err) {
        console.error("Failed to load users/transactions", err);
      }
    };

    fetchDataUsers();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateTransactionStatus(id, {status});
      fetchTransactions();
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

  const formatDate = (iso) =>
  new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",   // 25 Jun 2025
    timeStyle: "short",    // 23.01
  });

  return (
    <div className="space-y-4 p-2 md:p-4">
      <h1 className="text-xl md:text-2xl font-bold">Manage Transactions</h1>
      <label className="flex flex-row items-center gap-2 mb-5">
        <p>
          Search: 
        </p>
        <input
            type="text"
            placeholder="Serach by Invoice Id..."
            value={searchQuery}
            onChange={handleSearch}
            className="border px-4 py-2 rounded-full w-full max-w-md"
        />
      </label>
      <table className="min-w-full text-xs md:text-sm text-center">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-2">Invoice</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Method</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((trx) => (
            <tr key={trx.id} className="border-b-2 border-gray-200 text-[10px] md:text-[12px]">
              <td className="p-2">{trx.invoiceId}</td>
              <td className="p-2">Rp{trx.totalAmount.toLocaleString()}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs
                    ${trx.status === "success"  && "bg-green-100 text-green-700"}
                    ${trx.status === "pending"  && "bg-yellow-100 text-yellow-700"}
                    ${trx.status === "failed"   && "bg-red-100 text-red-700"}
                    ${trx.status === "cancelled"&& "bg-gray-100 text-gray-600"}
                  `}
                >
                  {trx.status}
                </span>
              </td>
              <td className="w-48 p-2 text-center">{trx.payment_method.name}</td>
              <td className="w-36 p-2 h-10">
                <div className="relative flex flex-row items-center justify-center gap-2">
                  <SquarePen 
                    size={20} 
                    className="stroke-[1.5] group-hover:stroke-[2.5] transition-all cursor-pointer text-green-800 hover:text-green-600" 
                    onClick={() => setActionUserId(actionUserId === trx.id ? null : trx.id)}
                  />
                  {actionUserId === trx.id && (
                    <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-md shadow-md p-1 flex flex-row items-center gap-2 h-10 z-20">
                      {trx.status === "pending" && (
                        <div className="flex gap-1">
                          <button onClick={()=>handleUpdateStatus(trx.id,"success")} className="p-1 bg-green-200 rounded-lg shadow-2xl text-green-600 cursor-pointer group">
                            <Check size={20} className="stroke-[1.5] group-hover:stroke-[2.5] transition-all"/>
                          </button>
                          <button onClick={()=>handleUpdateStatus(trx.id,"failed")}  className="p-1 bg-red-200 rounded-lg shadow-2xl text-red-600 cursor-pointer group">
                            <X size={20} className="stroke-[1.5] group-hover:stroke-[2.5] transition-all" />
                          </button>
                        </div>
                      )}
                      <button onClick={()=>openDetail(trx)} className="text-blue-600 cursor-pointer hover:font-bold w-10">View</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 relative">
            <button
              onClick={closeDetail}
              className="absolute top-1 right-3 text-3xl text-red-500 hover:text-red-600 cursor-pointer"
            >
              &times;
            </button>
            <div className="bg-white p-6 rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto custom-scroll">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg text-center font-bold mb-3">Transaction Detail</h2>

                <div className="flex flex-row justify-between gap-5">
                  <div>
                    <p><strong>Name:</strong> {usersMap[selectedTransaction.userId] ?? "-"}</p>
                    <p><strong>Invoice:</strong> {selectedTransaction.invoiceId}</p>
                    <p><strong>Status:</strong>
                      <span 
                        className={`px-2 rounded-full text-sm ml-1
                            ${selectedTransaction.status === "success"  && "bg-green-100 text-green-700"}
                            ${selectedTransaction.status === "pending"  && "bg-yellow-100 text-yellow-700"}
                            ${selectedTransaction.status === "failed"   && "bg-red-100 text-red-700"}
                            ${selectedTransaction.status === "cancelled"&& "bg-gray-100 text-gray-600"}
                          `}
                      >
                        {selectedTransaction.status}
                      </span>
                    </p>
                    <p><strong>Total:</strong> Rp {selectedTransaction.totalAmount.toLocaleString()}</p>
                    <p><strong>Payment Method:</strong> {selectedTransaction.payment_method.name}</p>
                  </div>
                  <div className="italic text-xs">
                    <p>created at: {formatDate(selectedTransaction.orderDate)}</p>
                  </div>
                </div>

                <div className="w-full py-2">
                  {selectedTransaction.proofPaymentUrl ? (
                      <img
                        src={selectedTransaction.proofPaymentUrl}
                        alt="Payment Proof"
                        className="w-[60%] text-center rounded border"
                      />
                    ) : (
                      <p className="text-sm text-gray-500 italic py-2 text-center">Waiting for payment proof</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Items:</h3>
                <ul className="mt-2 space-y-1">
                  {selectedTransaction.transaction_items.map((item) => (
                    <li key={item.id}>
                      <div className="flex flex-row items-center gap-2 bg-green-50 p-2 rounded-lg">
                        <img
                          src={item.imageUrls[0]}
                          alt={item.title}
                          className="w-8 h-8 mt-1 rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/default-activity.jpg";
                          }}
                        />
                        <p>
                          {item.title} ({item.quantity}x)
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageTransaction;
