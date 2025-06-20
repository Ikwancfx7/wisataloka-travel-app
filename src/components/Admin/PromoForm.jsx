import { useState, useEffect } from "react";
import { uploadImage } from "../../api/UploadApi";

const defaultForm = {
  title: "",
  description: "",
  imageUrl: "",
  terms_condition: "",
  promo_code: "",
  promo_discount_price: 0,
  minimum_claim_price: 0,
};

const PromoForm = ({ initialData, onSubmit, onClose, isEdit }) => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name.includes("price") ? parseInt(value) : value,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await uploadImage(formData);
      setForm((prev) => ({ ...prev, imageUrl: res.url }));
    } catch (err) {
      console.error("Gagal upload gambar", err);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // diproses di parent
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-xl w-full max-w-xl space-y-4">
        <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-3 text-red-600 hover:text-red-800 text-2xl cursor-pointer"
          >
            &times;
        </button>
        <h2 className="text-xl font-bold mb-2">
          {isEdit ? "Update Promo" : "Create Promo"}
        </h2>
        <form onSubmit={handleSubmit} className="custom-scroll space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <label className="block">
            <span className="text-sm font-semibold">Title:</span>
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
            <span className="text-sm font-semibold">Description:</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows={4}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Promo Code:</span>
            <input
              type="text"
              name="promo_code"
              value={form.promo_code}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Promo Discount Price (Rp):</span>
            <input
              type="number"
              name="promo_discount_price"
              value={form.promo_discount_price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Minimum Claim Price (Rp):</span>
            <input
              type="number"
              name="minimum_claim_price"
              value={form.minimum_claim_price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Terms & Conditions:</span>
            <textarea
              name="terms_condition"
              value={form.terms_condition}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows={3}
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-semibold">Upload Image </span>
            <input type="file" accept="image/*" onChange={handleUpload} className="cursor-pointer px-3 py-2 border rounded"/>
            {loading ? (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            ) : form.imageUrl ? (
              <div className="relative w-full h-40 mt-2">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />
                <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                    title="Hapus gambar"
                  >
                    &times;
                </button>

              </div>
            ) : null}
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              {isEdit ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromoForm;