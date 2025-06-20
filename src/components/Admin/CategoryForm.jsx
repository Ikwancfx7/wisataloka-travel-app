import { useState, useRef } from "react";
import { uploadImage } from "../../api/UploadApi";
import { toast } from "react-toastify";

const CategoryForm = ({ initialData, onSubmit, onCancel }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !imageUrl.trim())
        return alert("Nama dan gambar wajib diisi");
        onSubmit({ name, imageUrl });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setIsUploading(true);
        try {
            const res = await uploadImage(formData); // { result: "https://..." }
            setImageUrl(res.url);
        } catch (err) {
            console.log(err);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setImageUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
                <button
                    onClick={onCancel}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">
                {initialData ? "Edit Kategori" : "Tambah Kategori"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Category Name:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white cursor-pointer"
                    />
                    {isUploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
                </div>

                {imageUrl && (
                    <div className="relative w-full h-40 mt-2">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded border"
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
                )}

                <div className="flex gap-2 justify-end pt-2">
                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`${
                            isUploading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 cursor-pointer"
                        } text-white px-4 py-2 rounded`}
                    >
                        {initialData ? "Save Changes" : "Create"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;
