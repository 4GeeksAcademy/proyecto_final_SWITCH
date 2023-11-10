import React from "react";
import "../../styles/searchBar.css";
import locationIcon from "../../img/home-location-icon.png";
import searchIcon from "../../img/home-search-icon.png";

export const HomeSearchBar = () => {
  return (
    <div className="bg-light position-relative rounded-3 home-searchbar-shadow over overflow-hidden mt-3">
      {/*FORM */}
      <form className="d-flex flex-column flex-md-row ">
        {/*SEARCH SIDE */}
        <div className="d-flex flex-grow-1 mb-2 mb-md-0 me-md-2 justify-content-center">
          {/*SEARCH ICON */}
          <div className="bg-dark-blue py-2 search-icon-div rounded">
            <img src={searchIcon} height="40px" className="home-icons" />
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
            <img src={locationIcon} height="40px" className="home-icons" />
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
    // </section>
  );
};
