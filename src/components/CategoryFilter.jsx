import { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/AxiosInstance";

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [] );

  const handleCategorySelect = (categoryId) => {
    onSelectCategory(categoryId);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full md:w-[300px] hidden md:flex bg-white" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Cari kategori..."
        value={searchTerm}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value),
          setShowDropdown(true);
        }}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-auto">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`w-full text-left px-4 py-2 hover:bg-blue-100 ${
              selectedCategory === null ? "bg-blue-600 text-white" : ""
            }`}
          >
            Semua
          </button>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full text-left px-4 py-2 hover:bg-blue-100 ${
                  selectedCategory === cat.id ? "bg-blue-600 text-white" : ""
                }`}
              >
                {cat.name}
              </button>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500">Kategori tidak ditemukan.</p>
          )}
        </div>
      )}
      {/* <div className="flex flex-row md:flex-wrap gap-2 justify-start">
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
      </div> */}
    </div>
  );
};

export default CategoryFilter;
