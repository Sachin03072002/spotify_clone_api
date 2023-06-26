import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import axios from "axios";
import { useStateProvider } from "../utlis/stateProvided";
import { reducerCases } from "../utlis/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScrolled = () => {
    console.log("scrollTop:", bodyRef.current.scrollTop);

    if (bodyRef.current.scrollTop >= 20) {
      console.log("Setting navBackground to true");
      setNavBackground(true);
    } else {
      console.log("Setting navBackground to false");
      setNavBackground(false);
    }

    if (bodyRef.current.scrollTop >= 268) {
      console.log("Setting headerBackground to true");
      setHeaderBackground(true);
    } else {
      console.log("Setting headerBackground to false");
      setHeaderBackground(false);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  const containerStyle = {
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: "85vh 15vh",
  };

  const spotifyBodyStyle = {
    display: "grid",
    gridTemplateColumns: "15vw 85vw",
    height: "100%",
    width: "100%",
    background: "linear-gradient(transparent, rgba(0, 0, 1))",
    backgroundColor: "rgba(32, 87, 100)",
  };

  const bodyStyle = {
    overflow: "auto",
    height: "100%",
    width: "100%",
    "&::webkitScrollbar": {
      width: "0.7rem",
      "&-thumb": {
        backgroundColor: "rgba(255,255,255,0.6)",
      },
    },
  };

  const bodyContentsStyle = {};

  const spotifyFooterStyle = {};

  return (
    <div style={containerStyle}>
      <div className="spotifyBody" style={spotifyBodyStyle}>
        <Sidebar />
        <div
          className="body"
          style={bodyStyle}
          ref={bodyRef}
          onScroll={bodyScrolled}
        >
          <Navbar navBackground={navBackground} />
          <div className="bodyContents" style={bodyContentsStyle}>
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotifyFooter" style={spotifyFooterStyle}>
        <Footer />
      </div>
    </div>
  );
}
