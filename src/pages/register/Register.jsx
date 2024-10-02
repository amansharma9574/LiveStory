import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RiLoader4Fill } from "react-icons/ri";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const saveRefreshToken = (token) => {
    document.cookie = `refreshToken=${token}; path=/; SameSite=Lax`;
 
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "email" ? value.toLowerCase() : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  useEffect(() => {
    setIsOpen(true);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(false);

    try {
      setError(null);
      const response = await axios.post(
        "http://192.168.0.110:3000/api/signup",
        formData
      );
      
      const accessToken =response.data.accessToken;
      localStorage.setItem('accessToken',accessToken);
      setUserData(response.data);
    } catch (error) {
      setLoading(true);

      if (error.response) {
        setError(error.response.data.error || "Something went wrong");
      } else if (error.request) {
        setError("Server Down");
      }
    }
  };
  useEffect(() => {
    if (userData) {
      const token = userData.refreshToken;
       saveRefreshToken(token);
       localStorage.setItem('userName', userData.name);
       localStorage.setItem('userEmail', userData.email);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [userData]);

  return (
    <div
      className={`absolute bottom-0 h-full w-full bg-zinc-200 text-white transform ${
        isOpen ? "-translate-y-0" : "translate-y-full"
      } transition-transform duration-700 ease-in-out`}
    >
      <div className="flex justify-center mt-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-20 p-6 rounded-3xl w-80 max-w-md"
        >
          <h2 className="text-2xl text-gray-800 font-bold mb-5 text-center">
            Sign up
          </h2>
          <div className="mb-4">
            <label
              className="block ml-2 text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 text-black py-2 border h-10 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block ml-2  text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full py-2 px-3 text-black h-10 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block ml-2  text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 text-black py-2 h-10 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block ml-2  text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black h-10 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          {error && <div className=" text-red-700	">{error}</div>}

          <div className="flex items-center justify-between">
            {loading ? (
              <button
                type="submit"
                className="bg-zinc-800 text-white px-4 h-10 w-24  py-2 rounded-lg focus:outline-none focus:ring"
              >
                Sign up
              </button>
            ) : userData ? (
              <div className="flex bg-zinc-800 rounded-lg items-center justify-center h-10 w-24">
                <FaCheckCircle
                  size={26}
                  className="text-green-600 text-[100px] opacity-0 transform scale-0 animate-checkmark"
                />
              </div>
            ) : (
              <div className="bg-zinc-800  text-white flex justify-center items-center rounded-lg h-10 w-24">
                <RiLoader4Fill
                  className="animate-spin"
                  size={24}
                ></RiLoader4Fill>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
