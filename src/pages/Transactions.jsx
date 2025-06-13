import { useState, useEffect } from "react";
import { fetchMyTransactions } from "../api/PaymentApi";
import { Link } from "react-router-dom";

const Transactions = () => {
    const [transactions, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMyTransactions();
                console.log(data);
                const sorted = data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                setTransaction(sorted);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    },[])

    if (loading) return <p className="p-4">Memuat data transaksi...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4 py-5 md:py-20">
            <h1 className="text-2xl font-bold text-center">Transaction History</h1>

            {transactions.length === 0 ? (
                <p className="text-center text-gray-500">Kamu belum memiliki transaksi.</p>
            ) : (
                transactions.map((trx) => {
                    const isExpired = new Date(trx.expiredDate) < new Date();
                    return (
                        <Link
                            to={`/transaction/${trx.id}`}
                            key={trx.id}
                            className="block border rounded p-4 shadow hover:bg-gray-50 transition"
                        >
                            <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold">{trx.invoiceId}</p>
                            {isExpired ? <span className="text-sm px-2 py-1 rounded bg-red-100 text-red-700">Expired</span>
                            : 
                                <span
                                    className={`text-sm px-2 py-1 rounded ${
                                    trx.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : trx.status === "success"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {trx.status}
                                </span>
                            }
                            </div>
                            <p>Total: Rp {trx.totalAmount.toLocaleString("id-ID")}</p>
                            <p>Batas Bayar: {new Date(trx.expiredDate).toLocaleString("id-ID")}</p>
                        </Link>
                    )
                }
            )
            )}
        </div>
    );
}

export default Transactions;