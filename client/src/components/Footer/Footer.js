import React from "react";
import "./Footer.css";
import { AiFillGithub } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

function Footer() {
  return (
    <div className="footer">
      <div className="flex">
        aldinhalilovic06@gmail.com <br />
        +381 621690207
      </div>

      <div>
        <div className="align">
          Made and Designed by <br /> Aldin Halilovic ©<br />{" "}
        </div>
        <div className="flex">
          <div
            style={{
              fontSize: "24px",
            }}
          >
            <a
              href="https://github.com/aldinhalilovic"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <AiFillGithub />
            </a>
            <a
              href="https://instagram.com/hallilovic.a"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <AiFillInstagram />
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "200px",
        }}
      ></div>
    </div>
  );
}

export default Footer;
