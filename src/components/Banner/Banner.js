import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "../../axios";
import handleError from "../Row/Row";
import requests from "../../tmdbAPI/requests";
import Modal from "../Modal/Modal";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerPath, setTrailerPath] = useState("");
  const [title, setTitle] = useState("");
  const [original_title, setOriginal_title] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
    // console.log(movie);
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1,
    },
  };
  const handleClick = () => {
    if (trailerPath === "") {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movie?.original_title
      )
        .then((res) => {
          console.log(res);
          const path = res.split("?v=")[1];
          setTrailerPath(path);
          setTitle(movie?.name || movie?.title);
          setOriginal_title(movie?.original_name);
          setShow(true);
        })
        .catch((err) => {
          handleError();
          console.log(err);
        });
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  };
  const trailerPop_up = (
    <div className="info__overlay--videoBox">
      <YouTube
        className="info__overlay--youtube"
        videoId={trailerPath}
        opts={opts}
      />
    </div>
  );
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="banner__description">{truncate(movie?.overview, 200)}</p>
        <div className="banner__buttons">
          <button
            className="banner__button--play"
            onClick={() => handleClick(movie)}
          >
            <i className="banner__button--icon fas fa-play"></i>
            <span>Play</span>
          </button>
          <button className="banner__button">My list</button>
        </div>
      </div>

      <div className="banner__fadeButton"></div>
      {trailerPath && (
        <Modal visibility={show}>
          <span
            onClick={() => handleClick(null)}
            className="info__overlay--btnClose fa-stack fa-2x"
          >
            <i className="fas fa-circle fa-stack-2x icon-black"></i>
            <i className="fas fa-times fa-stack-1x icon-white"></i>
          </span>
          {trailerPop_up}
        </Modal>
      )}
    </header>
  );
}

export default Banner;
