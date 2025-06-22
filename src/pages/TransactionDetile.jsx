import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import UploadProofPayment from "../components/UploadProofPayment";
import Breadcrumb from "../components/BreadCrump";
import BackButton from "../components/BackButton";

const TransactionDetile = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const isPaymentSuccess = transaction && transaction.status === "success";
  const handleCancelTransaction = async () => {
    try {
        await axiosInstance.post(`/api/v1/cancel-transaction/${id}`);
        window.location.reload(); // Refresh halaman
        setIsCancelled(true);
      } catch (err) {
        console.error("Gagal membatalkan transaksi:", err);
      }
    };


  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/transaction/${id}`);
        const trx = res.data.data;
        setTransaction(trx);

        // Cek apakah transaksi sudah expired
        const now = new Date();
        const expired = new Date(trx.expiredDate);
        if (now > expired) {
          setIsExpired(true);
        }
      } catch (err) {
        console.error("Gagal mengambil detail transaksi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!transaction) return <p className="p-4">Transaction not found</p>;

  const { status, payment_method, totalAmount, expiredDate, transaction_items, invoiceId } = transaction;

  const hasUploadedProof = !!transaction?.proofPaymentUrl;

  return (
    <div>
      <div className="hidden md:block pt-25 px-20">
        <Breadcrumb />
      </div>
      <div className="block md:hidden pt-20 px-6">
        <BackButton />
      </div>
      <div className="space-y-6 min-h-screen max-w-screen-md mx-auto px-6 pt-6 pb-25 md:pb-20">
        <h1 className="text-blue-950 text-2xl font-bold text-center mb-6">Transaction Detile</h1>

        <div className="p-4 rounded shadow space-y-2 bg-green-50 text-[12px] md:text-sm">
          <p><span className="font-semibold">ID Invoice:</span> {invoiceId}</p>
          {status === "success" ? (
            <p><span className="font-semibold">Status:</span> <span className="text-green-600 font-bold">{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span></p>
          ):(
            status === "failed" ? (
              <p><span className="font-semibold">Status:</span> <span className="text-red-600 font-bold">{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span></p>
            ):(
              status === "pending" && isExpired && !hasUploadedProof ? (
                <p><span className="font-semibold">Status:</span> <span className="text-red-600 font-bold">Expired</span></p>
              ):(
                status === "cancelled" ? (
                  <p><span className="font-semibold">Status:</span> <span className="text-red-600 font-bold">{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span></p>
                ):(
                  <p><span className="font-semibold">Status:</span> <span className="text-yellow-600 font-bold">{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span></p>
                )
              )
            )
          )}

          <p><span className="font-semibold">Total Payment:</span> Rp {totalAmount.toLocaleString("id-ID")}</p>
          {/* <p><span className="font-semibold">Expired:</span> {new Date(expiredDate).toLocaleString("id-ID")}</p> */}
          {status === "pending" && !isExpired && !hasUploadedProof && (
            <p className="flex justify-center py-2 w-full text-[16px] font-semibold text-green-900 italic bg-green-100 rounded-xl">Complete the transaction before {new Date(expiredDate).toLocaleString("id-ID")} </p>
          )

          }

          {isExpired && !hasUploadedProof && !status === "cancelled" ? (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              <p className="font-semibold">Transaction has expired.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mt-4">
                <img src={payment_method.imageUrl} alt={payment_method.name} className="w-10 h-10" />
                <p className="font-semibold">{payment_method.name}</p>
              </div>

              <div className="bg-green-100 p-4 rounded-t-2xl mt-2">
                <p className="text-sm text-gray-500 italic">Virtual Account Name</p>
                <p className="text-xl font-bold tracking-widest">{payment_method.virtual_account_name}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-b-2xl mt-2">
                <p className="text-sm text-gray-500 italic">Virtual Account Number</p>
                <p className="text-xl font-bold tracking-widest">{payment_method.virtual_account_number}</p>
              </div>
            </>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-2">Items Detile:</h2>
          {transaction_items.map((item, index) => (
            <div key={index} className="p-4 rounded mb-2 shadow bg-green-50 text-[12px] md:text-sm">
              <p className="font-semibold">{item.title}</p>
              <p>Jumlah: {item.quantity}</p>
              <p>Harga Satuan: Rp {item.price.toLocaleString("id-ID")}</p>
              <p>Subtotal: Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className={`bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleCancelTransaction}
            disabled={isExpired || isCancelled || isPaymentSuccess || hasUploadedProof}
          >
            Cancel Transaction
          </button>
        </div>

        {!isPaymentSuccess && !hasUploadedProof && !isExpired && (
          <UploadProofPayment transactionId={id} />
        )}
        {hasUploadedProof && status === "pending" ? (
          <div className="bg-blue-100 text-blue-700 p-3 rounded-lg mt-2 italic">
            Transaction proof uploaded successfully. Please wait for admin verification.
          </div>
        ):(
          null
        )}

        
      </div>
    </div>
  );
};

export default TransactionDetile;
