import { useEffect, useState, useRef } from "react";
import { GetBannerById, PostUpdateBanner } from "../../api/BannerApi";
import { uploadImage } from "../../api/UploadApi";
import { toast } from "react-toastify";

const UpdateBanner = ({ banner, onClose }) => {
  const [form, setForm] = useState({ name: "", imageUrl: "" });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (banner) {
      setForm({ name: banner.name, imageUrl: banner.imageUrl });
    }
  }, [banner]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      toast.error("Pilih gambar terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await uploadImage(formData);
      const uploadedUrl = res?.url;

      if (!uploadedUrl || !uploadedUrl.includes("/images/")) {
        return toast.error("URL gambar tidak valid");
      }

      setForm((prev) => ({
        ...prev,
        imageUrl: uploadedUrl,
      }));

      toast.success("Gambar berhasil diunggah");
      setImageFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengunggah gambar");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PostUpdateBanner(banner.id, form);
      toast.success("Banner berhasil diperbarui");
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui banner");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
        <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

        <h2 className="text-xl font-bold mb-4 text-center">Update Banner</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="font-semibold">Nama Banner</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </label>

          <label className="block">
            <span className="font-semibold">URL Gambar</span>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </label>

          {form.imageUrl && (
            <div className="mb-4">
              <span className="font-semibold block mb-1">Preview Gambar:</span>
              <img src={form.imageUrl} alt="Banner" className="w-full max-h-64 object-contain rounded" />
            </div>
          )}

          <div>
            <label className="block font-semibold">Upload Gambar Baru:</label>
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

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Update Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBanner;