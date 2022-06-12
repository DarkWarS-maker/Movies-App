import React, { useRef, useEffect, useState } from "react";

import { Link, useLocation, useHistory } from "react-router-dom";
import { getWatchlists, Logout } from "../../api/localHost";

import "./header.scss";

//import logo from '../../assets/tmovie.png';

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];

const loggedInNav = [
  {
    display: "WatchList",
    path: "/watchlist",
  },
  {
    display: "Log Out",
    path: "/logout",
  },
];

const loggedOutNav = [
  {
    display: "Log In",
    path: "/login",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const history = useHistory();
  const active = headerNav.findIndex((e) => e.path === pathname);

  const isLoggedIn = window.localStorage.getItem("login");

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    //getWatchlists();

    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          {/* <img src={logo} alt="" />
                    <Link to="/">tMovies</Link> */}
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <span onClick={() => history.push(e.path)}>{e.display}</span>
            </li>
          ))}
          {isLoggedIn
            ? loggedInNav.map((e, i) =>
                e.display === "Log Out" ? (
                  <li key={i} className={`${i === active ? "active" : ""}`}>
                    <span
                      onClick={() => {
                        Logout();
                        history.push("/home");
                        //window.location.reload();
                      }}
                    >
                      {e.display}
                    </span>
                  </li>
                ) : (
                  <li key={i} className={`${i === active ? "active" : ""}`}>
                    <span onClick={() => history.push(e.path)}>
                      {e.display}
                    </span>
                  </li>
                )
              )
            : loggedOutNav.map((e, i) => (
                <li key={i} className={`${i === active ? "active" : ""}`}>
                  <span onClick={() => history.push(e.path)}>{e.display}</span>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
