import React from "react";

import locationIcon from "../../img/home-location-icon.png";
import searchIcon from "../../img/home-search-icon.png";

export const HomeSearchBar = () => {
  return (
    <section className="bg-yellow d-flex flex-column container pt-5 ">
      {/*SEARCH BAR */}

      <div className=" bg-light position-relative rounded-3 home-search-bar-shadow over overflow-hidden">
        {/*FORM */}

        <form className="form-inline d-flex justify-content-between ">
          {/*SEARCH SIDE */}

          <div className="d-flex flex-grow-1">
            {/*SEARCH ICON */}

            <div className="bg-dark-blue p-2 px-3 rounded">
              <img src={searchIcon} height="40px" className="home-icons" />
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
              <img src={locationIcon} height="40px" className="home-icons" />
            </div>
            {/*LOCATION INPUT */}

            <input
              className=" py-2 px-4 text-16 bg-light home-inputs w-100"
              type="search"
              placeholder="Ciudad, barrio..."
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
    </section>
  );
};
