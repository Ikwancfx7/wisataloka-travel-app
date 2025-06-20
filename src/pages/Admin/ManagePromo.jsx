import { useEffect, useState } from "react";
import {
  getPromos,
  postCreatePromo,
  postUpdatePromo,
  delDeletePromo,
} from "../../api/PromoApi";
import PromoForm from "../../components/Admin/PromoForm";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManagePromo = () => {
    const [promos, setPromos] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredPromos, setFilteredPromos] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);

    useEffect(() => {
    fetchPromos();
    }, []);

    useEffect(() => {
    const filtered = promos.filter((promo) =>
        promo.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPromos(filtered);
    }, [search, promos]);

    const fetchPromos = async () => {
    const data = await getPromos();
        if (data) {
            const sorted = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setPromos(sorted);
        }
    };

    const handleSubmitPromo = async (formData) => {
        try {
            if (selectedPromo) {
                await postUpdatePromo(selectedPromo.id, formData);
                toast.success("Promo updated successfully", { autoClose: 1000 });
            } else {
                await postCreatePromo(formData);
                toast.success("Promo created successfully", { autoClose: 1000 });
            }
            setShowPopup(false);
            setSelectedPromo(null);
            fetchPromos();
        } catch (error) {
            toast.error(error, { autoClose: 1000 });
        }
    };

    const handleDelete = async (id) => {
    const confirm = await Swal.fire({
        title: "Are you want to delete this category?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    });

    if (confirm.isConfirmed) {
        try {
        await delDeletePromo(id);
        toast.success("Promo deleted successfully", { autoClose: 1000 });
        fetchPromos();
        } catch (error) {
        toast.error(error, { autoClose: 1000 });
        }
    }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Promo</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by promo name..."
                        className="border px-4 py-2 rounded-lg w-64"
                    />
                    <button
                        onClick={() => {
                        setSelectedPromo(null);
                        setShowPopup(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                        + Tambah Promo
                    </button>
                </div>
            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPromos.map((promo) => (
                <div
                    key={promo.id}
                    className="flex flex-col justify-between border rounded-lg p-4 shadow space-y-2 bg-white"
                >
                    <div className="flex flex-col gap-2">
                        <img
                            src={promo.imageUrl}
                            alt={promo.title}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-xl font-semibold line-clamp-1">{promo.title}</h2>

                        <p className="text-sm text-gray-600 line-clamp-3">{promo.description}</p>
                        <p className="text-sm text-gray-800 font-medium">Code: {promo.promo_code}</p>
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Diskon: Rp{promo.promo_discount_price.toLocaleString()}</span>
                            <span>Minimal: Rp{promo.minimum_claim_price.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <button
                            onClick={() => {
                                setSelectedPromo(promo);
                                setShowPopup(true);
                            }}
                            className="px-3 py-1 border text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg cursor-pointer"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(promo.id)}
                            className="px-3 py-1 border text-red-600 border-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            ))}
            </div>

            {showPopup && (
                <PromoForm
                    isEdit={!!selectedPromo}
                    initialData={selectedPromo}
                    onSubmit={handleSubmitPromo}
                    onClose={() => {
                        setShowPopup(false);
                        setSelectedPromo(null);
                    }}
                />
            )}
        </div>
    );
};

export default ManagePromo;