import React from "react";

export default function Login() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#1db954",
    gap: "5rem",
  };

  const imgStyle = {
    height: "20vh",
  };

  const buttonStyle = {
    padding: "1rem 5rem",
    borderRadius: "5rem",
    border: "none",
    backgroundColor: "black",
    color: "#49f585",
    fontSize: "1.4rem",
    cursor: "pointer",
  };

  const handleClick = () => {
    // Handle button click
    const clientId = "599e29046c6a4ff6a00b1f684bef3d0b";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  };

  return (
    <div>
      <div style={containerStyle}>
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
          alt="spotify"
          style={imgStyle}
        />
        <button onClick={handleClick} style={buttonStyle}>
          Connect Spotify
        </button>
      </div>
    </div>
  );
}
