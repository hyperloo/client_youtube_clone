import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui container grid">
      <div className="sixteen wide mobile column eight wide tablet column eight wide computer column left floated left aligned column">
        <Link
          to="/"
          className="ui inverted red button"
          style={{
            borderRadius: "40px",
            fontFamily: "'Monoton', cursive",
            fontWeight: "bolder",
            fontSize: "18px",
            display: "inline-flex",
            marginTop: "10px",
          }}
        >
          <div>
            <img
              src="https://img.icons8.com/bubbles/50/000000/video-playlist.png"
              alt="logo"
            />
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "center",
              minHeight: "100%",
              paddingTop: "15px",
            }}
          >
            > Hi-Tube
          </div>
        </Link>
      </div>
      <div className="sixteen wide mobile column eight wide tablet column eight wide computer column right floated right aligned column">
        <div className="right floated right aligned column">
          <div className="" style={{ paddingTop: "5px" }}>
            <a
              href="http://tekhin2.tk"
              className="ui inverted secondary button"
              style={{
                margin: "0px",
                fontFamily: "'Tomorrow', sans-serif",
                fontSize: "17px",
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
    </div>
  );
};

export default Header;
