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

  console.log("this is the id of the event", id)


  async function searchEventById(id) {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/searchevent/${id}`);
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


  console.log("Event data to be rendered on page:", eventData)

  return (

    <div className="group-page" >

      {/**TITULO */}
      <header className="mt-5">
        {eventData && <h1 className="fw-bold text-48 dark-blue font-nunito">{eventData.name}</h1>}
      </header>

      <div className="main-content">
        <div className="contenedores">

          {/**LOCALIZACION */}

          <div className="descripcion">
            <h2 className="tipoh2">Donde:</h2>
            {eventData && <p className="extradark-grey fs-5">
              {eventData.location}
            </p>}
          </div>

          {/**DESCRIPCION */}

          <div className="descripcion">
            <h2 className="tipoh2">Descripción:</h2>
            {eventData && <p className="extradark-grey fs-5">
              {eventData.description}
            </p>}
          </div>

          {/**COMIENZO */}

          <div className="descripcion">
            <h2 className="tipoh2">Comienzo:</h2>
            {eventData && <p className="extradark-grey fs-5">
              {new Date(eventData.start_time).toLocaleDateString()}
            </p>}
          </div>



          {/**FINALIZACION */}

          <div className="descripcion">
            <h2 className="tipoh2">Finalización:</h2>
            {eventData && <p className="extradark-grey fs-5">
              {new Date(eventData.end_time).toLocaleDateString()}
            </p>}
          </div>

          {/**LOCALIZACION */}

          <div className="organizador">
            <h2 className="tipoh2">Límite de asistentes:</h2>
            {eventData && <p className="extradark-grey fs-5">{eventData.event_capacity}</p>}
          </div>

          {/**Organizador */}

          <div className="organizador">
            <h2 className="tipoh2">Organizador:</h2>
            <p className="extradark-grey fs-5">{ }</p>
          </div>

          {/**Miembros Apuntados */}

          <div className="miembros">
            <h2 className="tipoh2">Miembros Apuntados:</h2>
            <p className="extradark-grey fs-5">{ }</p>
          </div>

          {/**precio */}

          <div className="miembros">
            <h2 className="tipoh2">Precio:</h2>
            <p className="extradark-grey fs-5">5€</p>
          </div>

          {/* BLUE BUTTON*/}
          <div className="py-3 px-4 extradark-grey fs-5 d-flex flex-column justify-content-between align-items-center">



            {/* {!store.token ? ( */}
            <Link
              to={`/PaymentPage/${id}`}
              className="py-2 px-4 me-2 rounded-3 searchLink text-center bg-dark-blue fw-bolder fs-5 text-light"
            >
              Apúntate!
            </Link>
            {/* ) : (<Link
              to={`/payment`}
              className="py-2 px-4 me-2 rounded-3 searchLink text-center bg-dark-blue fw-bolder fs-5 text-light"
            >
              Ya estás apuntado
            </Link>
            )} */}

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