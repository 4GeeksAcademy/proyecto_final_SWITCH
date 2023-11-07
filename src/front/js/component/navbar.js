import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css";

// import logo from "../../img/navbar-logo.png";

import hamburger from "../../img/navbar-hamburger.png";

export const Navbar = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen((prevIsNavbarOpen) => !prevIsNavbarOpen);
  };

  return (
    <nav className="navbar bg-blue py-3 d-flex navbar-expand-lg">
      <div className="container">
        {/*LOGO - left side***********************************************************************************/}

        <Link to="/">
          <img
            //   src={logo}
            src="https://placehold.co/500x250"
            height="100px"
          />
        </Link>

        {/*BUTTONS - right side***********************************************************************************/}

        {/* Buttons when screen big */}

        <div className="d-lg-none d-block" onClick={toggleNavbar}>
          <img src={hamburger} height="80px" />
        </div>

        <div className="ml-auto d-lg-block d-none">
          {/*BUTTON REGISTER*/}

          <Link to="/demo">
            <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-md-5 px-0 py-3  extradark-grey my-auto">
              REGÍSTRATE
            </button>
          </Link>

          {/*BUTTON MEMEBERS*/}

          <Link to="/demo">
            <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-md-5 px-0 py-3  extradark-grey ms-3">
              ACCESO MIEMBROS
            </button>
          </Link>

          {/*BUTTON ORGANIZERS*/}

          <Link to="/demo">
            <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-md-5 px-0 py-3  extradark-grey ms-3">
              ACCESO ORGANIZADORES
            </button>
          </Link>

          {/* Buttons when screen small */}

          <div className="d-sm-none ">
            {isNavbarOpen && (
              <>
                {/*BUTTON register*/}
                <Link to="/demo">
                  <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-5 py-3  extradark-grey my-auto">
                    REGÍSTRATE---
                  </button>
                </Link>

                {/*BUTTON MEMEBERS*/}

                <Link to="/demo">
                  <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-5 py-3  extradark-grey ms-3">
                    ACCESO MIEMBROS---
                  </button>
                </Link>

                {/*BUTTON ORGANIZERS*/}

                <Link to="/demo">
                  <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-5 py-3  extradark-grey ms-3">
                    ACCESO ORGANIZADORES---
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
