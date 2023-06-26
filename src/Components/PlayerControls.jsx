import React from "react";
import { useStateProvider } from "../utlis/stateProvided";
import axios from "axios";
import { reducerCases } from "../utlis/Constants";
import Track from "./Track";

export default function PlayerControls() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const changeTrack = async (type) => {
    await axios(
      `https://api.spotify.com/v1/me/player/next`,
      {
        method: "POST",
      },
      {
        header: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        if (responseData && responseData.item) {
          const { item } = responseData;
          const currentlyPlaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
          dispatch({
            type: reducerCases.SET_TRACK_PLAYING_ID,
            trackPlayingId: item.id,
          });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
        }
      } else {
        // Handle the case when the response is not successful
        console.log("Error: Unable to fetch currently playing track.");
      }
    } catch (error) {
      // Handle any other errors that occur during the fetch request
      console.log("Error: ", error);
    }
  };

  // console.log(id);
  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };
  const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
  };

  const svg = {
    color: "#b3b3b3",
    transition: "0.2s ease-in-out",
    "&:hover": {
      color: "white",
    },
  };

  const svgState = {
    color: "white",
  };

  const icon = {
    fontSize: "1rem",
  };
  const parentContainer = {};

  return (
    <div style={parentContainer}>
      <div style={container}>
        <div className="shuffle">
          <i className="fa-solid fa-shuffle" style={svg}></i>
        </div>
        <div className="previous">
          <i
            className="fa-solid fa-backward-step"
            style={svg}
            onClick={() => changeTrack("previous")}
          ></i>
        </div>
        <div className="state" style={icon}>
          {playerState ? (
            <i
              className="fa-solid fa-pause"
              style={svgState}
              onClick={changeState}
            ></i>
          ) : (
            <i
              className="fa-solid fa-play"
              style={svgState}
              onClick={changeState}
            ></i>
          )}
        </div>
        <div className="next">
          <i
            className="fa-solid fa-forward-step"
            style={svg}
            onClick={() => changeTrack("next")}
          ></i>
        </div>
        <div className="repeat">
          <i className="fa-solid fa-repeat" style={icon}></i>
        </div>
      </div>
      <div>
        <Track />
      </div>
    </div>
  );
}
