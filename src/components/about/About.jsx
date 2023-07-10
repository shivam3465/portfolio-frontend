import React, { useEffect, useState } from "react";
import "./about.scss";
import { useSelector } from "react-redux";

export default function About() {
  const [showAnimation, setShowAnimation] = useState(false);
  const { user } = useSelector((state) => state.user);
  const handleScroll = () => {
    // console.log(window.scrollY);
    // if(window.scrollY >800 && window.scrollY<=876) console.log("inside about page");
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="about"
      onMouseEnter={() => setShowAnimation((e) => true)}
      onMouseLeave={() => setShowAnimation((e) => false)}
    >
      <div id="about-container">
        <div id="image-container">
          <img src={user?.aboutPic?.url} alt="" />
        </div>
        <h1>About Me</h1>
        <div id="about-content">{user.aboutMe}</div>
      </div>
    </div>
  );
}
