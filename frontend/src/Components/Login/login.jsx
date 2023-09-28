import "../../Styles/login.css"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import loginApi from "../../Services/Login/login";
const Login = () => {
  const [logInDetails, setLogInDetails] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const HandleInput = (e) => {
    setLogInDetails({ ...logInDetails, [e.target.id]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (logInDetails.email.trim().length < 1) {
      toast.warning("email required..")
     
    }
    else if (logInDetails.password.trim().length < 9) {
      toast.warning("password should be atleast 8 characters")
    }
    else {
      const response = await loginApi.login(logInDetails)
      console.log(response, "this is login Response service")
      localStorage.setItem("jwt", response.data.jwt)
      if (response.status === 202) {
        toast.error("Email Not found")
      }
      else if (response.status === 201) {
        toast.error("password didn't match")
      }
      else {
        if (response.data.role === 'user') {
          localStorage.setItem("email", response.data.email)
          localStorage.setItem("name", response.data.name)
          navigate("/user/rooms")
        }
        else if (response.data.role === 'admin') {
          navigate("/admin/users")
        }
      }
    }
  }
  return (
    <div className="login-container">
      <form className="login-form" >
        <p className="title text-center">Login</p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={HandleInput}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={HandleInput}
        />

        <button type="submit" onClick={submitHandler}>
          Login
        </button>


      </form>
    </div>
  );
}

export default Login;
