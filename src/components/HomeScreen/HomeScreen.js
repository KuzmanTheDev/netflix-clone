import React, { useState } from "react";
import Nav from "../Navbar/Nav";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import requests from "../../tmdbAPI/requests";
import "./HomeScreen.css";

function HomeScreen() {
  return (
    <div>
      <Nav />
      <Banner
        name="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row
        name="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row name="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row name="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row name="Action" fetchUrl={requests.fetchActionMovies} />
      <Row name="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row name="Horror" fetchUrl={requests.fetchHorrorMovies} />
      <Row name="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row name="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <footer>
        Netflix Clone made by Kuzman<span style={{ color: "red" }}>.</span>
      </footer>
    </div>
  );
}

export default HomeScreen;
