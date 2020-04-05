import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu" style={{ padding: "15px" }}>
      <div
        className="ui inverted red button"
        style={{
          borderRadius: "40px",
          fontFamily: "'Monoton', cursive",
          fontWeight: "bolder",
          fontSize: "18px"
        }}
      >
        <Link
          to="/"
          className="item"
          style={{ padding: "0px", color: "inherit" }}
        >
          <img
            src="https://img.icons8.com/bubbles/50/000000/video-playlist.png"
            alt="logo"
          />
          > Hi-Tube
        </Link>
      </div>

      <div className="right menu">
        <div className="" style={{ paddingTop: "22px" }}>
          <a
            href="http://tekhin2.tk"
            className="ui inverted secondary button"
            style={{
              margin: "0px",
              fontFamily: "'Tomorrow', sans-serif",
              fontSize: "17px"
            }}
          >
            My Portfolio
          </a>
        </div>
        <Link to="/" className="item">
          {" "}
          {/*As the sing IN/Out but clicked, it navigates to "/" i.e. home 
        from any location */}
          <GoogleAuth />
        </Link>
      </div>
    </div>
  );
};

export default Header;
