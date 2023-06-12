import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Memo App
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/todo">
                ToDo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/calendar/list">
                Calendar list
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/calendar/view">
                Calendar view
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
