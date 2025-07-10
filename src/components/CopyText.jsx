import { Copy } from "lucide-react";
import { toast } from "react-toastify";

const Copytext = ({ text }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
        toast.success("Copy to clipboard", { autoClose: 1000 });

    };

    return(
        <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-gray-600 cursor-pointer"
        >
            <Copy className="w-5 h-5 md:w-6 md:h-6"/>
        </button>
    )
};

export default Copytext;