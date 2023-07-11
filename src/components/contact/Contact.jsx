import React, { useState } from "react";
import "./contact.scss";
import LinkedIn from "@mui/icons-material/LinkedIn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AccountIcon = ({ show }) => {
  return (
    <Link to={"https://www.linkedin.com/in/shivam-kumar-187936210/"}>
      <LinkedIn
        style={{
          animation: `${show ? "popup" : "popin"} 1s ease-in-out forwards`,
        }}
      />
    </Link>
  );
};

export default function Contact() {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({});
  const baseUrl="https://portfolio-backend-eight-zeta.vercel.app/api/v1";

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(
        `${baseUrl}/contact`,
        { ...info },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(res);
      toast(res.message)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact" id="contact">
      <form className="form-container">
        <div className="form">
          <h1>Contact Me</h1>
          <div className="form-item">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              id="name"
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
          </div>
          <div className="form-item">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter your Email"
              id="email"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </div>
          <div className="form-item">
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Enter your message"
              onChange={(e) => setInfo({ ...info, message: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" onClick={sendMail}>
            Send
          </button>
        </div>

        <div id="slider">
          <div
            id="slider-container"
            style={{
              animation: `${
                show ? "open" : "close"
              } 700ms ease-in-out forwards`,
            }}
          >
            <AccountIcon show={show} />            
          </div>
          <div id="navigate" onClick={() => setShow(!show)}>
            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </div>
      </form>
    </div>
  );
}
