import React, { useState, useEffect } from "react";
import { getMovies, getGenres } from "../../utils/utilities";
import "./style.css";
import SearchBar from "./search";

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showAllGenres, setShowAllGenres] = useState(false);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async (genreId) => {
    try {
      const fetchedMovies = await getMovies(genreId);
      setMovies(fetchedMovies.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const fetchedGenres = await getGenres();
      setGenres(fetchedGenres.genres);
    } catch (error) {
      console.error("Error fetching genres:", error.message);
    }
  };

  const handleSearchFunction = async (searchValue) => {
    setLoading(true);
    if (!searchValue.trim()) {
      fetchMovies(selectedGenre); // Pass the selected genre to fetchMovies
    } else {
      try {
        const response = await fetch(
          `${BASE_URL}/3/search/movie?query=${searchValue}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        setMovies(result.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setLoading(false);
      }
    }
  };

  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId); // Set the selected genre
    setLoading(true);
    fetchMovies(genreId); // Fetch movies for the selected genre
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const limitedGenres = showAllGenres ? genres : genres.slice(0, 10);

  return (
    <div>
      <SearchBar onSearch={handleSearchFunction} />
      
      <div className="genreNavbar">
        {limitedGenres.map((genre) => (
          <div
            key={genre.id}
            className={`genreNavItem ${genre.id === selectedGenre ? "active" : ""}`}
            onClick={() => handleGenreChange(genre.id)} // Pass genre.id as the argument
          >
            {genre.name}
          </div>
        ))}
        {!showAllGenres && (
          <div className="dots">
            <span className="dot" onClick={() => setShowAllGenres(true)}></span>
          </div>
        )}
      </div>

      <div className="imageContainer">
        {movies && movies.length > 0 && movies.map((item) => (
          <div key={item.id} className="images">
            <img
              src={`${IMAGE_BASE_URL}${item.poster_path}`}
              alt={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;