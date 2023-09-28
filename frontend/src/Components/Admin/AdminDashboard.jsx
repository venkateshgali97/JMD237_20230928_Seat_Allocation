
import { Routes, Route, Link } from 'react-router-dom';
import Rooms from "./Rooms";
import Users from './Users';
import { useNavigate } from 'react-router-dom';

// import Events from "./Events";
const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="app-container">

        <div className="sidebar">
          <nav className='dashboard-nav'>
            <ul>
              <li>
                <Link to="rooms">Rooms</Link>
              </li>
              <li>
                <Link to="users">Users</Link>
              </li>
            </ul>
            <div onClick={() =>navigate("/")}>
               <hr />
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span className='mx-2'>Log out</span>
            </div>
          </nav>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="rooms" element={<Rooms />}></Route>
            <Route path="users" element={<Users />}></Route>
          </Routes>
        </div>
      </div>

    </>
  );
}


export default AdminDashboard