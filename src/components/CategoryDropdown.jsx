// components/CategoryDropdown.jsx
import { useEffect, useRef, useState } from "react";
import { getCategories } from "../api/CategoryApi";

const CategoryDropdown = ({ selectedCategoryId, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm || selectedCategory?.name || ""}
        placeholder="Pilih kategori"
        onFocus={() => {
            setShowDropdown(true);
            setSearchTerm("");
        }}
        onClick={() => setShowDropdown(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full px-4 py-2 border rounded-md cursor-pointer"
      />
      {showDropdown && (
        <div className="custom-scroll absolute z-10 w-full mt-1 bg-white border rounded-md max-h-60 overflow-y-auto shadow">
          {categories
            .filter((cat) =>
              cat.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(cat.id);
                  setSearchTerm(cat.name);
                  setTimeout(() => setShowDropdown(false), 100);
                }}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-8 h-8 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = "/images/default-activity.jpg";
                  }}
                />
                <span>{cat.name}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;