import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar_info">
      <div className="navbar">
        <Link to="/">
          <a href="/" title="Swiggy">
            <img
              className="ui tiny right circular image"
              src="https://res.cloudinary.com/swiggy/image/upload/portal/c/icon-192x192.png"
              alt="shopping cart"
            />
          </a>
        </Link>

        <div>
          <Link to="/search">
            <div class="ui right aligned category search">
              <div class="ui icon input">
                <input class="prompt" type="text" placeholder="Search " />
                <i class="search icon"></i>
              </div>
            </div>
          </Link>
        </div>
        <Link to="/cart">
          <div className="navbar__cart">
            <div class="three wide column">
              <i class="icon big cart arrow down "></i>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
