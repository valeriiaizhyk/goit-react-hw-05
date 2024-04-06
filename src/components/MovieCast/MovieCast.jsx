import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../api-request";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchData("/movie/${movieId}/credits", movieId);
        setCast(data.cast);
      } catch (error) {
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
    <>
      {cast.length > 0 ? (
        <div>
          {loading && <Loader />}

          {error && (
            <ErrorMessage>
              Something went wrong! Please reload the page!
            </ErrorMessage>
          )}
          {!loading && (
            <ul>
              {cast.map(({ id, name, character, profile_path }) => (
                <li key={id}>
                  <img
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                        : defaultImg
                    }
                    alt={"${name} photo"}
                  />
                  <div>
                    <p>{name}</p>
                    <p>{character}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className={css.cast}>The cast has not yet been written</p>
      )}
    </>
  );
}
