import React, { useEffect, useState } from "react";
import "./featured.scss";
import cubeImage from "../../assests/cube.webp";
import circleImage from "../../assests/circle.webp";
import { TypeAnimation } from "react-type-animation";
import { useSelector } from "react-redux";

export default function Featured() {
  const {user}=useSelector(state=>state.user);   
  return (
    <section id="featured">
      <div className="left">
        <div
          style={{
            color: "rgba(182, 241, 245, 0.82)",
            fontSize: "3rem",
            fontWeight: "700",
            textShadow: "0 0 0.1rem rgb(203, 247, 238)",
          }}
        >
          HELLO!
        </div>
        <div id="featured-title">
          I am &nbsp;          
          <span>
            <TypeAnimation
              sequence={[
                1600,
                "SHIVAM KUMAR",
                4000,
                "a Learner",
                4000,
                "a MERN stack developer",
                4000,
                "a Competitive Programmer",
                4000,
              ]}
              speed={1}
              repeat={Infinity}
              wrapper="span"
            />
          </span>
        </div>        
        <div id="featured-desc">
          {user.desc}
        </div>
        <div>
          <a href={"#contact"}>
            <button id="contact-button">Contact Me</button>
          </a>
          <a href={"#projects"}>
            <button>View Work</button>
          </a>
        </div>
      </div>
      <div className="right">
        <div>
          <img src={cubeImage} alt="" /> <span></span>
        </div>
        <img src={circleImage} alt="" />
      </div>
    </section>
  );
}
