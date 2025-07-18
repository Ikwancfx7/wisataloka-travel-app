import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getloggedUser, postUpdateProfile } from "../api/ProfileApi";
import { uploadImage } from "../api/UploadApi";
import LogoutBtn from "./Logout";

const EditProfile = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        profilePictureUrl: "",
        phoneNumber: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getloggedUser();
        const user = res;
        setForm({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePictureUrl: user.profilePictureUrl || ""
        });
      } catch (err) {
        console.error("Gagal ambil data profil:", err);
      }
    };

    fetchProfile();
  }, []);

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value        
        })
    }


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setLoading(true);
            const res = await uploadImage(formData);
            const uploadedUrl = res.url;
            setForm(prev => ({ ...prev, profilePictureUrl: uploadedUrl }));
            toast("Image uploaded successfully!", { autoClose: 1000 });
        } catch (err) {
            console.error(err);
            toast("Failed to upload image.", { autoClose: 1000 });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await postUpdateProfile(form);
            toast("Profile updated successfully!", { autoClose: 1000 });
            console.log(res);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            console.error(err);
            toast("Failed to update profile.", { autoClose: 1000 });
        }
    };

    const handleRemoveProfilePicture = async () => {
        try {
            const removePictureProfile = {
                ...form,
                profilePictureUrl: "", 
            };

            await postUpdateProfile(removePictureProfile);
            
            setForm(removePictureProfile);
        } catch (error) {
            console.error("Delete profile picture failed:", error);
        }
    };

    return (
        <div>
            <div className="max-w-lg mx-auto p-5 bg-white">
                <h2 className="flex justify-center text-2xl font-bold mb-4 px-5">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4 p-5">
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border py-2 px-4 rounded-full"
                        />
                        </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border py-2 px-4 rounded-full"
                        />
                        </div>
                    <div>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="w-full border py-2 px-4 rounded-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Upload Profile Picture</label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer italic bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
                                Select Image
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
    
                            {loading && (
                            <p className="text-sm text-gray-500">Uploading...</p>
                            )}
                        </div>
                    </div>
                    {form.profilePictureUrl ? (
                        <div className="flex flex-row items-center gap-10">
                            <img
                            src={form.profilePictureUrl == "" ? "/images/default-profile.jpg" : form.profilePictureUrl}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-full border"
                            onError={(e) => {
                                e.target.onerror = ""; // prevent infinite loop
                                e.target.src = "/images/default-profile.jpg";
                            }}
                            />
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={handleRemoveProfilePicture}
                                    className="flex text-left px-3 py-1 text-sm italic rounded-xl border border-yellow-700 hover:bg-yellow-100 text-yellow-700 transition duration-200 hover:cursor-pointer"
                                    >
                                    Delete
                                </button>
                            </div>
        
                        </div>
                        ):(
                            <div className="flex flex-row items-center gap-2">
                                <img
                                    src="/images/default-profile.jpg"
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-full border"
                                />
                                <p className="text-sm text-gray-500">Profile picture not uploaded</p>
                            </div>
                        )}
                    <div className="w-full flex justify-center pt-10">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 hover:cursor-pointer transition duration-200"
                            >
                            Save Changes
                        </button>
                    </div>
                </form>

                <div className="flex md:hidden justify-center mt-10 text-lg p-5">
                    <LogoutBtn/>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;