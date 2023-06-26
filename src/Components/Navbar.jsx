import React from "react";
import { useStateProvider } from "../utlis/stateProvided";

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: "2rem",
    height: "15vh",
    position: "sticky",
    top: "0",
    transition: "0.3s ease-in-out",
    backgroundColor: navBackground ? "rgba(0, 0, 0, 0.7)" : "transparent",
  };

  const search__bar = {
    backgroundColor: "white",
    width: "30%",
    padding: "0.4rem 1rem",
    borderRadius: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const inputStyle = {
    border: "none",
    height: "2rem",
    width: "100%",
    outline: "none",
  };

  const avatar = {
    backgroundColor: "black",
    padding: "0.3rem 0.4rem",
    paddingRight: "1rem",
    borderRadius: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const linkStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  };

  const svgStyle = {
    fontSize: "1.3rem",
    backgroundColor: "#282828",
    padding: "0.2rem",
    borderRadius: "1rem",
    color: "#c7c5c5",
  };

  return (
    <div style={containerStyle}>
      <div className="search__bar" style={search__bar}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Artists, Songs, or Podcasts"
          style={inputStyle}
        />
      </div>
      <div className="avatar" style={avatar}>
        <a href="/" style={linkStyle}>
          <i className="fa-regular fa-circle-user" style={svgStyle}></i>
          <span>{userInfo.userName}</span>
        </a>
      </div>
    </div>
  );
}
