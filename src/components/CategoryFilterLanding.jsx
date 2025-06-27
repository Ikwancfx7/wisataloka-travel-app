import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/CategoryApi";

const CategoryFilterLanding = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCategorySelect = (categoryId) => {
    setShowDropdown(false);
    navigate(`/activities?category=${categoryId}`);
  };

  return (
    <div className="relative w-full md:w-[400px]" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search category..."
        value={searchTerm}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full px-4 py-2 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-center placeholder:text-center"
      />
      {showDropdown && (
        <div className={`custom-scroll absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-md max-h-60 p-2 overflow-auto transition-all duration-500 ease-in-out transform ${showDropdown ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
          {filteredCategories.map((cat) => (
            <div className="flex flex-row items-center p-2 gap-1 hover:bg-green-100 rounded-lg">
              <img 
                src={cat.imageUrl} 
                alt={`image ${cat.name}`} 
                className="w-10 h-10 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null; // cegah infinite loop
                  e.target.src = "/images/default-activity.jpg"; // fallback jika gagal load dari API
                }}
              />
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="w-full text-left px-4 py-2 hover:cursor-pointer transition-colors duration-300 ease-in-out"
              >
                {cat.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilterLanding;