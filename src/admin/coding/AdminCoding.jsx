import React, { useEffect, useState } from "react";
import "./AdminCoding.scss";
import SideBar from "../sidebar/SideBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCoding } from "../../redux/user";

const Skill = ({item,deleteCoding}) => {  
  console.log(item.profileLink)
  return (
    <div className="skill-item">
      <img src={item.image.image_url} alt="" loading="lazy" />
      <div className="skill-name">{item.name}</div>
      <a className="skill-name" href={item.profileLink}>
        Profile Link
      </a>
      <div>
        <EditIcon />
        <DeleteIcon onClick={()=>deleteCoding(item._id)}/>
      </div>
    </div>
  );
};

export default function AdminSkill() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const { baseUrl ,coding} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2){        
        setImage({ img: reader.result });
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: res } = await axios.post(
        `${baseUrl}/coding/add`,
        { name, profileLink: link, image: image.img },
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
        `${baseUrl}/coding/delete/${id}`,
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
        const { data: res } = await axios.get(`${baseUrl}/coding/all`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setLoading(false);
        dispatch(setCoding(res.codingProfiles));
        // console.log(res.codingProfiles);
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
    <div className="admin adminCoding">
      <SideBar />
      <div className="main-container">
        <h1>Coding Profile Page</h1>

        <div className="desc-update">
          <div className="skill-details">
            <div>Logo</div>
            <div>Website Name</div>
            <div>Profile Link</div>
            <div>Update / Delete</div>
          </div>
          <section className="admin-item-container">
            {
              coding.map((item,i)=>{
                return <Skill item={item} key={i} deleteCoding={deleteSkill}/>
              })
            }
          </section>
          <section className="add-item">
            {show ? (
              <>
                <ExpandMoreIcon onClick={() => setShow(!show)} />
                <div className="add-item-layout">
                  <div className="skill-item file">
                    <label htmlFor="Logo">Website Logo:</label>
                    <input
                      type="file"
                      name="Logo"
                      id=""
                      onChange={handleImage}
                    />
                  </div>
                  <div className="skill-item">
                    <label
                      htmlFor="title"
                      onChange={(e) => setName(e.target.value)}
                    >
                      Website Name:
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="title"
                      onChange={(e)=> setName(e.target.value)}
                    />
                  </div>
                  <div className="skill-item">
                    <label htmlFor="title">Profile Link:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="title"
                      onChange={(e) => setLink(e.target.value)}
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
