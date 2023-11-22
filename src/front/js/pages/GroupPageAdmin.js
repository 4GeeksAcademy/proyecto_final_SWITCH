import React, { useState, useEffect, useNavigate } from 'react';
import '../../styles/martha.css';
import '../../img/LaTertulia.png';


import { Link } from 'react-router-dom';


function GroupPageAdmin() {
  const [groupData, setGroupData] = useState(null);
  const [editGroupUrl, setEditGroupUrl] = useState(null);

  const handleEditGroupsClick = () => {
    if (editGroupUrl) {
      // Redirige a la página de edición del grupo
      navigate(editGroupUrl);
    }
  };

  useEffect(() => {
    async function fetchGroupData(id) {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/searchGroup/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching event');
        }
        const data = await response.json();
        setGroupData(data);

        // Establecer la URL de edición del grupo basada en la información del grupo obtenida
        setEditGroupUrl(`/group-Admin-Page/${data.id_group}`);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    }

    const groupId = 123; // Reemplaza 123 con el ID del grupo deseado
    fetchGroupData(groupId);
  }, []);

  return (
    <div className='contenedorGeneral'>
<div className="group-page">
    {/* TITULO */}
    <header>
        {groupData && <h1 className="fw-bold text-48 dark-blue font-nunito">{groupData.name}</h1>}
    </header>

        <div className="main-content">
          <div className="contenedores">
            <div className="descripcion">
              <h2 className="tipoh2">Descripción:</h2>{groupData && (
                <p className="extradark-grey fs-5">
                  {groupData.description}
                </p>
              )}
            </div>

            <div className="organizador">
              <h2 className="tipoh2">Organizador:</h2>
              {groupData && (
                <p className="extradark-grey fs-5">
                  {groupData.organizer_name}
                </p>
              )}
            </div>
{/* Falta Data */}
            <div className="miembros">
              <h2 className="tipoh2">Miembros:</h2>
              <p className="extradark-grey">Lista de miembros o información relevante.</p>
            </div>
            {/* aquí faltaría Eventos pero con las tablas actuales me daría error , si creamos modelo event*/}
            <div className="eventos"> 
              <h2 className="tipoh2">Eventos:</h2>
              <p className="extradark-grey">Información sobre próximos eventos.</p>
            </div>
            <div className="buttons-group-container">
              {/* Ruta a la página de edición de datos del grupo */}
              <Link to="/FormEditGroup"> 
                <button type="button" className="custom-button">
                  <i className="fas fa-pencil-alt"></i> Edita tus datos
                </button>
              </Link>
              {/* Ruta a la página de creación de un evento */}
              <Link to="/create-event-page"> 
                <button type="button" className="custom-button">
                  <i className="fas fa-pencil-alt"></i> Crea un nuevo evento
                </button>
              </Link>
            </div>
          </div>
          <div className="imagen-lateral">
            <img src="LaTertulia.png" alt="Imagen del Group Page" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default GroupPageAdmin