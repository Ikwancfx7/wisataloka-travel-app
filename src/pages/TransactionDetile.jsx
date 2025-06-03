import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/transaction/${id}`);
        setTransaction(res.data.data);
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

  const { status, paymentMethod, vaNumber, totalAmount, expiredAt, items } = transaction;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Detail Transaksi</h1>

      <div className="border p-4 rounded shadow space-y-2">
        <p><span className="font-semibold">Status:</span> {status}</p>
        <p><span className="font-semibold">Total Bayar:</span> Rp {totalAmount.toLocaleString("id-ID")}</p>
        <p><span className="font-semibold">Batas Bayar:</span> {new Date(expiredAt).toLocaleString("id-ID")}</p>

        <div className="flex items-center gap-4 mt-4">
          <img src={paymentMethod.imageUrl} alt={paymentMethod.name} className="w-10 h-10" />
          <p className="font-semibold">{paymentMethod.name}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded mt-2">
          <p className="text-sm text-gray-500">Virtual Account Number</p>
          <p className="text-xl font-bold tracking-widest">{vaNumber}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Rincian Pesanan</h2>
        {items.map((item, index) => (
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

export default TransactionDetail;
