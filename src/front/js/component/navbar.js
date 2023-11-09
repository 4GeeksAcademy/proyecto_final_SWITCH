import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css";

import logo from "../../img/logo-switch.png";

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
          <img src={logo} height="150px" className="pb-2" />
        </Link>

        {/*BUTTONS - right side***********************************************************************************/}

        {/* Buttons when screen big */}

        <div className="ml-auto ">
          {/*BUTTON REGISTER*/}

          <div className="d-xl-block d-none">
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
          </div>

          {/* Buttons when screen small */}
          <div className="position-relative ">
            <div className="d-xl-none d-block" onClick={toggleNavbar}>
              <img src={hamburger} height="50px" className="mt-5" />
            </div>

            <div className="d-xl-none ">
              {isNavbarOpen && (
                <div className="bg-dark-blue d-flex navbar-desplegable flex-column rounded p-3 fs-4 align-items-start justify-content-start navbar-desplegable-go-up-when-open ">
                  {/*BUTTON register*/}
                  <Link to="/demo" className="text-decoration-none">
                    <div className="navbar-link-desplegable font-nunito pb-4  fw-bolder extralight-blue ">
                      Registro
                    </div>
                  </Link>
                  {/* BUTTON MEMEBERS */}
                  <Link to="/demo" className="text-decoration-none">
                    <div className="navbar-link-desplegable font-nunito pb-4  fw-bolder extralight-blue">
                      Acceso miembros
                    </div>
                  </Link>
                  {/*BUTTON ORGANIZERS*/}
                  <Link to="/demo" className="text-decoration-none">
                    <div className="navbar-link-desplegable font-nunito  fw-bolder extralight-blue">
                      Acceso organizadores
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
