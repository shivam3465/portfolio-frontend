import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { setLogined } from "../../redux/user";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [data, setData] = useState({});
  const { baseUrl, logined } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(
        `${baseUrl}/login`,
        { email: data.email, password: data.password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(setLogined(true));
      toast(res.message)
    } catch (error) {
      dispatch(setLogined(false));
      toast.error(error.response.data.message)
      console.log(error.response.data.message);
    }
  };

  if (logined) return <Navigate to={"/admin/home"} />;
  return (
    <div id="login" className="contact">
      <form className="form">
        <h1>Admin Login</h1>
        <div className="form-item">
          <label htmlFor="">Email:</label>
          <input
            type="email"
            placeholder="Enter your Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-item">
          <label htmlFor="">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}
