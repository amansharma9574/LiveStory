import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';



function UserPost() {
    const {_id } = useParams();
    
    const [items, setItems] = useState([]);
    const [unauthorize, setUnauthorize] = useState(false);
    const [authorize, setAuthorize] = useState (false);
    const data = {
    _id
    };

    function getToken(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) {
          return match[2];
      }
      return null;
  }
 

    const fetchpost = async () => {
        
 try{
  const token = localStorage.getItem('accessToken');
 
    const response = await axios.post('http://localhost:3000/api/fullpost',data,{
      headers:{
      'Authorization': `Bearer ${token}`
      }
    });
    setItems(response.data.post);
    setAuthorize(true);
 }
 
 catch(error){
  setUnauthorize(true);
    console.error(error);
 }
    }
    
    useEffect(() => {
        fetchpost()
        
      }, [_id]);
      const token = getToken('refreshToken')
    
    

  return (
    <div className='flex h-full flex-col  items-center'>
     {authorize && <div className='flex flex-col h-screen mt-32 w-3/4'>
    <h1 className='font-bold mb-6'>{items.header}</h1>
    {items.image && (
          <img 
            src={items.image} 
            alt="Post" 
            className="w-72 h-52 mb-6 rounded" 
          />
        )}
    <p> {items.content}</p>
    <p><strong>Author:</strong> {items.user}</p>
    <p><strong>Created At:</strong> {new Date(items.createdAt).toLocaleDateString()}</p>
    </div>}
    {unauthorize && <div>Unauthorize, please log in to access full post</div>}
  </div>
  )
}

export default UserPost