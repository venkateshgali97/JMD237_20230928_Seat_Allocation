
import { BrowserRouter, Routes, Route } from "react-router-dom"

import AdminDashboard from "./Components/Admin/AdminDashboard"
import UserDashboard from "./Components/User/userDashboard"
import Login from './Components/Login/login'

import "./App.css"



const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/user/*" element={<UserDashboard />}></Route>
        <Route path="/admin/*" element={<AdminDashboard />}></Route>
      </Routes>
      
    </BrowserRouter>
  )
  }

  export default App


