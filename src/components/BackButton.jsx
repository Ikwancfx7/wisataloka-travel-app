import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // opsional, pakai ikon Lucide

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </button>
  );
};

export default BackButton;