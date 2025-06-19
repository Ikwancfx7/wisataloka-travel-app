import { useEffect, useState, useRef } from "react";
import { PostUpdateActivity } from "../../api/ActivityApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../api/UploadApi";
import { GetActivityById } from "../../api/ActivityApi";
import CategoryDropdown from "../../components/CategoryDropdown";

const UpdateActivity = () => {
  const { id } = useParams(); // ambil ID dari URL params
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [],
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

  useEffect(() => {
    fetchActivityData();
  }, []);

  const fetchActivityData = async () => {
    try {
      const data = await GetActivityById(id);

      setForm({
        categoryId: data.categoryId || "",
        title: data.title || "",
        description: data.description || "",
        imageUrls: data.imageUrls || [],
        price: data.price || 0,
        price_discount: data.price_discount || 0,
        rating: data.rating || 0,
        total_reviews: data.total_reviews || 0,
        facilities: data.facilities || "",
        address: data.address || "",
        province: data.province || "",
        city: data.city || "",
        location_maps: data.location_maps || ""
      });
    } catch (err) {
      console.error("Failed to fetch activity:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["price", "price_discount", "rating", "total_reviews"];

    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...form.imageUrls];
    updatedImages[index] = value;
    setForm((prev) => ({ ...prev, imageUrls: updatedImages }));
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ""] }));
  };

  const handleFileSelect = (e) => {
    setImageFile(e.target.files[0]);
  };

  const removeImageAtIndex = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleUploadImage = async () => {
    if (!imageFile) return toast.error("Please, select an image", { autoClose: 1000 });

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await uploadImage(formData);
      const uploadedUrl = res.url;
      
      if (!uploadedUrl || !uploadedUrl.includes("/images/")) {
        toast.error("Failed to get image URL", { autoClose: 1000 });
        return;
      }

      setForm((prev) => {
      // Cek apakah ada blob di index pertama
      const newImageUrls = [...prev.imageUrls];
        if (newImageUrls[0]?.includes("blob")) {
            newImageUrls[0] = uploadedUrl; // Ganti dengan yang valid
          } else {
            newImageUrls.push(uploadedUrl); // Tambahkan jika sudah valid semua
          }

        return { ...prev, imageUrls: newImageUrls };
      });

      toast.success("Gambar berhasil diunggah");
      setImageFile(null);
      fileInputRef.current.value = ""; // reset input file
    } catch (err) {
      console.error(err);
      toast.error("Gagal upload gambar");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanedImageUrls = form.imageUrls.filter((url) =>
        url.startsWith("https://travel-journal-api-bootcamp.do.dibimbing.id/images/")
      );

      // pastikan tidak kosong
      if (cleanedImageUrls.length === 0) {
        return toast.error("Minimal satu gambar harus diunggah.");
      }

      await PostUpdateActivity(id,{
        ...form,
        imageUrls: cleanedImageUrls,
        price: Number(form.price),
        price_discount: Number(form.price_discount),
        rating: Number(form.rating),
        total_reviews: Number(form.total_reviews),
      });

      toast.success("Activity updated successfully!", { autoClose: 1000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update activity", { autoClose: 1000 });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Activity</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="font-semibold">Category:</span>
          <CategoryDropdown
            selectedCategoryId={form.categoryId}
            onChange={(id) =>
              setForm((prev) => ({ ...prev, categoryId: id }))
            }
          />
          {/* <input
            type="text"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            placeholder="Category ID"
            className="w-full border px-3 py-2 rounded"
            required
          /> */}
        </label>

        <label className="block">
          <span className="font-semibold">Title:</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
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
            placeholder="Description"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        <div>
          <label className="block font-semibold">Image URLs:</label>
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

        <div className="mt-2">
          <label className="block font-semibold">Upload Image:</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="border px-3 py-2 rounded"
          />
          <button
            type="button"
            onClick={handleUploadImage}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {form.imageUrls.map((url, index) => (
            <div key={index} className="relative">
              <img src={url} alt={`uploaded ${index}`} className="w-full rounded" />
              <button
                onClick={() => removeImageAtIndex(index)}
                className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
        
        <label className="block">
          <span className="font-semibold">Price:</span>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
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
            placeholder="Discounted Price"
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
            placeholder="Rating"
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
            placeholder="Total Reviews"
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          <span className="font-semibold">Facilities:</span>
          <textarea
            name="facilities"
            value={form.facilities}
            onChange={handleChange}
            placeholder="Facilities (HTML allowed)"
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
            placeholder="Address"
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
            placeholder="Province"
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
            placeholder="City"
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          <span className="font-semibold">Location Maps:</span>
          <textarea
            name="location_maps"
            value={form.location_maps}
            onChange={handleChange}
            placeholder="Location Maps (iframe embed HTML)"
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer transition duration-300 ease-in-out"
        >
          Update Activity
        </button>
      </form>
    </div>
  );
};

export default UpdateActivity;
