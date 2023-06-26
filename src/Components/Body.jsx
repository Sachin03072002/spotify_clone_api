import React, { useEffect } from "react";
import { useStateProvider } from "../utlis/stateProvided";
import axios from "axios";
import { reducerCases } from "../utlis/Constants";

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map((item) => ({
            id: item.track.id,
            name: item.track.name,
            artists: item.track.artists.map((artist) => artist.name),
            image: item.track.album.images[2].url,
            duration: item.track.duration_ms,
            album: item.track.album.name,
            context_uri: item.track.album.uri,
            track_number: item.track.track_number,
          })),
        };

        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      } catch (error) {
        console.error("Error fetching initial playlist:", error);
      }
    };

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  };

  const playTrack = async (id, name, artists, context_uri, track_number) => {
    try {
      const response = await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        const currentlyPlaying = {
          id,
          name,
          artists,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      } else {
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
      }
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  const containerStyle = {
    // Add your styles for the container here
  };

  const playlistStyle = {
    // Add your styles for the playlist container here
    margin: "0 2rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const imageStyle = {
    // Add your styles for the playlist image here
    height: "15rem",
    boxShadow: "rgba(0,0,0,0.25) 0px 25px 50px -12px",
  };

  const detailsStyle = {
    // Add your styles for the playlist details here
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    color: "#e0ded0",
  };

  const titleStyle = {
    color: "white",
    fontSize: "4rem",
  };

  const listStyle = {
    // Add your styles for the track list container here
  };

  const headerRowStyle = {
    // Add your styles for the header row here
    display: "grid",
    gridTemplateColumns: "0.3fr 3fr 2fr 0.1fr",
    color: "#dddcdc",
    margin: "1rem 0 0 0",
    position: "sticky",
    top: "15vh",
    padding: "1rem 3rem",
    transition: "0.3s ease-in-out",
    backgroundColor: headerBackground ? "#000000dc" : "transparent",
  };

  const colStyle = {
    // Add your styles for the columns here
    display: "flex",
    alignItems: "center",
    color: "#dddcdc",
  };

  const tracksStyle = {
    // Add your styles for the tracks container here
    margin: "0 2rem",
    display: "flex",
    flexDirection: "column",
    marginBottom: "5rem",
  };

  const rowStyle = {
    // Add your styles for the track row here
    padding: "1rem 0rem",
    display: "grid",
    gridTemplateColumns: "0.3fr auto 3.1fr 1.9fr 0.1fr", // Updated column template
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.7)",
    },
  };

  const imageColumnStyle = {
    height: "40px",
  };

  const detailStyle = {
    // Add your styles for the track detail column here
    display: "flex",
    gap: "1rem",
    marginLeft: "1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  };

  const infoStyle = {
    // Add your styles for the track info container here
    display: "flex",
    flexDirection: "column",
    color: "white",
  };

  const nameStyle = {
    // Add your styles for the track name here
  };

  return (
    <div style={containerStyle}>
      {selectedPlaylist && (
        <>
          <div className="playlist" style={playlistStyle}>
            <div className="image">
              <img
                src={selectedPlaylist.image}
                alt="selectedPlaylist"
                style={imageStyle}
              />
            </div>
            <div className="details" style={detailsStyle}>
              <span className="type">PLAYLIST</span>
              <h1 className="title" style={titleStyle}>
                {selectedPlaylist.name}
              </h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list" style={listStyle}>
            <div className="header__row" style={headerRowStyle}>
              <div className="col" style={colStyle}>
                <span>#</span>
              </div>
              <div className="col" style={colStyle}>
                <span>TITLE</span>
              </div>
              <div className="col" style={colStyle}>
                <span>ALBUM</span>
              </div>
              <div className="col" style={colStyle}>
                <span>
                  <i className="fa-solid fa-clock"></i>
                </span>
              </div>
            </div>
            <div className="tracks" style={tracksStyle}>
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => (
                  <div
                    key={id}
                    className="row"
                    style={rowStyle}
                    onClick={() =>
                      playTrack(id, name, artists, context_uri, track_number)
                    }
                  >
                    <div className="col" style={colStyle}>
                      <span className="count">{index + 1}</span>
                    </div>
                    <div className="col" style={imageColumnStyle}>
                      <img src={image} alt="track" />
                    </div>
                    <div className="col" style={detailStyle}>
                      <div className="info" style={infoStyle}>
                        <span className="name" style={nameStyle}>
                          {name}
                        </span>
                        <span className="artist">{artists.join(", ")}</span>
                      </div>
                    </div>
                    <div className="col" style={colStyle}>
                      <span className="album">{album}</span>
                    </div>
                    <div className="col" style={colStyle}>
                      <span className="duration">
                        {msToMinutesAndSeconds(duration)}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
