import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies Page</NavLink>
      </nav>
    </header>
  );
}
