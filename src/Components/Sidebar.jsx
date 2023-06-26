import React from "react";
import Playlist from "./Playlist";

export default function Sidebar() {
  const container = {
    backgroundColor: "black",
    height: "100%",
    color: "#b3b3b3",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };
  const top__links = {
    display: "flex",
    flexDirection: "column",
  };
  const logo = {
    textAlign: "center",
    margin: "1rem 0",
  };
  const imgStyle = {
    maxInlineSize: "80%",
    blockSize: "auto",
  };
  const ul = {
    listStyleType: "none",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
  };
  const li = {
    display: "flex",
    gap: "1rem",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
    "&:hover": {
      color: "white",
    },
  };
  return (
    <div>
      <div className="container" style={container}>
        <div className="top__links" style={top__links}>
          <div className="logo" style={logo}>
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
              alt="spotify"
              style={imgStyle}
            />
          </div>
          <ul style={ul}>
            <li style={li}>
              <span>
                <i className="fa-solid fa-house"></i>Home
              </span>
            </li>
            <li>
              <i className="fa-solid fa-magnifying-glass"></i>Search
              <span></span>
            </li>
            <li>
              <i className="fa-solid fa-bookmark"></i>Your Library
              <span></span>
            </li>
          </ul>
        </div>
        <Playlist />
      </div>
    </div>
  );
}
