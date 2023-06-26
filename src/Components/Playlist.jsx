import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utlis/stateProvided";
import { reducerCases } from "../utlis/Constants";

function Playlist() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const { items } = response.data;
        const playlists = items.map(({ name, id }) => {
          return { name, id };
        });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });

        // Handle the response data as needed
        // if (response.status === 200) {
        //   const data = response.data;
        //   console.log(data);
        // } else {
        //   console.error("Request failed with status:", response.status);
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getPlaylistData();
  }, [token, dispatch]);
  const chnageCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
  const container = {
    height: "100%",
    overflow: "hidden",
  };
  const ul = {
    listStyleType: "none",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    height: "52vh",
    maxHeight: "100%",
    overflow: "auto",
    "&::webkitScrollbar": {
      width: "0.7rem",
      "&-thumb": {
        backgroundColor: "rgba(255,255,255,0.6)",
      },
    },
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
    <div style={container}>
      <ul style={ul}>
        {playlists.map(({ name, id }) => {
          return (
            <li key={id} style={li} onClick={() => chnageCurrentPlaylist(id)}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Playlist;
