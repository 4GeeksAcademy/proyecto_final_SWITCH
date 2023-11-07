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
		*/}

        <div className=" bg-light position-relative rounded-3 home-search-bar-shadow over overflow-hidden">
          {/*FORM */}

          <form className="form-inline d-flex justify-content-between ">
            {/*SEARCH SIDE */}

            <div className="d-flex flex-grow-1">
              {/*SEARCH ICON */}

              <div className="bg-dark-blue p-2 px-3 rounded">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" height="40px" className="home-icons" />
              </div>

              {/*SEARCH INPUT */}
              <input
                className=" mr-sm-2  py-2 px-4 text-16 bg-light home-inputs w-100 "
                type="search"
                placeholder="Tipo de actividad, tempos..."
              />
            </div>

            {/*LOCATION SIDE */}

            <div className="d-flex flex-grow-1">
              {/*LOCATION ICON */}

              <div className="bg-dark-blue py-2 px-3 rounded">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" height="40px" className="home-icons" />
              </div>
              {/*LOCATION INPUT */}

              <input
                className=" py-2 px-4 text-16 bg-light home-inputs w-100"
                type="search"
                placeholder="Location"
              />
            </div>

            {/*SUBMIT BUTTON */}

            <button
              className="btn rounded-3 rounded-end home-input-btn bg-dark-blue fw-bolder text-16 text-light my-2 my-sm-0 px-4"
              type="submit"
            >
              Encuentra tu grupo
            </button>
          </form>
        </div>

		{/* OLD SEARCHBAR */}
		<div className="p-2 bg-light position-relative rounded-3 shadow mx-sm-1 mx-md-5">
			<form className="form-inline d-flex flex-column flex-sm-row align-items-sm-center">
				<div className="flex-grow-1 form-group mb-2 mb-sm-0 me-sm-2">
					<input
						className="form-control mr-sm-2 py-2 px-4 text-16 bg-light input-activity"
						type="search"
						placeholder="Search for a group"
						aria-label="Search"
					/>
				</div>
				<div className="form-group flex-grow-1 mb-2 mb-sm-0 me-sm-2">
				<input
					className="form-control py-2 px-4 text-16 bg-light input-activity"
					type="text"
					placeholder="Location"
				/>
				</div>
				<button
				className="btn rounded-3 input-btn bg-dark-blue fw-bolder text-light mb-2 mb-sm-0 px-4 flex-grow-1"
				type="submit"
				>
				Encuentra tu grupo
				</button>
			</form>
		</div>

		{/* RESULT BOXES */}
		{/* Tendremos que producir estas contendores desde una función map() 
		    cuando tengamos unos grupos en la BBDD 'Groups'. De momento estos
			contendores son tipo 'placeholder' */}
		<div className="container mt-4 bg-warning rounded-3 mx-sm-1 mx-md-5 fs-5 fw-bold">
			<div className="row">
				<div className="col text-left p-3">
					<span className="bg-white p-2 rounded-3">Group Name</span>
				</div>
				<div className="col text-end p-3">
					<Link to={'/GroupPageLink/{uid}'} className="bg-white p-2 rounded-3 searchLink">View Group</Link>
				</div>
			</div>
		</div>
		<div className="container mt-4 bg-warning rounded-3 mx-sm-1 mx-md-5 fs-5 fw-bold">
			<div className="row">
				<div className="col text-left p-3">
					<span className="bg-white p-2 rounded-3">Group Name</span>
				</div>
				<div className="col text-end p-3">
					<Link to={'/GroupPageLink/{uid}'} className="bg-white p-2 rounded-3 searchLink">View Group</Link>
				</div>
			</div>
		</div>
		<div className="container mt-4 bg-warning rounded-3 mx-sm-1 mx-md-5 fs-5 fw-bold">
			<div className="row">
				<div className="col text-left p-3">
					<span className="bg-white p-2 rounded-3">Group Name</span>
				</div>
				<div className="col text-end p-3">
					<Link to={'/GroupPageLink/{uid}'} className="bg-white p-2 rounded-3 searchLink">View Group</Link>
				</div>
			</div>
		</div>
		</>
		
		
	);
};
