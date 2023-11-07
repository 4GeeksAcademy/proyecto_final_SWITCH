import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import locationIcon from "../../img/home-location-icon.png";
import searchIcon from "../../img/home-search-icon.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <main className=" bg-yellow">
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

        {/*Headline*/}

        <div className="d-flex justify-between  headline">
          {/*TEXT LEFT*/}
          <div className="pe-5">
            <h2 className="fw-bold text-72 extradark-grey font-nunito">
              Qué es <span className="dark-blue">Switch </span>
            </h2>
            <p className="extradark-grey fs-4 pt-3 font-nunito pe-5">
              Switch es una app intutitiva donde personas reales hablan y
              enseñan idiomas, a la vez que se apoyan, crean nuevas amistades,
              exploran lugares, descubren el arte, la naturaleza o la
              gastronomía del mundo.{" "}
            </p>
            <p className="extradark-grey fs-4 font-nunito pe-5 pt-4">
              Nuestra metodología consiste en conectar a personas en actividades
              divertidas mientras mejoran sus habilidades lingüísticas y a
              facilitar a los organizadores la gestión de sus eventos y grupos.{" "}
            </p>

            <button className="btn rounded-3 rounded home-input-btn bg-dark-blue fw-bolder text-16 text-light px-5 py-3 mt-4">
              Únete ya
            </button>
          </div>

          {/* FOTO RIGHT */}
          <div>
            <img
              src="https://placehold.co/600x500"
              alt="people having a conversation"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
