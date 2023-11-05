import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <main className=" bg-yellow">
      <section className="bg-yellow d-flex flex-column container pt-5 ">
        {/* <div className="d-flex justify-start pt-5">
          <h3 className="fw-bold extradark-grey font-nunito">
            Encuentra tu <span className="dark-blue">grupo </span> perfecto.
          </h3>{" "}
        </div> */}

        {/*SEARCH BAR */}
        <div className="p-2 bg-light position-relative rounded-3 shadow">
          <form className="form-inline d-flex  ">
            <div className="flex-grow-1 form-group me-2">
              <input
                className="form-control mr-sm-2  py-2 px-4 text-16 bg-light input-activity "
                type="search"
                placeholder="Tipo de actividad, tempos..."
                aria-label="Search"
              />{" "}
            </div>
            <div className="form-group flex-grow-1 me-5 ">
              <input
                className="form-control  py-2 px-4 text-16 bg-light input-activity "
                type="text"
                placeholder="Location"
              />
            </div>
            <button
              className="btn rounded-3 input-btn bg-dark-blue fw-bolder text-16 text-light my-2 my-sm-0 px-4"
              type="submit"
            >
              Encuentra tu grupo
            </button>
          </form>
        </div>

        {/*Headline*/}

        <div className="d-flex justify-between pt-5 pb-5">
          {/*TEXT LEFT*/}
          <div className="pe-5">
            <h2 className="fw-bold text-52 extradark-grey font-nunito">
              Qué es <span className="dark-blue">Switch </span>
            </h2>
            <p className="extradark-grey fs-4 pt-3 font-nunito">
              Switch es una app intutitiva donde personas reales hablan y
              enseñan idiomas, a la vez que se apoyan, crean nuevas amistades,
              exploran lugares, descubren el arte, la naturaleza o la
              gastronomía del mundo.{" "}
            </p>
            <p className="extradark-grey fs-4 font-nunito">
              Nuestra metodología consiste en conectar a personas en actividades
              divertidas mientras mejoran sus habilidades lingüísticas y a
              facilitar a los organizadores la gestión de sus eventos y grupos.{" "}
            </p>
          </div>
          {/* FOTO RIGHT */}
          <div>
            <img
              src="https://placehold.co/600x400"
              alt="people having a conversation"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
