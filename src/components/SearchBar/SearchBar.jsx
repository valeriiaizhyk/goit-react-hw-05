import { useSearchParams } from "react-router-dom";
import css from "./SearchBar.module.css";

export default function SearchBar() {
  const [params, setParams] = useSearchParams();
  const querFilter = params.get("query") ?? "";

  const changeMovieFilter = (newFilter) => {
    params.set("query", newFilter.trim());
    setParams(params);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    form.reset();
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={css.title}>
          Find a movie that matches your preferences.
        </h2>
        <label>
          <input
            className={css.input}
            type="text"
            name="search"
            autoFocus
            placeholder="Enter the movie title"
            value={querFilter}
            onChange={(e) => changeMovieFilter(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
}
