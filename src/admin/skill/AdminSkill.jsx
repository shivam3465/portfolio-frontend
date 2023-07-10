import React, { useEffect, useState } from "react";
import "./AdminSkill.scss";
import SideBar from "../sidebar/SideBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSkills } from "../../redux/user";
const skillLogo = "https://www.w3.org/html/logo/downloads/HTML5_Badge_512.png";

const Skill = ({ skill ,deleteSkill}) => {
  const imgUrl = skill.image.image_url;    
  return (
    <div className="skill-item">
      <img src={imgUrl} alt="" />
      <div className="skill-name">{skill.name}</div>
      <div>
        <EditIcon />
        <DeleteIcon onClick={()=>deleteSkill(skill._id)}/>
      </div>
    </div>
  );
};

export default function AdminSkill() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { baseUrl, skills } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage({ img: reader.result });
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(
        `${baseUrl}/skill/add`,
        {
          name,
          image: image.img,
        },
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

  const deleteSkill = async (id) => {    
    try {
      const { data: res } = await axios.delete(
        `${baseUrl}/skill/delete/${id}`,       
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
    const fetcher = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(`${baseUrl}/skill/all`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setLoading(false);
        dispatch(setSkills(res.skills));
        // console.log(res);
        toast(res.message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    };
    fetcher();
  }, []);

  return (
    <div className="admin adminSkill">
      <SideBar />
      <div className="main-container">
        <h1>SKills Page</h1>

        <div className="desc-update">
          <div className="skill-details">
            <div>Logo</div>
            <div>Skill Name</div>
            <div>Update / Delete</div>
          </div>
          <section className="admin-item-container">
            {!loading &&
              skills.map((skill, i) => {
                return <Skill skill={skill} key={i} deleteSkill={deleteSkill}/>;
              })}
          </section>
          <section className="add-item">
            {show ? (
              <>
                <ExpandMoreIcon onClick={() => setShow(!show)} />
                <div className="add-item-layout">
                  <div className="skill-item">
                    <label htmlFor="Logo">Skill Logo:</label>
                    <input
                      type="file"
                      name="Logo"
                      id=""
                      onChange={handleImage}
                    />
                  </div>
                  <div className="skill-item">
                    <label htmlFor="title">Skill Name:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="title"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <button className="button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <button className="button add" onClick={() => setShow(!show)}>
                Add &nbsp; <AddIcon />
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
