import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getFilmByQuery } from "../../films-api.js";
import MovieList from "../../components/MovieList/MovieList.jsx";

import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filmByQuery, setFilmByQuery] = useState([]);

  const setParams = (value) => {
    searchParams.set("query", value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.size === 0) {
      return;
    }

    const getFilms = async () => {
      try {
        const films = await getFilmByQuery(searchParams.get("query"));
        setFilmByQuery(films);
      } catch (error) {
        console.log(error);
      }
    };
    getFilms();
  }, [searchParams]);

  return (
    <div>
      <SearchBar onSubmit={setParams} />
      <MovieList movies={filmByQuery} />
    </div>
  );
}