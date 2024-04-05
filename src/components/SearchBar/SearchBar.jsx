import { useSearchParams } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Find a movie that matches your preferences.</h2>
        <label>
          <input
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
