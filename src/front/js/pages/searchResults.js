import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/searchResults.css";
import { HomeSearchBar } from "../component/HomeSearchBar";

export const SearchResults = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {/* SEARCH BAR */}

      <HomeSearchBar />

      {/* RESULT BOXES */}
      {/* Tendremos que producir estas contendores desde una función map() 
		    cuando tengamos unos grupos en la BBDD 'Groups'. De momento estos
			contendores son tipo 'placeholder' */}
      <div className="mt-4 bg-warning rounded-3 mx-2 mx-md-5 fs-5 fw-bold">
        <div className="row">
          <div className="col text-left p-3 d-flex justify-content-start">
            <span className="bg-white p-2 rounded-3 ms-2 text-center">
              Group Name
            </span>
          </div>
          <div className="col text-end p-3 d-flex justify-content-end">
            <Link
              to={"/GroupPageLink/{uid}"}
              className="bg-white p-2 me-2 rounded-3 searchLink text-center"
            >
              View Group
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-warning rounded-3 mx-2 mx-md-5 fs-5 fw-bold">
        <div className="row">
          <div className="col text-left p-3 d-flex justify-content-start">
            <span className="bg-white p-2 rounded-3 ms-2 text-center">
              Group Name
            </span>
          </div>
          <div className="col text-end p-3 d-flex justify-content-end">
            <Link
              to={"/GroupPageLink/{uid}"}
              className="bg-white p-2 me-2 rounded-3 searchLink text-center"
            >
              View Group
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-warning rounded-3 mx-2 mx-md-5 fs-5 fw-bold">
        <div className="row">
          <div className="col text-left p-3 d-flex justify-content-start">
            <span className="bg-white p-2 rounded-3 ms-2 text-center">
              Group Name
            </span>
          </div>
          <div className="col text-end p-3 d-flex justify-content-end">
            <Link
              to={"/GroupPageLink/{uid}"}
              className="bg-white p-2 me-2 rounded-3 searchLink text-center"
            >
              View Group
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
