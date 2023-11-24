import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import '../../styles/martha.css';
import '../../img/bocadillos.png';
import { Context } from "../store/appContext"
import fotoPerfilGeneral from '../../img/foto-perfil-general.jpg'

const OrganizerProfile = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "Cargando",
    nombre: "Cargando",
    apellido: "Cargando",
    email: "Cargando",
    sexo: 'Cargando',
    password: "Cargando",
    ciudad: "Cargando",
    rol: "Cargando"
  });

  const [userLanguages, setUserLanguages] = useState([])

  // const handleInputChange = (name, value) => {
  //   setUserData({ ...userData, [name]: value });
  // };

  const handleViewGroupsClick = () => {
    async function getOrganizerGroup(id) {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/organizerGroup/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching event');
        }
        const groupData = await response.json();
        console.log("Group Data received:", groupData)
        const groupId = groupData.id
        navigate(`/GroupPageAdmin/${groupId}`)
      } catch (error) {
        console.error("Error fetching individual event:", error);
      }
    }
    getOrganizerGroup(store.id_user)
  };

  const handleEditProfileClick = () => {
    navigate("/EditUserProfile")
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  };

  const roleConversion = (booleanValue) => {
    return booleanValue ? "Miembro" : "Organizador"
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + `/api/UserData/${store.id_user}`);
        // console.log("response:", response)
        if (response.ok) {
          const data = await response.json();
          // console.log("data:", data)
          setUserData({
            userName: data.userData.user_name,
            nombre: data.userData.first_name,
            apellido: data.userData.last_name,
            email: data.userData.email,
            sexo: data.userData.gender,
            ciudad: data.userData.city,
            rol: data.userData.role,
          });
        } else {
          throw new Error('Failed to fetch user data');
        }

        // FETCH: IDIOMAS DEL USUARIO
        const languagesResponse = await fetch(process.env.BACKEND_URL + `/api/UserLanguages/${store.id_user}`);
        if(response.ok) {
          const languagesData = await languagesResponse.json()
          // console.log("languagesData:", languagesData)
          const usersLanguages = languagesData.userLanguages.map(item => item.language)
          // console.log("usersLanguages:", usersLanguages)
          setUserLanguages(usersLanguages)
        } else {
          throw new Error('Failed to fetch user languages')
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("userDataUpdate:", userData);
  // }, [userData]);

  // useEffect(() => {
  //   console.log("userLanguagesUpdate:", userLanguages);
  // }, [userLanguages]);


  return (
    <div className="user-data-column">
      <div className="user-profile d-flex flex-column flex-sm-row align-items-center align-items-sm-start">
        <div className="user-photo me-0 me-sm-4">
          <img className="user-photo-image"
               src={store.photo_url_user === ""? fotoPerfilGeneral : store.photo_url_user}  
               alt="Foto de Perfil" />
        </div>
        <div className="user-info mt-2 mt-sm-0">
          <div className="tipoh3">{userData.userName}</div>
          <p className="fst-italic">{userData.nombre} {userData.apellido}</p>
          <p className="fst-italic">{userData.rol == "Cargando"? "Cargando" : roleConversion(userData.rol)}</p>
          <p className="fst-italic">{userData.email}</p>
          <p>
            <i className="fas fa-map-marker-alt"></i> <strong>{userData.ciudad}</strong>
          </p>
          <p className="fst-italic">{capitalizeFirstLetter(userData.sexo)}</p>
          <p className="fst-italic">Idiomas:</p>
          <ul className="fst-italic">
            {userLanguages == [] ?
              <p>Cargando idiomas</p>
              : userLanguages.map(language =>
                <li key={language}>{capitalizeFirstLetter(language)}</li>
              )
            }
          </ul>
          {/* Botones */}
          <div className="buttons-container d-flex flex-column">
            <button type="button" className="custom-button" onClick={handleViewGroupsClick}>
              Ir a tu grupo
            </button>
            <div className="edit-profile-button">
              <button type="button" className="custom-button edit-profile" onClick={handleEditProfileClick}>
                <i className="fas fa-pencil-alt"></i> Editar perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default OrganizerProfile;