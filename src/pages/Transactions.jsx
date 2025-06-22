import { useState, useEffect } from "react";
import { getMyTransactions } from "../api/PaymentApi";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/BreadCrump";

const Transactions = () => {
    const [transactions, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMyTransactions();
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

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div>
            <div className="hidden md:block pt-25 px-20">
                <Breadcrumb />
            </div>
            <div className="flex justify-center items-center w-full py-20 md:py-0 md:pb-20 pb-25 ">
                <div className="flex flex-col justify-center items-center w-full max-w-screen-2xl mx-auto space-y-4">
                    <h1 className="text-3xl font-bold text-center mb-6 text-blue-950">Transaction History</h1>

                    {transactions.length === 0 ? (
                        <p className="text-center text-gray-500">You have no transactions</p>
                    ) : (
                        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-7 md:px-20 gap-4 w-full md:w-5xl px-5">
                            {transactions.map((trx) => {
                                const isExpired = new Date(trx.expiredDate) < new Date();
                                return (
                                    <Link
                                        to={`/transaction/${trx.id}`}
                                        key={trx.id}
                                        className="block rounded-xl p-4 shadow-md/40 bg-green-50 hover:bg-green-100 hover:shadow-lg/40 transition duration-500 ease-in-out"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold">{trx.invoiceId}</p>
                                        {isExpired && !trx.status === "pending" ? <span className="text-sm px-2 py-1 rounded text-red-700">Expired</span>
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
                                                {trx.status.charAt(0).toUpperCase()+trx.status.slice(1)}
                                            </span>
                                        }
                                        </div>
                                        <p className="font-semibold text-blue-950"> 
                                            <span className="font-extralight mr-1">
                                                Total Payment: 
                                            </span>
                                            Rp {trx.totalAmount.toLocaleString("id-ID")}    
                                        </p>
                                        {/* <p>Expired: {new Date(trx.expiredDate).toLocaleString("id-ID")}</p> */}
                                    </Link>
                                    )
                                }
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Transactions;