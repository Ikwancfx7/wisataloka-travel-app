// src/contexts/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/carts");
      setCartItems(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil keranjang:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (activity) => {
    try {
        console.log("Token di addToCart:", localStorage.getItem("token"));
        console.log("Mengirim activity ke cart:", activity);
      const response = await axiosInstance.post("/api/v1/add-cart", {
        activity_id: activity.id,
        qty: 1,
      });
      fetchCart(); // Refresh isi cart
      console.log("Berhasil tambah ke cart:", response.data);
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err.response?.data || err.message);
    }
  };

  const updateCart = async (cartId, qty) => {
    try {
      await axiosInstance.put(`/api/v1/update-cart/${cartId}`, { qty });
      fetchCart();
    } catch (err) {
      console.error("Gagal memperbarui keranjang:", err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await axiosInstance.delete(`/api/v1/delete-cart/${cartId}`);
      fetchCart();
    } catch (err) {
      console.error("Gagal menghapus dari keranjang:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, loading, addToCart, updateCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
