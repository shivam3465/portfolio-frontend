import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setCoding, setProject, setSkills, setUser } from './redux/user.js'
import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import ProjectPage from "./components/projectPage/ProjectPage";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails.jsx";
import Admin from "./admin/home/Admin.jsx";
import AdminAbout from "./admin/about/AdminAbout";
import AdminSkill from "./admin/skill/AdminSkill.jsx";
import AdminCoding from "./admin/coding/AdminCoding.jsx";
import AdminProject from "./admin/coding/AdminProject.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

function App() {    
   const baseUrl="https://portfolio-backend-eight-zeta.vercel.app/api/v1";
   

  const dispatch =useDispatch();
  
  useEffect(() =>{
    const fetcher = async () => {
      try {        
        const { data: res } = await axios.get(`${baseUrl}/skill/all`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const { data: res1 } = await axios.get(`${baseUrl}/project/all`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const { data: res2 } = await axios.get(`${baseUrl}/coding/all`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const { data: res3 } = await axios.get(`${baseUrl}/user/me`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        
        dispatch(setSkills(res.skills));
        dispatch(setProject(res1.projects))
        dispatch(setCoding(res2.codingProfiles));
        dispatch(setUser(res3.user))        
      } catch (error) {        
        toast.error(error);
        console.log(error);
      }
    };
    fetcher();
  },[])

  return (
    <div className="App">
      <Router>        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetails />} />          

          <Route path="/admin" element={<Login />} />
          <Route path="/admin/home" element={<Admin />} />
          <Route path="/admin/about" element={<AdminAbout />} />
          <Route path="/admin/skill" element={<AdminSkill />} />
          <Route path="/admin/coding" element={<AdminCoding />} />
          <Route path="/admin/project" element={<AdminProject />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </div>
  );
}

export default App;
