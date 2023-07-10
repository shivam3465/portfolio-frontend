import React from "react";
import "./details.scss";
import { Link, useParams } from "react-router-dom";
import Header from "../header/Header";
import { useSelector } from "react-redux";

const Tech = ({ name }) => {
  return <div className="tech">{name}</div>;
};

export default function ProjectDetails() {
  const { id } = useParams();
  const { project } = useSelector((state) => state.user);
  const Project = project.find((item, i) => {
    return item._id === id;
  });

  return Project ? (
    <div id="details">
      <Header />
      <h1>{Project.name}</h1>
      <section>
        <div id="video-container">
          <video src={Project.video.url} loading="lazy" controls></video>
          <Link to={Project.projectLink}>Project Link</Link>
        </div>
        <div id="content">
          <h2>Project Description</h2>
          <div id="tech">
            <div>TechStack Used:</div>
            <div>
              {Project.technology.map((item, i) => {
                return <Tech name={item} key={i} />;
              })}
            </div>
          </div>
          <div id="proj-desc">
            <span>Description:</span>
            <span>{Project.desc}</span>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <></>
  );
}
