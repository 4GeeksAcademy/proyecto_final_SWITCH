import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/martha.css';
import fotoGrupoGeneral from '../../img/foto-grupo-general.jpg';
import { useNavigate, useParams } from "react-router-dom";


function GroupPageAdmin() {
  // const [groupData, setGroupData] = useState(null);
  // const [editGroupUrl, setEditGroupUrl] = useState(null);

  // const handleEditGroupsClick = () => {
  //   if (editGroupUrl) {
  //     // Redirige a la página de edición del grupo
  //     navigate(editGroupUrl);
  //   }
  // };

  const navigate = useNavigate()
  const { id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [organizerData, setOrganizerData] = useState("");
  const [groupsEventsData, setGroupsEventsData] = useState(null);

  // FETCH FOR THIS PARTICULAR GROUP
  async function searchGroupById(id) {
    try {
      // Group Data Fetch
      const groupResponse = await fetch(`${process.env.BACKEND_URL}/api/searchGroup/${id}`);
      if (!groupResponse.ok) {
        throw new Error('Error fetching group data');
      }
      const groupData = await groupResponse.json();
      setGroupData(groupData);
      console.log("Group data set:", groupData)

      // Group Organizer Fetch
      const organizerResponse = await fetch(`${process.env.BACKEND_URL}/api/UserData/${groupData.group_data.organizer_id}`);
      if (!organizerResponse.ok) {
        throw new Error('Error fetching organizer data');
      }
      const organizerData = await organizerResponse.json();
      setOrganizerData(organizerData);
      console.log("Organizer data set:", organizerData)

      // Group Events Fetch
      const groupsEventsResponse = await fetch(`${process.env.BACKEND_URL}/api/allGroupsEvents/${id}`);
      console.log(groupsEventsResponse)
      if (!groupsEventsResponse.ok) {
        throw new Error('Error fetching groups events data', groupsEventsResponse.text);
      }
      const groupsEventsData = await groupsEventsResponse.json();
      console.log(groupsEventsData)
      setGroupsEventsData(groupsEventsData);
      console.log("Groups Events data set:", groupsEventsData)

    } catch (error) {
      console.error("Error fetching individual group data:", error.message);
    }
  }

  useEffect(() => {
    searchGroupById(id);
  }, [id]);

  // -----------------------------------------------------------
  // Use User Id to serach for id_organizer in groups 

  // useEffect(() => {
  //   async function fetchGroupData(id) {
  //     try {
  //       const response = await fetch(`${process.env.BACKEND_URL}/api/searchGroup/${id}`);
  //       if (!response.ok) {
  //         throw new Error('Error fetching event');
  //       }
  //       const data = await response.json();
  //       setGroupData(data);
  //       setEditGroupUrl(`/group-Admin-Page/${data.id_group}`);
  //     } catch (error) {
  //       console.error('Error fetching group data:', error);
  //     }
  //   }

  //   const groupId = 123; 
  //   fetchGroupData(groupId);
  // }, []);

  return (
    <div className="contenedorGeneral">
      <div className="group-page">
        <header className='pt-4'>
          <h1 className="fw-bold text-48 dark-blue font-nunito">
            {groupData && groupData.group_data.name ? groupData.group_data.name : "Cargando"}
          </h1>
        </header>
        {/* COL IZQUIERDA */}
        <div className="main-content pb-5">
          <div className="contenedores">
            <div className="descripcion">
              <h2 className="tipoh2">Descripción:</h2>
              <p className="extradark-grey">
                {groupData && groupData.group_data.description ? groupData.group_data.description : "Cargando"}
              </p>
            </div>

            <div className="organizador">
              <h2 className="tipoh2">Organizador:</h2>
              <p className="extradark-grey">
                {organizerData && organizerData.userData.first_name ? organizerData.userData.first_name : "Cargando"}
                {" "}
                {organizerData && organizerData.userData.last_name ? organizerData.userData.last_name : "Cargando"}
              </p>
            </div>

            <div className="miembros">
              <h2 className="tipoh2">Ubicación del Grupo:</h2>
              <p className="extradark-grey">
                {groupData && groupData.group_data.city ? groupData.group_data.city : "Cargando"}
              </p>
            </div>

            <div className="miembros">
              <h2 className="tipoh2">Idiomas del Grupo:</h2>
              <p className="extradark-grey">
                {groupData && groupData.group_data.languages ? groupData.group_data.languages : "Cargando"}
              </p>
            </div>

            <div className="eventos">
              <h2 className="tipoh2">Eventos:</h2>
              {groupsEventsData == null ?
                <li>Cargando...</li>
                : (groupsEventsData.map((event, index) => (
                  <ul className='list-unstyled'>
                    <Link to={`/EventPagePay/${event.id}`} key={index} className="text-decoration-none">
                      <li>{event.name}</li>
                    </Link>
                  </ul>
                )))}
            </div>

            <div className="buttons-group-container">
              {/* Ruta a la página de edición de datos del grupo */}
              <Link to="/FormEditGroup">
                <button type="button" className="custom-button">
                  <i className="fas fa-pencil-alt"></i> Edita tus datos
                </button>
              </Link>

              {/* Ruta a la página de creación de un evento */}
              <Link to="/CreateNewEvent">
                <button type="button" className="custom-button">
                  <i className="fas fa-pencil-alt"></i> Crea un nuevo evento
                </button>
              </Link>
            </div>

          </div>

          {/* IMAGEN COL DERECHA */}
          <div className="imagen-lateral border border-white border-3">
            <img
              src={groupData && groupData.group_data.photo_url ? groupData.group_data.photo_url : fotoGrupoGeneral}
              alt="Imagen del Group Page" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupPageAdmin

