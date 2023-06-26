import React from "react";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import VolumeControls from "./VolumeControls";

export default function Footer() {
  const container = {
    backgroundColor: "#181818",
    height: "15vh",
    width: "100%",
    borderTop: "1px solid #282828",
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1rem",
  };
  return (
    <div>
      <div className="container" style={container}>
        <CurrentTrack />
        <PlayerControls />
        <VolumeControls />
      </div>
    </div>
  );
}
