import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Addblog from './components/Addblog'

import { AuthProvider } from './AuthContext'
import Viewblog from './components/Viewblog'
import Blogdetail from './components/Blogdetail'
import Profile from './components/Profile'
import Admin from './components/Admin'
import Blogs from './components/Blogs'

function App() {
  const [count, setCount] = useState(0)
 return (
    <>
      <AuthProvider>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addblog" element={<Addblog/>}/>
        <Route path="/viewblog" element={<Viewblog/>}/>
        <Route path="/blogdetail/:id" element={<Blogdetail/>}/>
        <Route path="/blogs/:id" element={<Blogs/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin" element={<Admin/>}/> 
        
        
      </Routes>
      </AuthProvider>
      </>
  )
}

export default App
