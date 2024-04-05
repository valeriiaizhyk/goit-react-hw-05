import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import fetchData from "../../api-request";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchData("/trending/movie/day");
        setMovies(data.results);
      } catch (error) {
        toast.error("Error! Please reload the page.");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1>Popular movies</h1>
      {loading && <Loader />}

      {error && (
        <ErrorMessage>
          Something went wrong! Please reload the page!
        </ErrorMessage>
      )}

      <MovieList movies={movies} />
      <Toaster />
    </>
  );
}
