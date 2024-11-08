import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ isAuthenticated, setIsAuthenticated }) {
  //   useEffect(() => {
  //     console.log("Header useEffect");
  //     const userToken = localStorage.getItem("accessToken");
  //     setIsAuthenticated(!!userToken);
  //   },[]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <header className="header">
      <h1 className="header-title">ArticleBase</h1>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
