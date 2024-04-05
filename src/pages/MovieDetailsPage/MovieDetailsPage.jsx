import { Suspense, useRef } from "react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import fetchData from "../../api-request";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchData("/movie/${movieId}", movieId);
        setMovie(data);
      } catch (error) {
        toast.error("Error! Please reload the page.");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div>
      <Link to={backLinkRef.current}> Go back</Link>

      {loading && <Loader />}

      {error && (
        <ErrorMessage>
          Something went wrong! Please reload the page!
        </ErrorMessage>
      )}

      <div>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={`${movie.title} poster`}
        />
        <div>
          <h1>{movie.title}</h1>
          {movie.tagline && <p>{`"${movie.tagline}"`}</p>}
          {movie.overview && (
            <p>
              <span>Overview:</span> {movie.overview}
            </p>
          )}
          {movie.genres && movie.genres.length > 0 && (
            <p>
              <span>Genres:</span>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}

          {movie.vote_average > 0 && (
            <p>
              <span>Average rating:</span> {Math.floor(movie.vote_average)} / 10
            </p>
          )}

          {!loading && (
            <nav>
              <NavLink to="cast">Cast</NavLink>
              <NavLink to="reviews">Reviews</NavLink>
            </nav>
          )}
        </div>
      </div>

      <Suspense fullback={<Loader />}>
        <Outlet />
      </Suspense>

      <Toaster />
    </div>
  );
}
