import React, { useEffect } from "react";
import { useStateProvider } from "../utlis/stateProvided";

export default function Track() {
  const [{ token, trackPlayingId }, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${trackPlayingId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTrack();
  }, [token, trackPlayingId]);

  const track = {
    width: "80%",
    height: "2rem",
  };

  return (
    <div>
      <input type="range" min={0} max={100} style={track} />
    </div>
  );
}
