import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Router, Routes, Route, Link } from 'react-router-dom';
import UserRooms from "./userRooms";


// import Events from "./Events";
const UserDashboard = () => {

let navigate  = useNavigate()
  return (
    <>
      <div className="app-container">
        {/* Sidebar/Navigation */}
        <div className="sidebar">
          <nav className="dashboard-nav">
            <ul>
              <li>
                <Link to="rooms">Seats</Link>
              </li>
            </ul>
            <div>
              <p>{localStorage.getItem("name")}</p>
              <hr />
              <div  onClick={() => {
              localStorage.removeItem("email")
              localStorage.removeItem("name")
              localStorage.removeItem("jwt")
              navigate("/")
            }}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span className="mx-2">Log out</span>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="rooms" element={<UserRooms />}></Route>
          </Routes>

        </div>
      </div>

    </>
  );


}


export default UserDashboard