import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import "../../styles/createNewUserProfile.css";
import parejaTomaCafe from "../../img/pareja-toma-cafe.png";

export const FormEditUser = () => {

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // VARIABLES 
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Get ID of User from flux.js
  let stored_id_user = store.id_user;

  // STORE COLLECTED USER DATA
  const [userData, setUserData] = useState({
    firstName: "Cargando...",
    lastName: "Cargando...",
    userName: "Cargando...",
    email: "Cargando...",
    password: "Cargando...",
    city: "Cargando...",
    role: "Cargando...",
    gender: "Cargando...",
    languages: [],
    photo: "Cargando...",
  })

  // LANGUAGES ENGLISH/SPANISH OBJECT FOR MAPPING
  const allLanguages = ["english", "spanish", "french", "italian", "german", "portuguese", "russian", "arabic", "japanese", "chinese"];
  const languageMapping = {
    english: "Inglés",
    spanish: "Español",
    french: "Francés",
    italian: "Italiano",
    german: "Alemán",
    portuguese: "Portugués",
    russian: "Ruso",
    arabic: "Árabe",
    japanese: "Japonés",
    chinese: "Chino",
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // FUNCTIONS

  // CHECKING INPUT VALUES
  // function change(e) {
  //   console.log(e.target.value)
  // }

  function editLanguagesArray(language) {
    // Directly set userData variable by getting previous useState's state
    // (automatically saved by React) and updating it with new state
    setUserData(prevUserData => {
      // Previous state before component update 
      let storedLanguagesArray = prevUserData ? [...prevUserData.languages] : [];
      // If already in array, remove language
      if (storedLanguagesArray.includes(language)) {
        let langIndex = storedLanguagesArray.indexOf(language);
        storedLanguagesArray.splice(langIndex, 1);
      } else { 
        // If first time in array, simply add language to it
        storedLanguagesArray.push(language)
      }
      // console.log("Post-update Array:", storedLanguagesArray)
      return { ...prevUserData, languages: storedLanguagesArray }
    })
  }

   // FORM SUBMIT FUNCTION  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("userdata sent to updateUser():", userData)
    actions.updateUser(userData.firstName, userData.lastName, 
      userData.userName, userData.email,userData.password, 
      userData.city, userData.role, userData.gender,
      userData.languages, userData.photo)
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // USE_EFFECTS

  // FETCH GET: Get User's Data + Languages 'onMount'
  useEffect(() => {
    async function fetchUserData(idUser) {
      console.log("idUser:", idUser)
      try {
        ////////// 1. FETCH USER DATA
        const userDataResponse = await fetch((`${process.env.BACKEND_URL}/api/UserData/${idUser}`))
        // console.log("User Data response:", userDataResponse);
        if (!userDataResponse.ok) {
          const errorMessage = await userDataResponse.text();
          console.log("errorMessage:", errorMessage);
        }
        const userData = await userDataResponse.json();
        // console.log("UserData:", userData)

        ////////// 2. FETCH USER LANGUAGES
        const userLanguagesResponse = await fetch((`${process.env.BACKEND_URL}/api/UserLanguages/${idUser}`))
        // console.log("User Data response:", userLanguagesResponse);
        if (!userLanguagesResponse.ok) {
          const errorMessage = await userLanguagesResponse.text();
          console.log("errorMessage:", errorMessage);
        }
        const userLanguagesData = await userLanguagesResponse.json();
        // console.log("UserLanguagesData:", userLanguagesData)

        // Extracts just the language data from 'userLanguagesResponse' (which contains an array of objects)
        const checkedLanguages = userLanguagesData.userLanguages.map(item => item.language)

        /* 3. MANAGE RECIEVED DATA + LANGUAGES
        -> Set the variables which the form accesses in order to display the user info on page */
        setUserData({
          firstName: userData.userData.first_name,
          lastName: userData.userData.last_name,
          userName: userData.userData.user_name,
          email: userData.userData.email,
          password: userData.userData.password,
          city: userData.userData.city,
          role: userData.userData.role,
          gender: userData.userData.gender,
          languages: checkedLanguages,
          photo: userData.userData.photo_url,
        })
      } catch (error) {
        console.error("Error:", error)
        throw error
      }
    }
    fetchUserData(stored_id_user)
  }, [])

  // USER SUCCESSFULLY UPDATED
  useEffect(() => {
    if(store.userUpdatedSuccess === true) {
      alert("El nuevo usuario se ha actualizado con éxito");
      store.userUpdatedSuccess = false;
      // REDIRECT USER
      if(store.member === true) {
        navigate(`/UsersProfile/${stored_id_user}`)
      }
      if(store.organizer === true) {
        navigate(`/OrganizerProfile/${stored_id_user}`)
      }
    }
  }, [store.userUpdatedSuccess])

  // USER NOT SUCCESSFULLY UPDATED
  useEffect(() => {
    if(store.userUpdatedFailutre === true) {
      alert("Ha habido un error en actualizar tu perfil. Inténtalo de nuevo.");
      store.userUpdatedFailure = false;
  }}, [store.userUpdatedFailure])

  // useEffect(() => {
  //   console.log("userData variable update:", userData)
  // }, [userData])

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // COMPONENT

  return (
    <>
      {/* PAGE CONTAINER */}
      <div style={{ background: "#ffc100" }} className="py-3">
        <div className="container col-10 col-md-8 col-lg-6 col-xxl-4">
          <div className="formImageFlexbox">
            <img src={parejaTomaCafe} className="formImage" />
          </div>
          <h1 className="formProfileHeader extradark-blue text-center mt-2">Edita tu Perfil</h1>
          {/* FORM */}
          <form id="createNewUserForm" onSubmit={handleSubmit}>

            {/* FIRST NAME */}
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label extradark-blue fw-bold">Nombre<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="first_name" name="first_name" required
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, "firstName": e.target.value })}
              />
              {/* {console.log(userData.firstName)} */}
            </div>

            {/* LAST NAME */}
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label extradark-blue fw-bold">Apellido(s)<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="last_name" name="last_name" required
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, "lastName": e.target.value })}
              />
              {/* {console.log(userData.lastName)} */}
            </div>

            {/* USER NAME */}
            <div className="mb-3">
              <label htmlFor="user_name" className="form-label extradark-blue fw-bold">Nombre de Usuario<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="user_name" name="user_name" required
                value={userData.userName}
                onChange={(e) => setUserData({ ...userData, "userName": e.target.value })}
              />
              {/* {console.log(userData.email)} */}
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label extradark-blue fw-bold">Correo Electrónico<span className="requiredAsterisk">*</span></label>
              <input type="email" className="form-control" id="email" name="email" required
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, "email": e.target.value })}
              />
              {/* {console.log(userData.email)} */}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label extradark-blue fw-bold">Contraseña<span className="requiredAsterisk">*</span></label>
              <input type="password" className="form-control" id="password" name="password" required
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, "password": e.target.value })}
              />
              {/* {console.log(userData.password)} */}
            </div>

            {/* CITY */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label extradark-blue fw-bold">Ciudad<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="city" name="city" required
                value={userData.city}
                onChange={(e) => setUserData({ ...userData, "city": e.target.value })}
              />
              {/* {console.log(userData.city)} */}
            </div>

            {/* ROLE */}
            <fieldset className="mb-3">
              <legend className="col-form-label col-12 pt-0 extradark-blue fw-bold">Tipo de Usuario<span className="requiredAsterisk">*</span></legend>
              {/* RADIO TRUE */}
              {userData.role === true
                ? // TRUE CHECKED
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="radio" name="userRole" id="radioMember" value="true"
                      checked
                      onClick={(e) => setUserData({ ...userData, "role": e.target.value })}
                    />
                    <label className="form-check-label extradark-blue" htmlFor="radioMember">
                      <b>Miembro</b> - quiero unirme a grupos y acudir a eventos
                    </label>
                  </div> 
                : // ELSE NOT CHECKED
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="radio" name="userRole" id="radioMember" value="true"
                      onClick={(e) => setUserData({ ...userData, "role": e.target.value })}
                    />
                    <label className="form-check-label extradark-blue" htmlFor="radioMember">
                      <b>Miembro</b> - quiero unirme a grupos y acudir a eventos
                    </label>
                  </div>
                }
                {/* RADIO FALSE */}
                {userData.role === false
                ? // FALSE CHECKED        
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="userRole" id="radioOrganizer" value="false"
                      checked
                      onClick={(e) => setUserData({ ...userData, "role": e.target.value })}
                    />
                    <label className="form-check-label extradark-blue" htmlFor="radioOrganizer">
                      <b>Organizador</b> - quiero crear grupos y organizar eventos, así como, unirme a grupos y acudir a eventos
                    </label>
                  </div>
                :
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="userRole" id="radioOrganizer" value="false"
                      onClick={(e) => setUserData({ ...userData,"role": e.target.value })}
                    />
                    <label className="form-check-label extradark-blue" htmlFor="radioOrganizer">
                      <b>Organizador</b> - quiero crear grupos y organizar eventos, así como, unirme a grupos y acudir a eventos
                    </label>
                  </div>
                }
              {/* {console.log(userData.role)} */}
            </fieldset>

            {/* GENDER */}
            <div className="mb-3">
              <label className="form-label extradark-blue fw-bold">Género</label>
              <select className="form-select" name="gender" defaultValue={userData.gender}
                onChange={(e) => setUserData({ ...userData, "gender": e.target.value })}
              >
                <option disabled>Seleccionar tu género</option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option value="other">Otro</option>
              </select>
              {/* {console.log(userData.gender)} */}
            </div>

            {/* PROBLEMA
                - Array empieza vacía y no se puede hacer un map de un array vacía entonces me devuelve:
                "Uncaught TypeError: Cannot read properties of undefined (reading 'includes')".
                - ¿Qué hago para que el map se ejecuta cuando los valores lleguen a la propiedad
                "languages" dentro de "userData"?
            
            */}
            {/* LANGUAGES */}
            <div className="mb-3">
              <label className="form-label extradark-blue fw-bold">Idiomas</label>
              {userData.languages && allLanguages.map(language => (
                <div className="form-check" key={language}>
                  {userData.languages.includes(language)
                  ? <input
                    className="form-check-input"
                    type="checkbox"
                    value={language}
                    id={language}
                    name="languages[]"
                    checked //CHECKED
                    onChange={() => editLanguagesArray(language)}
                    />
                  : <input
                    className="form-check-input"
                    type="checkbox"
                    value={language}
                    id={language}
                    name="languages[]"
                    onChange={() => editLanguagesArray(language)}
                    />
                  }
                  <label className="form-check-label extradark-blue fw-bold" htmlFor={language}>
                    {languageMapping[language]}
                  </label>
                </div>
              ))}
            </div>

            {/* PHOTO FILE */}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label extradark-blue fw-bold">Imagen de perfil</label>
              <input className="form-control" type="file" id="formFile" name="photo"
                onChange={(e) => setUserData({ ...userData, "photo": e.target.files[0] })}
              />
              {/* {console.log(userData.photo)} */}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="mb-3 d-flex justify-content-center">
              <button type="submit" className="btn bg-dark-blue text-white mx-auto fw-bold rounded-3 px-3 py-1 mt-3 formProfileButton">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
