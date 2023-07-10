import React, { useEffect, useState } from "react";
import "./adminabout.scss";
import SideBar from "../sidebar/SideBar.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AdminAbout() {
  const [curAbout, setCurAbout] = useState("");
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({});
  const { baseUrl, about ,user} = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState("");

  const handleEdit = () => {
    setEdit(!edit);
    // setCurAbout(previousDescription);
  };
  

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfile({image: reader.result});
      }
    };
  };

  const updateImage = async (e)=>{
    e.preventDefault();
    if(!profile.image) return;
    try {
      const { data: res } = await axios.post(
        `${baseUrl}/user/add/about/profile`,
        { profile : profile.image},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // console.log(res);
      toast(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(
        `${baseUrl}/user/add/about`,
        { aboutMe: curAbout },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);
      toast(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    setCurAbout(about);
    user.aboutPic && setProfileImage(user.aboutPic.url)    
  }, [about]);

  return (
    <div className="admin adminAbout">
      <SideBar />
      <div className="main-container">
        <h1>About Page</h1>

        <div className="image-div">
          <div className="image-container">
            <div>Previous Image</div>
            <div id="image">
              <img src={profileImage} alt="" />
            </div>
          </div>
          <input type="file" name="" id="" onChange={handleImage} />
          <button className="button" onClick={updateImage}>Update Image</button>
        </div>

        <div className="desc-update">
          <h2>
            <span>About me</span>
            <button className="button" onClick={handleEdit}>
              {edit ? "Undo" : "Edit"}
            </button>
          </h2>
          <div className="text-area">
            <textarea
              name=""
              id=""
              value={curAbout}
              onChange={(e) => setCurAbout(e.target.value)}
              disabled={!edit}
            ></textarea>
            <button className="button" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
