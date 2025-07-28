import { useEffect, useState } from "react";
import {
  getCategories,
  postCreateCategory,
  postUpdateCategory,
  delDeleteCategory,
} from "../../api/CategoryApi";
import CategoryForm from "../../components/Admin/CategoryForm";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = async () => {
    try {
        const data = await getCategories();
        setCategories(data);
    } catch (error) {
        console.log(error);
    }
  };

  const handleCreate = async (formData) => {
    try {
        await postCreateCategory(formData);
        setIsFormOpen(false);
        fetchCategories();
    } catch (error) {
        console.log(error);
        toast.error("Failed to create category");
    }
  };

  const handleUpdate = async (formData) => {
    try {
        await postUpdateCategory(editingCategory.id, formData);
        setEditingCategory(null);
        setIsFormOpen(false);
        fetchCategories();
    } catch (error) {
        console.log(error);
        toast.error("Failed to update category");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
        title: "Are you want to delete this category?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    })

    if (!result.isConfirmed) return;

    try {
        await delDeleteCategory(id);
        fetchCategories();
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete category");
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter berdasarkan searchTerm
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4 md:space-y-6 min-h-0 overflow-hidden">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Manage Categories</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
          <input
            type="text"
            placeholder="Search by category name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full sm:w-64 flex-shrink-0"
          />
          <button
            onClick={() => {
              setEditingCategory(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
          >
            + Add Category
          </button>
        </div>
      </div>

      {isFormOpen && (
        <CategoryForm
          initialData={editingCategory}
          onSubmit={editingCategory ? handleUpdate : handleCreate}
          onCancel={() => {
            setEditingCategory(null);
            setIsFormOpen(false);
          }}
        />
      )}

      {filteredCategories.length === 0 ? (
        <p className="text-gray-500 italic">Kategori tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="card-container"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="image-container"
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold truncate">{category.name}</h2>
                <div className="button-edit-delete">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="button-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="button-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
