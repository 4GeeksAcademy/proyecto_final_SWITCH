import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/searchResults.css";

export const SearchResults = () => {
	const { store, actions } = useContext(Context);

	return (
		
		<>
		{/* SEARCH BAR */}

		{/* NEW SEARCH BAR 
			Faltan las imagenes de la branch de Vanesa
			Hay que hacer que este search bar es responsive como el antiguo
		*/}

        <div className="bg-light position-relative rounded-3 home-searchbar-shadow over overflow-hidden mx-2 mx-md-5 mt-3">
          
		  {/*FORM */}
          <form className="d-flex flex-column flex-md-row ">

            {/*SEARCH SIDE */}
            <div className="d-flex flex-grow-1 mb-2 mb-md-0 me-md-2 justify-content-center">

              {/*SEARCH ICON */}
              <div className="bg-dark-blue p-2 px-3 rounded">
				{/* Todo: Reemplaza con icon de Vanesa */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" height="40px" className="home-icons" />
              </div>

              {/*SEARCH INPUT */}
              <input
                className="mr-2 py-2 px-3 text-16 bg-light home-inputs w-100"
                type="search"
                placeholder="Search for a group"
				aria-label="Search"
              />
            </div>

            {/*LOCATION SIDE */}
            <div className="d-flex flex-grow-1 mb-2 mb-md-0 me-md-2">

              {/*LOCATION ICON */}
              <div className="bg-dark-blue py-2 px-3 rounded">
				{/* Todo: Reemplaza con icon de Vanesa */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" height="40px" className="home-icons" />
              </div>

              {/*LOCATION INPUT */}
              <input
                className="py-2 px-3 text-16 bg-light home-inputs w-100"
                type="search"
                placeholder="Location"
              />
            </div>

            {/*SUBMIT BUTTON */}
            <button
              className="btn rounded-3 rounded-end home-input-btn bg-dark-blue fw-bolder text-16 text-light px-4"
              type="submit"
            >
              Find a Group
            </button>
          </form>
        </div>

		{/* RESULT BOXES */}
		{/* Tendremos que producir estas contendores desde una función map() 
		    cuando tengamos unos grupos en la BBDD 'Groups'. De momento estos
			contendores son tipo 'placeholder' */}
		<div className="mt-4 bg-warning rounded-3 mx-2 mx-md-5 fs-5 fw-bold">
			<div className="row">
				<div className="col text-left p-3 d-flex justify-content-start">
					<span className="bg-white p-2 rounded-3 ms-2 text-center">Group Name</span>
				</div>
				<div className="col text-end p-3 d-flex justify-content-end">
					<Link to={'/GroupPageLink/{uid}'} className="bg-white p-2 me-2 rounded-3 searchLink text-center">View Group</Link>
				</div>
			</div>
		</div>

    <div className="mt-4 bg-warning rounded-3 mx-2 mx-md-5 fs-5 fw-bold">
			<div className="row">
				<div className="col text-left p-3 d-flex justify-content-start">
					<span className="bg-white p-2 rounded-3 ms-2 text-center">Group Name</span>
				</div>
				<div className="col text-end p-3 d-flex justify-content-end">
					<Link to={'/GroupPageLink/{uid}'} className="bg-white p-2 me-2 rounded-3 searchLink text-center">View Group</Link>
				</div>
			</div>
		</div>

    <div className="mt-4 bg-warning rounded-3 mx-2 mx-md-5 fs-5 fw-bold">
			<div className="row">
				<div className="col text-left p-3 d-flex justify-content-start">
					<span className="bg-white p-2 rounded-3 ms-2 text-center">Group Name</span>
				</div>
				<div className="col text-end p-3 d-flex justify-content-end">
					<Link to={'/GroupPageLink/{uid}'} className="bg-white p-2 me-2 rounded-3 searchLink text-center">View Group</Link>
				</div>
			</div>
		</div>
		</>
		
		
	);
};
