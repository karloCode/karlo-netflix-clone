import React, { useEffect, useState } from "react";
import "./styles/banner.css";
import axios from "../axios";
import requests from "../request";

const base_url = "https://image.tmdb.org/t/p/original";

function Banner({ title }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
        console.log(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">{truncate(movie?.overview, 500)}</h1>
      </div>
      <div className="banner_fadeBottom"></div>
    </header>
  );
}

export default Banner;
