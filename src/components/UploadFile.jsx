import { useRef, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
const UploadFile = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);
    }
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);

        await axiosInstance.post('/api/v1/upload-image', formData)
        .then((res)=>{
            console.log(res);
            setImageUrl(res.data.result);
            fileInputRef.current.value = "";
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="flex flex-row items-center gap-5">
            <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
            />
            <button type="button" onClick={handleUpload}>Upload</button>
            {imageUrl && <img src={imageUrl} alt="Uploaded" className="w-48"/>}
        </div>
    )
}

export default UploadFile;