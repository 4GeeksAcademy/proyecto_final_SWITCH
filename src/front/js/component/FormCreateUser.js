import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/createNewUserProfile.css";
import parejaTomaCafe from "../../img/pareja-toma-cafe.png";

export const FormCreateUser = () => {

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // VARIABLES
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Form Variables
  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserUserName, setNewUserUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserCity, setNewUserCity] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserGender, setNewUserGender] = useState("");
  const [newUserLanguages, setNewUserLanguages] = useState([]);

  // CHECKING INPUT VALUES
  // function change(e) {
  //   console.log(e.target.value)
  // }

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

  // PHOTO FILE VARIABLES (CLOUDINARY)
  const upload_preset_name = "switch-upload";
  const cloud_name = "switch-images";
  const [newUserPhoto, setNewUserPhoto] = useState(""); 

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // FUNCTIONS 

  // LANGUAGES ARRAY FUNCTION  
  function languagesArray(language) {
    // console.log("Current array:", newUserLanguages) 

    // If already in array, remove language
    if (newUserLanguages.includes(language)) {
      let langIndex = newUserLanguages.indexOf(language);
      newUserLanguages.splice(langIndex, 1);
      setNewUserLanguages([...newUserLanguages]);
      // console.log("Post-update Array:", newUserLanguages) 
      return
    }
    // If first time in array, simply add language
    setNewUserLanguages([...newUserLanguages, language])
    // console.log("New lang added:", newUserLanguages) 
    return
  }

  // FORM SUBMIT FUNCTION  
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.createNewUser(newUserFirstName, newUserLastName, newUserUserName, newUserEmail,
      newUserPassword, newUserCity, newUserRole, newUserGender,
      newUserLanguages, newUserPhoto)
  }

  // FILE/PHOTO UPLOAD FUNCTION
  function handleFile(event) {
    const file = event.target.files[0];
    console.log("fileInfo:", file)
    // Handle Large Images
    if(file.size >= 10485760){
      alert("Elige una imagen más pequeña (menos que 10MB).");
    } else {
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", upload_preset_name);
      cloudinary(formData)
    }
  }

  // CLOUDINARY API FETCH
  async function cloudinary(formData) {
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        body: formData
      }); 
      const data = await response.json();
      console.log("cloudinary response", data);
      setNewUserPhoto(data.secure_url);
    } catch (error) {
      console.error("Error:", error)
      throw error
    }}

    /*
      NOTAS
      - Tenemos un url ✅
      - Ahora haz un console.log de ese url, o muestra la foto en alguna página (da igual) solo para comprobar lo que hay ahí ✅
      - Luego tendremos que guardar ese url en una variable ✅
      - Conectar esa variable con la imagen de perfil en las paginas de perfil + la imagen de perfil en el navbar
    
    */


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // USEEFFECT

  // STORE USER PHOTO IN FLUX
  useEffect(() => {
    // console.log("newUserPhoto Variable:", newUserPhoto)
    actions.setUserPhoto(newUserPhoto)
  }, [newUserPhoto])

  // USER SUCCESSFULLY CREATED
  useEffect(() => {
    if (store.userCreatedSuccess === true) {
      alert("El nuevo usuario se ha creado con éxito");
      store.userCreatedSuccess = false;
      navigate("/")
      /* Change to Profile Page? --> Would have to have conditionals based on 
      store.member/organizer like in "FormEditUser" component */
    }
  }, [store.userCreatedSuccess])

  // USER NOT SUCCESSFULLY CREATED
  useEffect(() => {
    if (store.userCreatedFailure === true) {
      alert("Ha habido un error en crear tu perfil. Inténtalo de nuevo.");
      store.userCreatedFailure = false;
    }
  }, [store.userCreatedFailure])

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
          <h1 className="formProfileHeader extradark-blue text-center mt-2">Crea tu Perfil</h1>
          {/* FORM */}
          <form id="createNewUserForm" onSubmit={handleSubmit}>

            {/* FIRST NAME */}
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label extradark-blue fw-bold">Nombre<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="first_name" name="first_name" required
                onChange={(e) => setNewUserFirstName(e.target.value)}
              />
              {/* {console.log(newUserFirstName)} ✅*/}
            </div>

            {/* LAST NAME */}
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label extradark-blue fw-bold">Apellido(s)<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="last_name" name="last_name" required
                onChange={(e) => setNewUserLastName(e.target.value)}
              />
              {/* {console.log(newUserLastName)} ✅*/}
            </div>

            {/* USER NAME */}
            <div className="mb-3">
              <label htmlFor="user_name" className="form-label extradark-blue fw-bold">Nombre de Usuario<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="user_name" name="user_name" required
                onChange={(e) => setNewUserUserName(e.target.value)}
              />
              {/* {console.log(newUserUserName)} ✅*/}
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label extradark-blue fw-bold">Correo Electrónico<span className="requiredAsterisk">*</span></label>
              <input type="email" className="form-control" id="email" name="email" required
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              {/* {console.log(newUserEmail)} ✅*/}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label extradark-blue fw-bold">Contraseña<span className="requiredAsterisk">*</span></label>
              <input type="password" className="form-control" id="password" name="password" required
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
              {/* {console.log(newUserPassword)} ✅*/}
            </div>

            {/* CITY */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label extradark-blue fw-bold">Ciudad<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="city" name="city" required
                onChange={(e) => setNewUserCity(e.target.value)}
              />
              {/* {console.log(newUserCity)} ✅*/}
            </div>

            {/* ROLE */}
            <fieldset className="mb-3">
              <legend className="col-form-label col-12 pt-0 extradark-blue fw-bold">Tipo de Usuario<span className="requiredAsterisk">*</span></legend>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="userRole" id="radioMember" value="true"
                  onClick={(e) => setNewUserRole(e.target.value)}
                />
                <label className="form-check-label extradark-blue" htmlFor="radioMember">
                  <b>Miembro</b> - quiero unirme a grupos y acudir a eventos
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="userRole" id="radioOrganizer" value="false"
                  onClick={(e) => setNewUserRole(e.target.value)}
                />
                <label className="form-check-label extradark-blue" htmlFor="radioOrganizer">
                  <b>Organizador</b> - quiero crear grupos y organizar eventos, así como, unirme a grupos y acudir a eventos
                </label>
                {/* {console.log(newUserRole)} ✅ */}
              </div>
            </fieldset>

            {/* GENDER */}
            <div className="mb-3">
              <label className="form-label extradark-blue fw-bold">Género</label>
              <select className="form-select" name="gender" defaultValue={"Seleccionar tu género"}
                onChange={(e) => setNewUserGender(e.target.value)}
              >
                <option disabled>Seleccionar tu género</option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option value="other">Otro</option>
              </select>
              {/* {console.log(newUserGender)} ✅ */}
            </div>

            {/* LANGUAGES */}
            <div className="mb-3">
              <label className="form-label extradark-blue fw-bold">Idiomas</label>
              {allLanguages.map(language => (
                <div className="form-check" key={language}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={language}
                    id={language}
                    name="languages[]"
                    onChange={() => languagesArray(language)}
                  />
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
                // onChange={(e) => setNewUserPhoto(e.target.files[0])}
                onChange={(e) => handleFile(e)}
              />
              {/* {console.log(newUserPhoto)} ✅ */}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="mb-3 d-flex justify-content-center">
              <button type="submit" className="btn bg-dark-blue text-white mx-auto fw-bold rounded-3 px-3 py-1 mt-3 formProfileButton">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

