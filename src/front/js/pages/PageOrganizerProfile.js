import React, { useState, useEffect } from 'react';
import '../../styles/martha.css';
import '../../img/bocadillos.png';

const OrganizerProfile = () => {
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

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleViewGroupsClick = () => {
    // Lógica para ver grupos creados
    console.log('Botón Ver Grupos Creados clicado');
  };

  const handleEditProfileClick = () => {
    // Lógica para editar datos del usuario
    console.log('Botón Editar información personal');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + '/api/user/');

        if (response.ok) {
          const data = await response.json();

          setUserData({
            userName: data.user.user_name,
            nombre: data.user.first_name,
            apellido: data.user.last_name,
            email: data.user.email,
            sexo: data.user.gender,
            ciudad: data.user.city,
            rol: data.user.role,

          });
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data', error);

      }
    };

    fetchData();
  }, []);

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
          <p>{userData.userLanguages}</p>
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