import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";

const TransactionDetile = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);

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
  if (!transaction) return <p className="p-4">Transaksi tidak ditemukan</p>;

  const { status, payment_method, totalAmount, expiredDate, transaction_items, invoiceId } = transaction;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Detail Transaksi</h1>

      <div className="border p-4 rounded shadow space-y-2">
        <p><span className="font-semibold">ID Invoice:</span> {invoiceId}</p>
        <p><span className="font-semibold">Status:</span> {status}</p>
        <p><span className="font-semibold">Total Payment:</span> Rp {totalAmount.toLocaleString("id-ID")}</p>
        <p><span className="font-semibold">Expired:</span> {new Date(expiredDate).toLocaleString("id-ID")}</p>

        {isExpired ? (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <p className="font-semibold">Transaksi ini telah kedaluwarsa. Silakan buat transaksi baru.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mt-4">
              <img src={payment_method.imageUrl} alt={payment_method.name} className="w-10 h-10" />
              <p className="font-semibold">{payment_method.name}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded mt-2">
              <p className="text-sm text-gray-500">Virtual Account Name</p>
              <p className="text-xl font-bold tracking-widest">{payment_method.virtual_account_name}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded mt-2">
              <p className="text-sm text-gray-500">Virtual Account Number</p>
              <p className="text-xl font-bold tracking-widest">{payment_method.virtual_account_number}</p>
            </div>
          </>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Rincian Pesanan</h2>
        {transaction_items.map((item, index) => (
          <div key={index} className="border p-4 rounded mb-2 shadow-sm">
            <p className="font-semibold">{item.title}</p>
            <p>Jumlah: {item.quantity}</p>
            <p>Harga Satuan: Rp {item.price.toLocaleString("id-ID")}</p>
            <p>Subtotal: Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionDetile;
