import React from "react";

export const HomeHeadline = () => {
  return (
    <section className="bg-yellow d-flex flex-column container pt-5 ">
      <div className="d-flex justify-between flex-column headline flex-xl-row ">
        {/*TEXT LEFT*/}

        <div className="pe-5">
          <h2 className="fw-bold text-72 extradark-grey font-nunito">
            Qué es <span className="dark-blue">Switch </span>
          </h2>
          <p className="extradark-grey fs-4 pt-3 font-nunito pe-5">
            Switch es una app intutitiva donde personas reales hablan y enseñan
            idiomas, a la vez que se apoyan, crean nuevas amistades, exploran
            lugares, descubren el arte, la naturaleza o la gastronomía del
            mundo.{" "}
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

        <div className="pt-xl-0 pt-5">
          <img
            src="https://placehold.co/600x500"
            alt="people having a conversation"
          />
        </div>
      </div>
    </section>
  );
};
