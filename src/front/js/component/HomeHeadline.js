import React from "react";
import { Link, useNavigate } from "react-router-dom";
import parejaHomePage from "../../img/pareja-home-page.png";

export const HomeHeadline = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-between flex-column headline flex-xl-row ">
      {/*TEXT LEFT*/}

      <div className="pe-xl-5">
        <h2 className="fw-bold extradark-grey font-nunito home-headline-title">
          Qué es <span className="dark-blue">Switch </span>
        </h2>
        <p className="extradark-grey fs-4 pt-3 font-nunito pe-xl-5">
          Switch es una app intutitiva donde personas reales hablan y enseñan
          idiomas, a la vez que se apoyan, crean nuevas amistades, exploran
          lugares, descubren el arte, la naturaleza o la gastronomía del mundo.{" "}
        </p>
        <p className="extradark-grey fs-4 font-nunito pe-xl-5 pt-4">
          Nuestra metodología consiste en conectar a personas en actividades
          divertidas mientras mejoran sus habilidades lingüísticas y a facilitar
          a los organizadores la gestión de sus eventos y grupos.{" "}
        </p>

        <div className="d-flex justify-content-center justify-content-xl-start">
          <button className="btn rounded-3 rounded home-input-btn bg-dark-blue fw-bolder text-16 text-light px-5 py-3 mt-4 ">
            Únete ya
          </button>
        </div>
      </div>

      {/* FOTO RIGHT */}

      <div className="pt-xl-0 d-flex justify-content-center">
        <img
          src={parejaHomePage}
          alt="people having a conversation"
          className="pt-5 home-headline-pic"
        />
      </div>
    </div>
  );
};
