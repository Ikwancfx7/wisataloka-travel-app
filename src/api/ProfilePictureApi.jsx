import { useState, useEffect } from "react";
import { getloggedUser } from "./ProfileApi";

const ProfilePicture = () => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const getProfilePicture = async () => {
            try {
                const response = await getloggedUser();
                setUser(response);
            } catch (error) {
                throw error.response?.data || error;
            }
        }
        getProfilePicture();
    },[]);
    
    return (
        <div className="w-full h-full">
            {user?.profilePictureUrl ? (
              <img
                src={user.profilePictureUrl}
                alt="Profile"
                className="h-full object-cover rounded-full"
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