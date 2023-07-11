import React from "react";
import "./projects.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Project = ({ project }) => {
  return (
    <div className="project-item">
      <Link to={`/project/${project?._id}`}>
        <div className="project-image">
          <img src={project?.image?.url} alt="" />
        </div>
      </Link>
      <div className="project-title">
        <span className="project-name">{project?.name}</span>
        <Link to={project?.projectLink} target="_blank">
          Project Link
        </Link>
      </div>
    </div>
  );
};
export default function Projects() {
  const { project } = useSelector((state) => state.user);

  return;
  project ? (
    <div id="projects">
      <div id="project-container">
        <div className="project-item">
          <h1>PROJECTS</h1>
          <div>
            These are the projects on which I have worked on.And website links
            to all the projects are also given as well as Demo videos of each
            projects is also given.
          </div>
          <button>
            <Link to={"/project"}>View all</Link>
          </button>
        </div>
        {project.length && <Project project={project[0]} />}
        {project.length && <Project project={project[1]} />}
        {project.length && <Project project={project[2]} />}
      </div>
    </div>
  ) : (
    <></>
  );
}
