import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";

const Footer = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    useEffect(() => {
        const getPaymentMethods = async () => {
            try {
                const response = await axiosInstance.get("/api/v1/payment-methods");
                setPaymentMethods(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        getPaymentMethods();
    },[]);

    return (
        <div className="container mx-auto flex flex-col gap-2 w-full py-5">
            <div className="flex flex-row justify-between items-start w-full py-6 px-10">
                <div className="flex flex-col">
                    <h1 className="font-bold">Partner</h1>
                    <img src="/images/wonderfull_indonesia.jpg" alt="gambar" 
                        className=" w-40 object-cover mt-3"/>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold">Payment Method</h1>
                    <div className="flex flex-row items-center gap-1 mt-3">
                        {paymentMethods.map((paymentMethod) => (
                            <img key={paymentMethod.id} src={paymentMethod.imageUrl} alt="gambar" 
                                className="h-7 object-cover"/>
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="font-bold">Awards</h1>
                    <div className="flex flex-row gap-3 mt-3">
                        <img src="/images/top-brand.jpg" alt="gambar" 
                            className="h-10 object-cover"/>
                        <img src="/images/superbrands.jpg" alt="gambar" 
                            className="h-10 object-cover"/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold">Follow Us</h1>
                    <div className="flex flex-row items-center gap-3 mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-center text-sm">Copyright &copy; 2023 Wisataloka. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;