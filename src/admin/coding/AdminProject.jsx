import React, { useEffect, useState } from "react";
import "./AdminProject.scss";
import SideBar from "../sidebar/SideBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setProject } from "../../redux/user";

const Skill = ({ item, Delete }) => {
  return (
    <div className="skill-item">
      <img src={item.image.url} loading="lazy" alt="" />
      <div className="skill-name">{item.name}</div>
      <a className="skill-name" href={item.projectLink}>
        Website Url
      </a>
      <div>
        <EditIcon />
        <DeleteIcon onClick={() => Delete(item._id)} />
      </div>
    </div>
  );
};
const Techitem = ({ name, removeItem }) => {
  return (
    <div className="tech-item" onClick={() => removeItem(name)}>
      {name}
    </div>
  );
};

export default function AdminSkill() {
  const [show, setShow] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [tech, setTech] = useState("");
  const [data, setData] = useState({});
  const [image, setImage] = useState({});
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(false);
  const { baseUrl, project } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addTechnology = () => {
    if (tech.length <= 0) return;
    setTechnologies((a) => [...a, tech]);
    setTech("");
  };
  const removeItem = (item) => {
    const newArray = technologies.filter((a) => a !== item);
    console.log(newArray);
    setTechnologies(newArray);
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {          
        setVideo({ video: reader.result });
      }
    };
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage({ image: reader.result });
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data: res } = await axios.post(
        `${baseUrl}/project/add`,
        {
          ...data,
          technology: technologies,
          image: image.image,
          video: video.video,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);
      toast(res.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const deleteProject = async (id) => {
    setLoading(true);
    try {
      const { data: res } = await axios.delete(
        `${baseUrl}/project/delete/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);
      setLoading(false);
      toast(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  //loading sahi karo kyuki jab bhi kuch update kare toh updated list dikhna chahiye
  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(`${baseUrl}/project/all`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setLoading(false);
        dispatch(setProject(res.projects));
        // console.log(res.projects);
        toast(res.message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    };
    fetcher();
  }, [loading]);

  return (
    <div className="admin adminProject">
      <SideBar />
      <div className="main-container">
        <h1>Project Page</h1>

        <div className="desc-update">
          <div className="skill-details">
            <div>Image</div>
            <div>Project Name</div>
            <div>Project Link</div>
            <div>Update / Delete</div>
          </div>
          <section className="admin-item-container">
            {project.map((item, i) => {
              return <Skill item={item} Delete={deleteProject} key={i} />;
            })}
          </section>
          <section className="add-item">
            {show ? (
              <>
                <ExpandMoreIcon onClick={() => setShow(!show)} />
                <div className="add-item-layout">
                  <div className="skill-item file">
                    <label htmlFor="Logo">Website Image:</label>
                    <input
                      type="file"
                      name="Logo"
                      id=""
                      onChange={handleImage}
                    />
                  </div>
                  <div className="skill-item file">
                    <label htmlFor="Logo">Website Video:</label>
                    <input
                      type="file"
                      name="Logo"
                      id=""
                      onChange={handleVideo}
                    />
                  </div>
                  <div className="skill-item">
                    <label htmlFor="title">Project Name:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="title"
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="skill-item">
                    <label htmlFor="title">Project Link:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="title"
                      onChange={(e) =>
                        setData({ ...data, projectLink: e.target.value })
                      }
                    />
                  </div>
                  <div className="skill-item">
                    <label htmlFor="title">Project Description:</label>
                    <textarea
                      type="text"
                      name="title"
                      id="title"
                      className="title"
                      onChange={(e) =>
                        setData({ ...data, desc: e.target.value })
                      }
                    />
                  </div>
                  <div className="skill-item technologies" id="technologies">
                    <div className="title-tech">Technologies Used:</div>
                    <div className="tech">
                      {technologies.map((item, i) => {
                        return (
                          <Techitem
                            name={item}
                            key={i}
                            removeItem={removeItem}
                          />
                        );
                      })}
                    </div>
                    <div className="add-tech">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="title"
                        placeholder="Write technologies"
                        onChange={(e) => setTech(e.target.value)}
                        value={tech}
                      />
                      <button className="button" onClick={addTechnology}>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <button className="button projectButton" onClick={handleSubmit}>
                  Submit
                </button>
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
