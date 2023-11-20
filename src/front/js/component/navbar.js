import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/navbar.css";
import logo from "../../img/logo-switch-raya-blanca.png";
import hamburger from "../../img/navbar-hamburger.png";


export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen((prevIsNavbarOpen) => !prevIsNavbarOpen);
  };

  const navigate = useNavigate();
  const location = useLocation();

  // FUNCION PARA CERRAR SESION : 

  const handleClick = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <nav className="navbar bg-blue py-3 d-flex navbar-expand-lg">
      <div className={`container ${location.pathname === "/createnewuserprofile" ? "d-flex justify-content-center" : ""}`}>
        {/*LOGO - left side***********************************************************************************/}

        <Link to="/">
          <img src={logo} height="150px" className="pb-2" />
        </Link>

        {/*BUTTONS - right side***********************************************************************************/}

        {/* NO TOKEN */}

        {!store.token && location.pathname !== "/createnewuserprofile" && (

          <>

            {/* Buttons when screen big */}

            < div className="ml-auto ">
              {/*BUTTON REGISTER*/}

              <div className="d-xl-block d-none">
                <Link to="/createnewuserprofile">
                  <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-md-5 px-0 py-3 extradark-grey my-auto">
                    REGÍSTRATE
                  </button>
                </Link>


                {/*BUTTON ORGANIZERS*/}

                <Link to="/signin">
                  <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-md-5 px-0 py-3  extradark-grey ms-3">
                    ACCEDE A TU CUENTA
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
                      <Link to="/createnewuserprofile" className="text-decoration-none">
                        <div className="navbar-link-desplegable font-nunito pb-4  fw-bolder extralight-blue ">
                          Registro
                        </div>
                      </Link>

                      {/*BUTTON ORGANIZERS*/}
                      <Link to="/signin" className="text-decoration-none">
                        <div className="navbar-link-desplegable font-nunito  fw-bolder extralight-blue">
                          Acceso
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/*******************************************************************************************************************************************************/}

        {/* TOKEN */}

        {store.token && (

          <>

            {/* Buttons when screen big */}

            < div className="ml-auto ">


              {/*BUTTON PROFILE PAGE*/}
              <div className="d-xl-block d-none">
                {store.member === true
                  ? <Link to={`/UsersProfile/${store.id_user}`}>
                    <img src={logo} height="55px" width="55px" className="rounded-circle bg-extradark-grey" />
                  </Link>
                  : null
                }
                {store.organizer === true
                  ? <Link to={`/OrganizerProfile/${store.id_user}`}>
                    <img src={logo} height="55px" width="55px" className="rounded-circle bg-extradark-grey" />
                  </Link>
                  : null
                }

                {/*BUTTON CERRAR SESION*/}


                <button className="btn rounded-3 rounded navbar-btn bg-light fw-bolder text-16 px-md-5 px-0 py-3  extradark-grey my-auto ms-4" onClick={handleClick}>
                  CERRAR SESIÓN
                </button>


              </div>

              {/* Buttons when screen small */}
              <div className="position-relative ">
                <div className="d-xl-none d-block" onClick={toggleNavbar}>
                  <img src={hamburger} height="50px" className="mt-5" />
                </div>

                <div className="d-xl-none ">
                  {isNavbarOpen && (
                    <div className="bg-dark-blue d-flex navbar-desplegable flex-column rounded p-3 fs-4 align-items-start justify-content-start navbar-desplegable-go-up-when-open ">
                      {/* BUTTON MEMEBERS */}
                      <Link to="/Profile" className="text-decoration-none">
                        <div className="navbar-link-desplegable font-nunito pb-4  fw-bolder extralight-blue">
                          Tu perfil
                        </div>
                      </Link>

                      {/*BUTTON register*/}

                      <div className="navbar-link-desplegable font-nunito pb-4  fw-bolder extralight-blue " onClick={handleClick}>
                        Cerrar sessión
                      </div>



                    </div>
                  )}
                </div>
              </div>
            </div>
          </>)}

      </div >
    </nav >
  );
};
