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
        <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4 md:space-y-6 min-h-0 overflow-hidden">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <h1 className="text-xl md:text-2xl font-bold">Manage Promo</h1>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by promo name..."
                        className="border px-4 py-2 rounded-lg w-full sm:w-64"
                    />
                    <button
                        onClick={() => {
                            setSelectedPromo(null);
                            setShowPopup(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                        + Add Promo
                    </button>
                </div>
            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPromos.map((promo) => (
                <div
                    key={promo.id}
                    className="card-container"
                >

                    <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        className="image-container"
                    />
                    <div>
                        <h2 className="text-lg font-semibold line-clamp-1">{promo.title}</h2>
                        <p className="text-sm text-gray-800 font-medium">Code: {promo.promo_code}</p>
                        <div className="button-edit-delete">
                            <button
                                onClick={() => {
                                    setSelectedPromo(promo);
                                    setShowPopup(true);
                                }}
                                className="button-edit"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(promo.id)}
                                className="button-delete"
                            >
                                Delete
                            </button>
                        </div>
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