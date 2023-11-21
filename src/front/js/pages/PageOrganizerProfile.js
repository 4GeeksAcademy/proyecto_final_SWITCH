import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import '../../styles/martha.css';
import '../../img/bocadillos.png';
import { Context } from "../store/appContext"

const OrganizerProfile = () => {
  const {store, actions} = useContext (Context)
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    nombre: "",
    apellido: "",
    email: "",
    sexo: '',
    password: "",
    ciudad: "",
    rol: ""
  });

  const [userLanguages, setUserLanguages] = useState([])

  // const handleInputChange = (name, value) => {
  //   setUserData({ ...userData, [name]: value });
  // };

  const handleViewGroupsClick = () => {
    // Lógica para ver grupos creados
    console.log('Botón Ver Grupos Creados clicado');
  };

  const handleEditProfileClick = () => {
    navigate("/EditUserProfile")
  };

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
          console.log("languagesData:", languagesData)
          const usersLanguages = languagesData.userLanguages.map(item => item.language)
          console.log("usersLanguages:", usersLanguages)
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
  //   console.log("userLanguagesUpdate:", userLanguages);
  // }, [userLanguages]);
  
  return (
    <div className="user-data-column">
      <div className="user-profile">
        <div className="user-photo">
          <img className="user-photo-image" src={userData.photo_url} alt="" />
        </div>
        <div className="user-info">
          <div className="tipoh3">{userData.userName}</div>
          <p>{userData.email}</p>
          <p>
            <i className="fas fa-map-marker-alt"></i> <strong>{userData.ciudad}</strong>
          </p>
          <p>{userData.sexo}</p>
          <p>Idiomas:</p>
          <ul>
            {userLanguages == [] ?
              <p>Cargando idiomas</p>
              : userLanguages.map(language => 
              <li key={language}>{language}</li>
              )
            }
          </ul>
          {/* Botones */}
          <div className="buttons-container">
            <button type="button" className="custom-button" onClick={handleViewGroupsClick}>
              Tus grupos
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