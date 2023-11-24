import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/eventpagepay.css';
import fotoGrupoGeneral from '../../img/foto-grupo-general.jpg';
import { useNavigate, useParams, Link } from "react-router-dom";


function EventPagePay() {

  const { id } = useParams();

  const { store, actions } = useContext(Context);

  const [eventData, setEventData] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [organizerData, setOrganizerData] = useState("");  

  // GET THE INFO OF JUST ONE PARTICULAR EVENT

  console.log("this is the id of the event", id)


  async function searchEventById(id) {
    try {
      // Event Data Fetch
      const response = await fetch(`${process.env.BACKEND_URL}/api/searchevent/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching event');
      }
      const event = await response.json();
      setEventData(event);
      console.log("Event correctly set:", event);

      // Group Data Fetch
      const groupResponse = await fetch(`${process.env.BACKEND_URL}/api/searchGroup/${event.group}`);
      if (!groupResponse.ok) {
        throw new Error('Error fetching group data');
      }
      const groupData = await groupResponse.json();      
      setGroupData(groupData);
      console.log("Group data set:", groupData)

      // Group Organizer Fetch
      const organizerResponse = await fetch(`${process.env.BACKEND_URL}/api/UserData/${groupData.group_data.organizer_id}`);
      if (!organizerResponse.ok) {
        throw new Error('Error fetching organizer id');
      }
      const organizerData = await organizerResponse.json();      
      setOrganizerData(organizerData);
      console.log("Organizer data set:", organizerData)

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
      <header className="pt-5">
        {eventData && <h1 className="title-event fw-bold text-48 dark-blue font-nunito">{eventData.name}</h1>}
      </header>

      <div className="main-content">
        <div className="contenedores">

          {/**LOCALIZACION */}

          <div className="descripcion mt-0">
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

          {/**GRUPO DEL EVENTO */}

          <div className="organizador">
            <h2 className="tipoh2">Grupo que organiza el evento:</h2>
            {groupData && <Link to={`/GroupPage/${eventData.group}`} className="extradark-grey fs-5">
                            {groupData.group_data.name}
                          </Link>}
          </div>

          {/**ORGANIZADOR*/}
          <div className="miembros">
            <h2 className="tipoh2">Organizador:</h2>
            {organizerData && 
              <p className="extradark-grey fs-5">
                {organizerData.userData.first_name}{organizerData.userData.last_name}
              </p>}
          </div>

          {/**PRECIO */}

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
        {/* IMAGEN */}
        <div className="imagen-lateral border border-white border-3">
          <img 
            src={eventData && eventData.photo_url? eventData.photo_url : fotoGrupoGeneral}
            alt="Imagen del Group Page" 
          />
        </div>
      </div>

    </div>

  )
}

export default EventPagePay

   {/* TODO
            X Name links to group
            - Group page = static --> need to make it dynamic (param at end of link)
            - Create fetch to group endpoint in group page
            - That's it...for now
            
    */}