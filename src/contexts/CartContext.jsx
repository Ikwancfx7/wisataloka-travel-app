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
        activityId: activity.id,
      });
      await fetchCart(); // Refresh isi cart
      console.log("Berhasil tambah ke cart:", response.data);
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err.response?.data || err.message);
    }
  };

  const addMultipleToCart = async (activity, qty) => {
    try {
      for (let i = 0; i < qty; i++) {
        await addToCart(activity);
      }
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err.response?.data || err.message);
    }
  };

  const updateCart = async (cartId, quantity) => {
    try {
      console.log("Calling PUT /api/v1/update-cart/" + cartId, { quantity });
      await axiosInstance.put(`/api/v1/update-cart/${cartId}`, { quantity: quantity });
      await fetchCart();
      // setCartItems((prevItems) =>
      // prevItems.map((item) =>
      //   item.id === cartId ? { ...item, quantity } : item
      // )
    // );
    } catch (err) {
      console.error("Gagal memperbarui keranjang:", err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await axiosInstance.delete(`/api/v1/delete-cart/${cartId}`);
      await fetchCart();
    } catch (err) {
      console.error("Gagal menghapus dari keranjang:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, loading, addToCart, addMultipleToCart, updateCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
