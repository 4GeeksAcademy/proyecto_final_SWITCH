import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/createNewUserProfile.css";
import parejaTomaCafe from "../../img/pareja-toma-cafe.png";

export const FormEditUser = () => {
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // VARIABLES 
  const { store, actions } = useContext(Context);
  
  // Get ID of User from flux.js
  let stored_id_user = store.id_user

  // Store Collected User Data
  const {userData, setUserData} = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    city: "",
    role: "",
    gender: "",
    languages: [],
    photo: "",
  })

  // Form Variables
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userUserName, setUserUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userLanguages, setUserLanguages] = useState([]);
  const [userPhoto, setUserPhoto] = useState(""); // Duda: ¿Cómo gestionar input de un archivo?

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // FUNCTIONS

  // CHECKING INPUT VALUES
  // function change(e) {
  //   console.log(e.target.value)
  // }

  /****************
    DUDA: 
    - Necesito averiguar cómo consigo los datos de los idiomas primero (see: duda-fetch)
    - Luego, de dónde saco los idiomas (userData o userLanguages?)
    - Languages Array Function: actualiza para reflexionar cambios de arriba  

  *****************/

  // LANGUAGES ARRAY FUNCTION  
  function languagesArray(language) {
    // console.log("Current array:", newUserLanguages) 

    // If already in array, remove language
    if (userLanguages.includes(language)) {
      let langIndex = userLanguages.indexOf(language);
      userLanguages.splice(langIndex, 1);
      setUserLanguages([...userLanguages]);
      // console.log("Post-update Array:", newUserLanguages) 
      return
    } 
    // If first time in array, simply add language
    setUserLanguages([...userLanguages, language])
    // console.log("New lang added:", newUserLanguages) 
    return
  }

   /****************
    TODO: Update variables below + create "updateUser" function in flux (PUT Fetch)
   ****************/

  // FORM SUBMIT FUNCTION  
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.updateUser(newUserFirstName, newUserLastName, newUserUserName, newUserEmail, 
                          newUserPassword, newUserCity, newUserRole, newUserGender,
                          newUserLanguages, newUserPhoto)
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // USE_EFFECTS

  /****************
   TODO: 
   Check: store.userId todavía pierde su valor después de cambio de página?
   (cambié endpoint from PUT to GET!)
  ****************/


  // FETCH GET: Get User's Data 'onMount'
  useEffect(() => {
    async function fetchUserData(userId) {
      console.log("userId:", userId)
      try {
        const response = await fetch((`${process.env.BACKEND_URL}/api/UserData/${userId}`))
        console.log("response:", response);
        if (!response.ok) {
          const errorMessage = await response.text();
          console.log("errorMessage:", errorMessage);
        }
        const responseData = await response.json(); 
        console.log("responseData:", responseData)

        /* Receive data + set variables where data is stored */
        setUserData({
          firstName: responseData.first_name,
          lastName: responseData.last_name,
          userName: responseData.user_name,
          email: responseData.email,
          password: responseData.password,
          city: responseData.city,
          role: responseData.role,
          gender: responseData.gender,
          // languages: responseData.languages, --> languages está en otra table?!
          photo: responseData.photo_url,
        })
  
      } catch (error) {
        console.error("Error:", error)
        throw error
      }

      /***********************
        DUDA:
        - Crear una segunda fetch aquí tomando idUser para llamar languages de usuario 
          en User_languages?

        - En app.py - endpoint "GET USER LANGUAGES" 
          --> @app.route('/api/UserData/languages/<int:id_user>', methods=["GET"]))
          --> languages = User_languages.query.get(id_user)

        - Luego hay que marcar las casillas con los idiomas relevantes? -
         -> si languages.includes(...) añada "checked" al elemento?
      
      **************************/
    }
    fetchUserData(stored_id_user)
  }, [])

  /*******************
  TODO: UPDATE BELOW WITH "userUpdated" varieties -> update function in flux 
  *******************/

  // USER SUCCESSFULLY CREATED
  useEffect(() => {
    store.userCreatedSuccess === true? 
    alert("El nuevo usuario se ha creado con éxito")
    : null
  }, [store.userCreatedSuccess])

  // USER NOT SUCCESSFULLY CREATED
  useEffect(() => {
    store.userCreatedFailure === true?
    alert("Ha habido un error en crear tu perfil. Inténtalo de nuevo.")
    : null
  }, [store.userCreatedFailure])

  
  return (
    <>
      {/* PAGE CONTAINER */}
      <div style={{ background: "#ffc100" }} className="py-3">
        <div className="container col-10 col-md-8 col-lg-6 col-xxl-4">
          <div className="formImageFlexbox">
            <img src={parejaTomaCafe} className="formImage"/>
          </div>
          <h1 className="formProfileHeader extradark-blue text-center mt-2">Edita tu Perfil</h1> 
          {/* FORM */}
          <form id="createNewUserForm" onSubmit={handleSubmit}>

            {/* FIRST NAME */}
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label extradark-blue fw-bold">Nombre<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="first_name" name="first_name" required
                value={userData.firstName}
                onChange={(e) => setUserData({[firstName]: e.target.value})}
                // before = onChange={(e) => setUserFirstName(e.target.value)}
              />
              {/* {console.log(userFirstName)} */}
            </div>

            {/* LAST NAME */}
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label extradark-blue fw-bold">Apellido(s)<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="last_name" name="last_name" required
                value={userData.lastName}
                onChange={(e) => setUserData({[lastName]: e.target.value})}
              />
               {/* {console.log(userLastName)} */}
            </div>

            {/* USER NAME */}
            <div className="mb-3">
              <label htmlFor="user_name" className="form-label extradark-blue fw-bold">Nombre de Usuario<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="user_name" name="user_name" required
                value={userData.userName}
                onChange={(e) => setUserData({[userName]: e.target.value})}
              />
               {/* {console.log(userUserName)} */}
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label extradark-blue fw-bold">Correo Electrónico<span className="requiredAsterisk">*</span></label>
              <input type="email" className="form-control" id="email" name="email" required
                value={userData.email}
                onChange={(e) => setUserData({[email]: e.target.value})}
              />
               {/* {console.log(userEmail)} */}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label extradark-blue fw-bold">Contraseña<span className="requiredAsterisk">*</span></label>
              <input type="password" className="form-control" id="password" name="password" required
                value={userData.password}
                onChange={(e) => setUserData({[password]: e.target.value})}
              />
               {/* {console.log(userPassword)} */}
            </div>

            {/* CITY */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label extradark-blue fw-bold">Ciudad<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="city" name="city" required
                value={userData.city}
                onChange={(e) => setUserData({[city]: e.target.value})}
              />
              {/* {console.log(userCity)} */}
            </div>

            {/* ROLE */}
            <fieldset className="mb-3">
              <legend className="col-form-label col-12 pt-0 extradark-blue fw-bold">Tipo de Usuario<span className="requiredAsterisk">*</span></legend>
                {userData.role === true
                  ? <>
                      <div className="form-check mb-2">
                          <input className="form-check-input" type="radio" name="userRole" id="radioMember" value="true"
                            checked // TRUE CHECKED
                            onClick={(e) => setUserData({[role]: e.target.value})}
                          />
                          <label className="form-check-label extradark-blue" htmlFor="radioMember">
                            <b>Miembro</b> - quiero unirme a grupos y acudir a eventos
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="userRole" id="radioOrganizer" value="false" 
                            onClick={(e) => setUserData({[role]: e.target.value})}
                          />
                          <label className="form-check-label extradark-blue" htmlFor="radioOrganizer">
                            <b>Organizador</b> - quiero crear grupos y organizar eventos, así como, unirme a grupos y acudir a eventos
                          </label>
                      </div>
                    </>
                  : <>
                      <div className="form-check mb-2">
                          <input className="form-check-input" type="radio" name="userRole" id="radioMember" value="true"
                            onClick={(e) => setUserData({[role]: e.target.value})}
                          />
                          <label className="form-check-label extradark-blue" htmlFor="radioMember">
                            <b>Miembro</b> - quiero unirme a grupos y acudir a eventos
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="userRole" id="radioOrganizer" value="false" 
                            checked // FALSE CHECKED
                            onClick={(e) => setUserData({[role]: e.target.value})}
                          />
                          <label className="form-check-label extradark-blue" htmlFor="radioOrganizer">
                            <b>Organizador</b> - quiero crear grupos y organizar eventos, así como, unirme a grupos y acudir a eventos
                          </label>
                      </div>
                    </>
                }
                {/* {console.log(userRole)}  */}
            </fieldset>

            {/* GENDER */}
            <div className="mb-3">
              <label className="form-label extradark-blue fw-bold">Género</label>
              <select className="form-select" name="gender" defaultValue={userData.gender} 
                onChange={(e) => setUserData({[gender]: e.target.value})}
              >
                <option disabled>Seleccionar tu género</option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option value="other">Otro</option>
              </select>
              {/* {console.log(userGender)} */}
            </div>

            {/* LANGUAGES */}
            <div className="mb-3">
              <label className="form-label extradark-blue fw-bold">Idiomas</label>
              <div className="form-check">
                {/********************
                 IDEA OF HOW TO DISPLAY RECEIVED LANG DATA 
                 ********************/}
                {/* {
                  userData.languages.includes("english")
                  ? <input className="form-check-input" type="checkbox" value="english" id="english" name="languages[]" 
                      checked // CHECKED
                      onChange={(e) => languagesArray(e.target.value)}
                    />
                  : <input className="form-check-input" type="checkbox" value="english" id="english" name="languages[]" 
                      onChange={(e) => languagesArray(e.target.value)}
                    />
                } */}
                <input className="form-check-input" type="checkbox" value="english" id="english" name="languages[]" 
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="english">Inglés</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="spanish" id="spanish" name="languages[]"
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="spanish">Español</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="french" id="french" name="languages[]"
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="french">Francés</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="italian" id="italian" name="languages[]"
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="italian">Italiano</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="german" id="german" name="languages[]" 
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="german">Alemán</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="portuguese" id="portuguese" name="languages[]" 
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="portuguese">Portugués</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="russian" id="russian" name="languages[]" 
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="russian">Ruso</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="arabic" id="arabic" name="languages[]" 
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="arabic">Árabe</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="japanese" id="japanese" name="languages[]" 
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="japanese">Japonés</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="chinese" id="chinese" name="languages[]" 
                  onChange={(e) => languagesArray(e.target.value)}
                />
                <label className="form-check-label extradark-blue fw-bold" htmlFor="chinese">Chino</label>
              </div>
            </div>

            {/* PHOTO FILE */}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label extradark-blue fw-bold">Imagen de perfil</label>
              <input className="form-control" type="file" id="formFile" name="photo" 
                onChange={(e) => setUserPhoto(e.target.files[0])}
              />
              {/* {console.log(userPhoto)} */}
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
