import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo33.png";
import { FaCircleUser } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      
      
      <div
      className={`flex h-full w-full h-16 p-0 m-0 justify-between transition-colors duration-1000 ${
        isOpen ? "bg-zinc-900 fixed" : "bg-white"
      }`}>

        <img src={logo} className={`pl-1 h-16 w-26 transition-opacity duration-700 ${isOpen ? 'opacity-0' : 'opacity-100'}`}  />
        <div className=" font-serif mt-5 mr-5 mb-0 ">
          <IoMenuOutline onClick={toggleMenu} className={`p-0 ${isOpen ?  'text-white' : 'text-black'}`}  size={27} />
            <div
            className={`absolute left-0 inset-0 top-17 bottom-0 w-full bg-zinc-900 text-white text-center transform ${
              isOpen ? "translate-y-16 fixed" : "-translate-y-full"
            } transition-transform duration-700 ease-in-out`}
            style={{height: '91%'
            }}
          >
            <ul className="flex flex-col items-center p-4">
              
          <Link  className=" font-serif border-b border-zinc-700 w-72 text-xl mt-5 mr-5 " to="/api/login">Login</Link>
          <Link className=" font-serif border-b border-zinc-700 w-72 text-xl mt-5 mr-5 " to="/api/Signup">Signup</Link>
          <Link className=" font-serif border-b border-zinc-700 w-72 text-xl mt-5 mr-5 " to="/api/post">Create Post</Link>
        
            </ul>
          </div> 

        </div>
      </div>
      <div className="border-b border-gray-300 "></div>
    </>
  );
}

export default Header;
