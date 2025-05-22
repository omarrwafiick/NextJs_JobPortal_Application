import { v2 as cloudinary } from 'cloudinary';
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadFile = async (file, type) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);  

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData, 
  });

  const data = await res.json();

  return data;
};

export const removeFile = async (id) => { 
  await fetch(`/api/remove/${id}`, {
    method: "POST"
  }); 
};