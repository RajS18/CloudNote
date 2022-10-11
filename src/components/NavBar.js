import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h3><strong className="text-warning">C</strong>loud<strong className="text-success">N</strong>ote</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {localStorage.getItem('token')?<button className="btn btn-outline-danger" onClick={handleLogout}>
              Log Out
            </button>:<></>}
            
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
