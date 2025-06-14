import { useRef, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";

const UploadProofPayment = ({ transactionId }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Select an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
        const uploadRes = await axiosInstance.post("/api/v1/upload-image", formData);
        console.log("Upload Response:", uploadRes);
        const uploadedImageUrl = uploadRes.data.url;
        setUploadedUrl(uploadedImageUrl);

        if (!uploadedImageUrl) {
            throw new Error("Failed to get uploaded image URL.");
        }

        await axiosInstance.post(`/api/v1/update-transaction-proof-payment/${transactionId}`, {
        proofPaymentUrl: uploadedImageUrl,
      });

      toast.success("Payment proof uploaded successfully.", { autoClose: 1000 });
      fileInputRef.current.value = "";
      setImage(null);
      setPreviewUrl(null);

    } catch (err) {
      console.error(err);
      toast.error("Payment proof upload failed.", { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-lg font-semibold italic">Upload Payment Proof</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="block"
      />

      {previewUrl && (
        <div>
          <p className="text-sm text-gray-500">Preview:</p>
          <img src={previewUrl} alt="Preview" className="w-64 rounded border" />
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="text-sm text-green-700">
          Payment proof uploaded:{" "}
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadProofPayment;
