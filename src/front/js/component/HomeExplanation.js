import React from "react";
import parejaHablando from "../../img/pareja-hablando.png";
import chicoChateando from "../../img/chico-chateando.png";
import logo from "../../img/logo-switch-turquesa.png";

export const HomeExplanation = () => {
  return (
    <div className="d-flex justify-between flex-column  flex-xl-row pt-5">
      {/*TEXT LEFT*/}

      <div className="pt-xl-0 d-flex justify-content-center ">
        {/*BLUE BOX LEFT */}

        <div className="bg-blue explanation-blue-box-left p-5 mb-5">
          <div className="d-flex justify-content-center">
            <div className="explanation-white-line"></div>
          </div>

          <h3 className="fw-bold extradark-grey font-nunito home-explanation-title pt-3">
            Habla con personas reales
          </h3>

          <p className="extradark-grey fs-4 pt-3 font-nunito  fw-bold">
            Conecta con personas reales
          </p>

          <p className="extradark-grey fs-4 pt-3 font-nunito  ">
            Aprende idiomas de una manera divertida, socializa con personas de
            todo el mundo y explora los tesoros de tu ciudad con nuestra app.
          </p>

          <img
            src={parejaHablando}
            alt="people having a conversation"
            className="pt-5 explanation-left-pic"
          />
          <div className="d-flex justify-content-center">
            <button className="btn rounded-3 rounded explanation-btn bg-yellow fw-bolder text-16  px-5 py-3 mt-4">
              REGISTRATE GRATIS
            </button>
          </div>
        </div>
      </div>

      {/* FOTO RIGHT */}

      <div className="pt-xl-0 d-flex justify-content-center">
        {/*BLUE BOX RIGHT*/}
        <div className="bg-blue explanation-blue-box-right p-5">
          <div className="d-flex justify-content-center">
            <div className="explanation-white-line"></div>
          </div>
          <h3 className="fw-bold extradark-grey font-nunito home-explanation-title pt-3">
            Crea tu propio grupo y eventos
          </h3>

          <p className="extradark-grey fs-4 pt-3 font-nunito  fw-bold">
            Organizadores, es hora de poner fin al caos en la planificación de
            eventos.
          </p>

          <p className="extradark-grey fs-4 pt-3 font-nunito  ">
            Toma el control y simplifica la organización de tus eventos con
            nuestra plataforma. Programa el calendario, administra usuarios y
            maximiza la diversión.
          </p>

          <img
            src={chicoChateando}
            alt="people having a conversation"
            className="explanation-right-pic"
          />

          <img src={logo} alt="switch logo" className="explanation-logo" />

          <div className="d-flex justify-content-center justify-content-sm-start">
            <button className="btn rounded-3 rounded explanation-btn bg-yellow fw-bolder text-16  px-5 py-3 mt-4">
              ORGANIZA TU EVENTO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
