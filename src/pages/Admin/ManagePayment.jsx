import { useEffect, useState } from "react";
import { getAllTransactions, updateTransactionStatus } from "../../api/PaymentApi";
import { Check, X  } from 'lucide-react';

const ManageTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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
      setTransactions(res);
      setFilteredTransactions(res);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Manage Transactions</h1>
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
      <table className="min-w-full text-sm text-center">
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
            <tr key={trx.id} className="border-b-2 border-gray-200">
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
              <td className="w-36 p-2">
                <div className="flex flex-row items-center justify-center gap-10">
                  {trx.status === "pending" && (
                    <div>
                      <button onClick={()=>handleUpdateStatus(trx.id,"success")} className="text-green-600 cursor-pointer group">
                        <Check size={20} className="stroke-[1.5] group-hover:stroke-[2.5] transition-all"/>
                      </button>
                      <button onClick={()=>handleUpdateStatus(trx.id,"failed")}  className="text-red-600 cursor-pointer group">
                        <X size={20} className="stroke-[1.5] group-hover:stroke-[2.5] transition-all" />
                      </button>
                    </div>
                  )}
                  <button onClick={()=>openDetail(trx)} className="text-blue-600 cursor-pointer hover:font-bold w-10">View</button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full relative shadow-xl max-h-[80vh] overflow-y-auto custom-scroll">
            <button
              onClick={closeDetail}
              className="absolute top-2 right-3 text-3xl text-red-500 hover:text-red-600 cursor-pointer"
            >
              &times;
            </button>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg text-center font-bold mb-3">Transaction Detail</h2>

              <div className="flex flex-row justify-between gap-5">
                <div>
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
      )}


      {/* <div className="grid grid-cols-1 gap-4">
        {filteredTransactions.map((trx) => {
          const isWaitingForVerification = trx.proofPaymentUrl && trx.status === "pending";
          const isAccepted = trx.status === "success";
          const isRejected = trx.status === "failed";
          const isCancelled = trx.status === "cancelled";

          return (
            <div key={trx.id} className="p-5 rounded-xl shadow-lg/20 space-y-2">
              <p><strong>Invoice:</strong> {trx.invoiceId}</p>
              <p>
                  <strong>Status:</strong>{" "}
                  <span className={
                    isAccepted ? "text-green-600" :
                    isRejected ? "text-red-600" :
                    isCancelled ? "text-gray-500" : "text-yellow-600"
                  }>
                    {trx.status.charAt(0).toUpperCase() + trx.status.slice(1)}
                </span>
              </p>
              <p><strong>Total Payment:</strong> Rp{trx.totalAmount.toLocaleString()}</p>
              <p><strong>Payment Method:</strong> {trx.payment_method.name}</p>

              {trx.proofPaymentUrl ? (
                <img
                  src={trx.proofPaymentUrl}
                  alt="Payment Proof"
                  className="w-48 rounded border"
                />
              ) : (
                <p className="text-sm text-gray-500 italic">Waiting for payment proof</p>
              )}
              
              {isWaitingForVerification && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(trx.id, "success")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Accept Payment
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(trx.id, "failed")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}

              {isAccepted && <p className="text-green-600 font-medium">Payment Accepted</p>}
              {isRejected && <p className="text-red-600 font-medium">Payment Rejected</p>}
              {isCancelled && <p className="text-gray-500 font-medium">Transaction Cancelled</p>}

              <div className="mt-2">
                <p className="font-semibold">Items:</p>
                <ul className="list-disc ml-6">
                  {trx.transaction_items.map((item) => (
                    <li key={item.id}>
                      {item.title} ({item.quantity}x)
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
          )
        })}
      </div> */}

    </div>
  );
};

export default ManageTransaction;
