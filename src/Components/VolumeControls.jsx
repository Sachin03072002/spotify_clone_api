import React from "react";
import { useStateProvider } from "../utlis/stateProvided";
import axios from "axios";

export default function VolumeControls() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const input = {
    width: "15rem",
    borderRadius: "2rem",
    height: "0.5rem",
  };
  return (
    <div style={container}>
      <input
        type="range"
        min={0}
        max={100}
        onMouseUp={(e) => setVolume(e)}
        style={input}
      />
    </div>
  );
}
