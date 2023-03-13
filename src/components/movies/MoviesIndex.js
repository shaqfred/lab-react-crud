import { getAllMovies } from "../../api/fetch";
import { useState, useEffect } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import { MovieListing } from "./MovieListing.js";
import { Link } from "react-router-dom";
import "./MoviesIndex.css";

export default function MoviesIndex() {
  function filterMovies(search, movies) {
    return movies.filter((movie) => {
      return movie.title.toLowerCase().includes(search.toLowerCase());
    });

    const [error, setError] = useState(false);
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [allMovies, setAllMovies] = useState([]);

    function handleTextChange(event) {
      setSearchTitle(event.target.value);
      const result = event.target.value.length
        ? filterMovies(event.target.value, allMovies)
        : allMovies;
      setMovies(result);
    }
  }
  useEffect(() => {
    getAllMovies()
      .then((response) => {
        setAllMovies(response);
        setMovies(response);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  return (
    <div>
      {error ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/movies/new">Add a new movie</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Movies:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="shows-index">
            {movies.map((movie) => {
              return <MovieListing movie={movie} key={movie.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
