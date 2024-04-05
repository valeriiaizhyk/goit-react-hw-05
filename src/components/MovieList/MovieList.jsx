import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <h2>{movie.title}</h2>
            <MovieCard movie={movie} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
