import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center mb-6 gap-2">
      <input
        type="text"
        placeholder="Cari kategori..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 md:w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-row md:flex-wrap gap-2 justify-start">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3 py-1 rounded border ${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
            }`}
            >
          Semua
        </button>
        {filteredCategories.length > 0 ? (
          filteredCategories.slice(0, 8).map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1 rounded border ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))
        ) : (
          <p className="text-gray-500">Kategori tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
