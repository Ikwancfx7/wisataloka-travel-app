import axiosInstance from "./AxiosInstance";
import { useState, useEffect } from "react";

const ProfilePicture = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getProfilePicture = async () => {
            try {
                const response = await axiosInstance.get("/api/v1/user");
                setUser(response.data.data); // Update the user state with the fetched data
            } catch (error) {
                throw error.response?.data || error;
            }
        }

        getProfilePicture();
    },[]);
    
    return (
        <div>
            {user?.profilePictureUrl ? (
              <img
                src={user.profilePictureUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-sm text-white">
                {user?.name?.[0] || "P"}
              </div>
            )}
        </div>
    )
};

export default ProfilePicture;