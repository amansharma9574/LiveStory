import React, { useState, useEffect } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import axios from 'axios';
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function Login ()  {
 
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userdata, setUserData] = useState('');
  const [invalidpassword, setInvalidPassword] = useState();
  const [showpassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const saveRefreshToken = (token) => {
    document.cookie = `refreshToken=${token}; path=/; SameSite=Lax`;
 
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(formData)
    setFormData({
      ...formData,
      [name]: value
    });
  };
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(false)
    console.log(formData);
    try{
      const response = await axios.post('http://localhost:3000/api/login', formData);
      setUserData(response.data.user);
      
      setInvalidPassword(false);
      console.log(response.data);
      const accessToken =response.data.accessToken;
      localStorage.setItem('accessToken',accessToken);
    console.log("access",response.data.accessToken)
  }
    catch(error){
      setInvalidPassword(true);
      setLoading(true)
      console.log(error);
    }
  
   
    
  };
  useEffect(() => {
    if (userdata) {
      const token = userdata.refreshToken;
       saveRefreshToken(token);
       
  
      localStorage.setItem('userName', userdata.name);
      localStorage.setItem('userEmail', userdata.email);
      const userName=localStorage.getItem('userName');
      const userEmail=localStorage.getItem('userEmail');
      setTimeout(() => {
       
        console.log("username:",userName,userEmail)
       navigate("/");
      }, 1000);
    }
  }, [userdata, navigate]);

  return (
    
    <div className={`absolute bottom-0 h-full w-full bg-zinc-200 text-white transform ${
      isOpen ? "-translate-y-0" : "translate-y-full"
    } transition-transform duration-700 ease-in-out`}>
      
      <div className="relative flex justify-center   mt-32">
      <form onSubmit={handleSubmit} className="relative bg-white p-6 rounded-2xl shadow-lg w-72 z-10 max-w-md">
      
        <h2 className="text-xl text-gray-700 font-bold mb-5 text-center">Log in</h2>
        <div className="mb-4">
          <label className="block ml-2 text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 text-black py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block ml-2 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
         <div className="relative"><input
            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type={showpassword?"password": "text"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            
          />{showpassword ? (<IoMdEye onClick={() => setShowPassword(false)} className="absolute right-2" size={18} style={{ top: "25%"}} color="gray" />) : (<IoMdEyeOff className="absolute right-2" onClick={() => setShowPassword(true)} size={18} style={{ top: "25%"}} color="gray" />)}</div>
          {invalidpassword && <div className=" pt-3 text-red-700	">Invaild Email or Password</div>}
          
        </div>
        <div className="flex items-center justify-between">
          {loading ?( <button
            type="submit"
            className="bg-zinc-800 text-white px-4 h-10 w-20  py-2 rounded-lg focus:outline-none focus:ring"
          >Log in
          </button>) :userdata ? (<div className="flex bg-zinc-800 rounded-lg items-center justify-center h-10 w-20">
            <FaCheckCircle size={26}  className="text-green-600 text-[100px] opacity-0 transform scale-0 animate-checkmark" />
    </div>) :
          (<div className="bg-zinc-800  text-white flex justify-center items-center rounded-lg h-10 w-20">
          <RiLoader4Fill
          className="animate-spin" size={24}></RiLoader4Fill>
</div>)
}
          
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
