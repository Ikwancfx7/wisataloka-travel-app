import { useState } from "react";
import { postCreateActivity } from "../../api/ActivityApi";
import { toast } from "react-toastify";
import CategoryDropdown from "../../components/CategoryDropdown";

const CreateActivity = ({ onClose }) => {
  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [""],
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...form.imageUrls];
    updatedImages[index] = value;
    setForm((prev) => ({ ...prev, imageUrls: updatedImages }));
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postCreateActivity(form);
      toast.success("Activity created successfully!");
      setForm({
        categoryId: "",
        title: "",
        description: "",
        imageUrls: [""],
        price: 0,
        price_discount: 0,
        rating: 0,
        total_reviews: 0,
        facilities: "",
        address: "",
        province: "",
        city: "",
        location_maps: ""
      });
      if (onClose) onClose();
    } catch (err) {
      toast.error("Failed to create activity");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 h-screen">
      <div className="bg-white p-6 rounded-lg w-full max-w-screen-md relative max-h-[85vh] overflow-y-auto custom-scroll">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-red-700 hover:text-red-500 cursor-pointer"
        >
          ✕
        </button>
        <h1 className="text-2xl font-bold mb-4">Create Activity</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="font-semibold">Category:</span>
            <CategoryDropdown
              selectedCategoryId={form.categoryId}
              onChange={(id) =>
                setForm((prev) => ({ ...prev, categoryId: id }))
              }
            />
          </label>

          <label className="block">
            <span className="font-semibold">Title:</span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </label>

          <label className="block">
            <span className="font-semibold">Description:</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </label>

          <div>
            <label className="block font-semibold mb-1">Image URLs:</label>
            {form.imageUrls.map((url, index) => (
              <input
                key={index}
                type="text"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                className="w-full border px-3 py-2 rounded mb-2"
              />
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="text-blue-500 underline"
            >
              + Add Image URL
            </button>
          </div>

          <label className="block">
            <span className="font-semibold">Price:</span>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block">
            <span className="font-semibold">Discounted Price:</span>
            <input
              type="number"
              name="price_discount"
              value={form.price_discount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block">
            <span className="font-semibold">Rating:</span>
            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block">
            <span className="font-semibold">Total Reviews:</span>
            <input
              type="number"
              name="total_reviews"
              value={form.total_reviews}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block">
            <span className="font-semibold">Facilities (HTML allowed):</span>
            <textarea
              name="facilities"
              value={form.facilities}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block">
            <span className="font-semibold">Address:</span>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block">
            <span className="font-semibold">Province:</span>
            <input
              type="text"
              name="province"
              value={form.province}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block">
            <span className="font-semibold">City:</span>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block">
            <span className="font-semibold">Location Maps (iframe embed HTML):</span>
            <textarea
              name="location_maps"
              value={form.location_maps}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );

};

export default CreateActivity;
