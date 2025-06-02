import { useEffect, useState } from "react";
import FetchPaymentMethods from "../api/PaymentApi";

const PaymentMethod = ({ selectedPaymentMethod, onChange }) => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadPaymentMethods = async () => {
            try {
                const methods = await FetchPaymentMethods();
                setPaymentMethods(methods);
            } catch (error) {
                console.error("Error fetching payment methods:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPaymentMethods();
    }, []);

    if (loading) return <p>Loading payment methods...</p>;

    return(
        <div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pilih Metode Pembayaran:</h3>
                <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => onChange(method.id)}
                        className={`flex items-center gap-2 p-2 border rounded hover:bg-gray-100 ${
                        selectedPaymentMethod === method.id ? "border-blue-500" : ""
                        }`}
                    >
                        <img src={method.imageUrl} alt={method.name} className="w-10 h-10" />
                        <span>{method.name}</span>
                    </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod;