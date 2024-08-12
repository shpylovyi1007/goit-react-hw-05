import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmMoreInfo } from "../../films-api";
import MovieList from "../MovieList/MovieList";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieRecommendation() {
  const { movieId } = useParams();
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const recommendation = await getFilmMoreInfo(
          movieId,
          "recommendations"
        );
        setRecommendation(recommendation.results);
      } catch (error) {
        console.log(error);
      }
    };
    getRecommendation();
  }, [movieId]);

  return (
    <div>
      {recommendation.length !== 0 ? (
        <MovieList movies={recommendation} />
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
}