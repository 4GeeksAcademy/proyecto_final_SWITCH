import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/searchBar.css";
import locationIcon from "../../img/home-location-icon.png";
import searchIcon from "../../img/home-search-icon.png";
import { useNavigate, useLocation } from "react-router-dom";

export const HomeSearchBar = () => {
  const { store, actions } = useContext(Context);
  const [searchEvent, setSearchEvent] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);


  const navigate = useNavigate();

  const handleSubmit = (e) => {

    actions.saveInputs(searchEvent, "event")
    actions.saveInputs(searchLocation, "city")

    console.log("parameters stored in store, before going as parameters in the searchFilteredEvents function:", store.event, store.city)

    e.preventDefault();
    navigate("/eventsearchjoin");

    actions.searchFilteredEvents(store.city, store.event)

    setSearchEvent("")
    setSearchLocation("")

    actions.saveInputs(null, "event")
    actions.saveInputs(null, "city")

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
            placeholder="Tipo de evento"
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
            placeholder="Ciudad"
            aria-label="Search Location"
            // onChange={(e) => actions.saveInputs(e.target.value, "city")}
            onChange={(e) => setSearchLocation(e.target.value)}
            value={searchLocation}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="btn rounded-3 rounded-end home-input-btn bg-dark-blue fw-bolder fs-5 text-light px-4"
          type="submit"
        >
          Encuentra tu evento
        </button>
      </form>
    </div>
  );
};