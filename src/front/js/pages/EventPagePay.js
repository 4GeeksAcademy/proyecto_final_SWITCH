import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/eventpagepay.css';
import LaTertulia from '../../img/LaTertulia.png';
import { useNavigate, useParams, Link } from "react-router-dom";


function EventPagePay() {

  const { id } = useParams();

  const { store, actions } = useContext(Context);

  const [eventData, setEventData] = useState(null);

  // GET THE INFO OF JUST ONE PARTICULAR EVENT

  console.log("this is the id of the event", id) ////////// THE ID IS GETTING HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


  async function searchEventById(id) {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/searchEvent/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching event');
      }
      const event = await response.json();
      setEventData(event);
      console.log("Event correctly fetched:", event);
    } catch (error) {
      console.error("Error fetching individual event:", error);
    }
  }

  useEffect(() => {
    searchEventById(id);
  }, [id]);


  console.log("individual event data", eventData) ////////// IT'S ALWAYS NULL, WHY ??????????????????????????????  

  return (
    <div className="group-page">

      <header>
        <h1 className="fw-bold text-48 dark-blue font-nunito">Aquí va la info del evento número: {id}</h1>
      </header>

      <div className="main-content">
        <div className="contenedores">
          <div className="descripcion">
            <h2 className="tipoh2">Descripción:</h2>
            <p className="extradark-grey">
              Bienvenidos a nuestras tardes de intercambio!. ¡Aquí podrás conocer gente nueva para practicar tu
              inglés, español o cualquier otro idioma que encuentres en nuestro bar! El inglés y el español son los
              idiomas principales, pero si tienes o quieres otro idioma, no dudes en venir, ¡nunca sabes a quién
              conocerás!. Su anfitriona es Stefanie, dueña del bar y profesora de inglés, además de productora y
              presentadora de televisión en Irlanda del Norte. ¡Ven a conversar de forma natural divertida y aprende
              gramática o practica tu pronunciación! ¡Conocerás gente nueva de diferentes culturas! ¡Te esperamos!
            </p>
          </div>

          <div className="organizador">
            <h2 className="tipoh2">Organizador:</h2>
            <p className="extradark-grey">Stefanie Houston</p>
          </div>

          <div className="miembros">
            <h2 className="tipoh2">Miembros:</h2>
            <p className="extradark-grey">Lista de miembros o información relevante.</p>
          </div>

          <div className="miembros">
            <h2 className="tipoh2">Precio:</h2>
            <p className="extradark-grey">5€</p>
          </div>
          {/* BLUE BUTTON*/}
          <div className="py-3 px-4 extradark-grey fs-5 d-flex flex-column justify-content-between align-items-center">



            {!store.token ? (<Link
              to={`/payment`}
              className="py-2 px-4 me-2 rounded-3 searchLink text-center bg-dark-blue fw-bolder fs-5 text-light"
            >
              Apúntate!
            </Link>
            ) : (<Link
              to={`/payment`}
              className="py-2 px-4 me-2 rounded-3 searchLink text-center bg-dark-blue fw-bolder fs-5 text-light"
            >
              Ya estás apuntado
            </Link>
            )}

          </div>

        </div>
        <div className="imagen-lateral">
          <img src={LaTertulia} alt="Imagen del Group Page" />
        </div>
      </div>


    </div>

  )
}

export default EventPagePay