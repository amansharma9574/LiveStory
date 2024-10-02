import React from 'react'
import Login from './pages/login/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/register/Register'
import Home from './pages/home/Home';
import Userpost from './pages/user post/Userpost';
import Createpost from './pages/create post/Createpost';


function App  ()  {

  return (
    <BrowserRouter>

      <Routes>
     
        <Route path="/" element={<Home/>} />
        <Route path="/api/login" element={<Login/>} />
        <Route path='/api/signup' element={<Register/>}/>
        <Route path='/api/fullpost/:_id' element={<Userpost/>}/>
        <Route path='/api/post' element={<Createpost/>}/>
      
        </Routes>
        </BrowserRouter>
  )
}

export default App;