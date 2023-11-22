import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import '../../styles/martha.css';
import '../../img/bocadillos.png';
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";




const UsersProfile = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();

  const [userEventsData, setUserEventsData] = useState([])
  const [userEventsIds, setUserEventsIds] = useState([])


  // VISUALIZING WHAT I HAVE IN THE STATE: 

  //const userEventsIds = [
  //     {
  //         "event": 1,
  //         "id": 1,
  //         "user": 4
  //     },
  //     {
  //         "event": 2,
  //         "id": 2,
  //         "user": 4
  //     }
  //    ]


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  console.log("id del store", store.id_user)


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

  const handleEditClick = () => {
    // Lógica para editar la información
    console.log('Botón Editar clicado');
  };

  const handleViewGroupsClick = () => {
    // Lógica para ver grupos creados
    console.log('Botón Ver Grupos Creados clicado');
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


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////  GET THE LAST PART OF THE URL ( THE ID OF THE USER ):

  const pathname = window.location.pathname;
  const urlParts = pathname.split('/');
  const lastPart = urlParts[urlParts.length - 1];

  // Set the last part of the URL into a variable
  const urlEnd = lastPart;

  console.log("getting the last part of url, the id of user", urlEnd)



  //////////////////////////////////////  GET THE ID OF THE EVENTS AND SET IT INTO  userEventsIds:

  useEffect(() => {
    const fetchEventsIds = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + `/api/userEvents/${urlEnd}`);

        if (response.ok) {
          const events = await response.json();
          console.log("the events Ids of the user", events);
          setUserEventsIds(events)
        } else {
          throw new Error('Failed to fetch user events');
        }
      } catch (error) {
        console.error('Error fetching user events', error);
      }
    };

    fetchEventsIds();
  }, []);

  //////////////////////////////////////  FUNCTION THAT GETS THE DATA OF ONE EVENT:

  // const eventId = 1

  // useEffect(() => {
  const fetchEventData = async (eventId) => {
    try {
      const response = await fetch(process.env.BACKEND_URL + `/api/searchevent/${eventId}`);
      if (response.ok) {
        const eventData = await response.json();
        console.log("data of just one event", eventData)
        return eventData;
      } else {
        throw new Error('Failed to fetch event data');
      }
    } catch (error) {
      console.error('Error fetching event data', error);
      return null;
    }
  };

  // fetchEventData(eventId)

  // }, []);

  //////////////////////////////////////  FUNCTION THAT MAPS THE IDS OF EVENTS, TO GET THE DATA OF ALL EVENTS:

  useEffect(() => {
    const fetchAllEventsData = async () => {
      try {
        const eventPromises = userEventsIds.map(event => fetchEventData(event.id));
        const eventsData = await Promise.all(eventPromises);
        setUserEventsData(eventsData);
      } catch (error) {
        console.error('Error fetching event data', error);
      }
    };

    if (userEventsIds.length > 0) {
      fetchAllEventsData();
    }
  }, [userEventsIds]);

  console.log("Data of all events after mapping events ids", userEventsData);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  // useEffect(() => {
  //   console.log("userDataUpdate:", userData);
  // }, [userData]);

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
          <p>{roleConversion(userData.rol)}</p>
          <p>{userData.email}</p>
          <p>
            <i className="fas fa-map-marker-alt"></i> <strong>{userData.ciudad}</strong>
          </p>
          <p>{capitalizeFirstLetter(userData.sexo)}</p>
          <p>Idiomas:</p>
          <ul>
            {userLanguages == [] ?
              <p>Cargando idiomas</p>
              : userLanguages.map(language => 
              <li key={language}>{capitalizeFirstLetter(language)}</li>
              )
            }
          </ul>
          {/* Botones */}
          <div className="buttons-container">
            <button type="button" className="custom-button" onClick={handleEditClick}>
              Tus eventos
            </button>



            {userEventsData.map((event, index) => (
              <Link to={`/EventPagePay/${event.id}`} key={index} >
                <p className='text-black fs-5'>{event.name}</p>
              </Link>
            ))}




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
    </div >
  );


};

export default UsersProfile;