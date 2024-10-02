import React, { useState } from "react";
import axios from "axios";

export default function createPost() {

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [header, setHeader] = useState("");
  const [user, setUser]= useState('66a9fd10c1cd79fb8ed69a28');
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
 


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
 

  const Submit = async (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append('header', header);
    formData.append('content', content);
    formData.append('user', user);
    if (image) {
      formData.append('image', image);
    }

    try {
      console.log(formData)
      const response = await axios.post("http://localhost:3000/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }


 

  return (
    <div className="p-6">
      <form onSubmit={Submit} className="space-y-6">
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Header:</label>
        <input
          type="text"
          required
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
        <label className="block text-lg font-medium mb-2">Content:</label>
       
          <textarea
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-y rounded  border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          

      <div className="flex gap-4 items-center">
   
        <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Upload Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept="image/*"
        />
      </div>
      <button
        type="submit"
        className="bg-red-500  h-14 w-18  text-white py-2 px-4 rounded ">
      
        Submit Post
      </button>
      </div>
      </form>
    </div>
  );
}
