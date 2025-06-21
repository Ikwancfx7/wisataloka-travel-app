import { useRef, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadProofPayment = ({ transactionId }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

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
      
      setTimeout(() => {
        navigate("/transactions");
      }, 1000)

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
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
        className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 disabled:opacity-50 cursor-pointer"
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
