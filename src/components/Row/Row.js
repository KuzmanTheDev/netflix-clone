import React, { useEffect, useState } from "react";
import axios from "../../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Modal from "../Modal/Modal";
import "./Row.css";

function Row({ name, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerPath, setTrailerPath] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [original_title, setOriginal_title] = useState("");
  const [show, setShow] = useState(false);

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "190",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1,
    },
  };
  const handleClick = (movie) => {
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
          // setDescription(movie?.overview);
          setTitle(movie?.name || movie?.title);
          setOriginal_title(movie?.original_name);
          setShow(true);
        })
        .catch((err) => {
          handleError();
          console.log(err);
        });
    } else {
      setTrailerPath("");
      setDescription("");
      setTitle("");
      setOriginal_title("");
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
  return (
    <main>
      <div className="row">
        <h2>{name}</h2>
        <div className="row_posters">
          {movies.map((movie) => {
            return (
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  src={`${baseUrl}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
            );
          })}
        </div>
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
      </div>
    </main>
  );
}

export const handleError = function () {
  const html = `
    <div class="error">
        <div class="error__text">
            <p class="error__heading">Error:</p>
            <p class="error__description">Can't find trailer, please try another title!</p>
        </div>
    </div>
    `;
  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", html);
  const error = body.querySelector(".error");
  error.classList.add("fade-in");

  setTimeout(function () {
    // error.classList.remove('fade-in');
    error.classList.add("fade-out");
    setTimeout(function () {
      error.remove();
    }, 500);
  }, 2500);
};

export default Row;
