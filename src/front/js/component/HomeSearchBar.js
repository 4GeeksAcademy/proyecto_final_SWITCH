import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/searchBar.css";
import locationIcon from "../../img/home-location-icon.png";
import searchIcon from "../../img/home-search-icon.png";

export const HomeSearchBar = () => {
  const { store, actions } = useContext(Context);
  const [searchEvent, setSearchEvent] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  // TODO APPLY FILTERING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // const filterPrompts = (searchEvent) => {
  //   const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  //   return (
  //     regex.test(store.organizer) ||
  //     regex.test(store.member) ||
  //     regex.test(store.event)
  //   );
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const searchResult = filterPrompts(searchEvent, searchLocation);
    // setSearchedResults(searchResult);
    // actions.searchEvents(searchedResults)
    actions.searchEvents();
  };

  return (
    <div className="bg-light position-relative rounded-3 home-searchbar-shadow overflow-hidden mt-3">
      {/* FORM */}
      <form className="d-flex flex-column flex-md-row " onSubmit={handleSubmit}>
        {/* SEARCH SIDE */}
        <div className="d-flex flex-grow-1 mb-2 mb-md-0 me-md-2 justify-content-center">
          {/* SEARCH ICON */}
          <div className="bg-dark-blue py-2 search-icon-div rounded">
            <img src={searchIcon} height="40px" className="home-icons" alt="Search Icon" />
          </div>

          {/* SEARCH INPUT */}
          <input
            className="mr-2 py-2 px-3 text-16 bg-light home-inputs w-100"
            type="search"
            placeholder="Search for a group"
            aria-label="Search"
            onChange={(e) => setSearchEvent(e.target.value)}
            value={searchEvent}
          />
        </div>

        {/* LOCATION SIDE */}
        <div className="d-flex flex-grow-1 mb-2 mb-md-0 me-md-2">
          {/* LOCATION ICON */}
          <div className="bg-dark-blue py-2 px-3 rounded">
            <img src={locationIcon} height="40px" className="home-icons" alt="Location Icon" />
          </div>

          {/* LOCATION INPUT */}
          <input
            className="py-2 px-3 text-16 bg-light home-inputs w-100"
            type="search"
            placeholder="Location"
            aria-label="Search Location"
            
            value={searchLocation}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="btn rounded-3 rounded-end home-input-btn bg-dark-blue fw-bolder text-16 text-light px-4"
          type="submit"
        >
          Find a Group
        </button>
      </form>
    </div>
  );
};