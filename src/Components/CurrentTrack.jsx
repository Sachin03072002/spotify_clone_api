import React, { useEffect } from "react";
import { useStateProvider } from "../utlis/stateProvided";
import axios from "axios";
import { reducerCases } from "../utlis/Constants";
export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data !== "") {
          const { item } = response.data;
          const currentlyPlaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url,
          };
          const id = item.id;
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
          dispatch({
            type: reducerCases.SET_TRACK_PLAYING_ID,
            trackPlayingId: id,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getCurrentTrack();
  }, [token, dispatch, currentlyPlaying]);
  const container = {};
  const track = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };
  const track__info = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };
  const h4 = {
    color: "white",
  };
  const h6 = {
    color: "#b3b3b3",
  };
  return (
    <div style={container}>
      {currentlyPlaying && (
        <div className="track" style={track}>
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track__info" style={track__info}>
            <h4 style={h4}>{currentlyPlaying.name}</h4>
            <h6 style={h6}>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </div>
  );
}
