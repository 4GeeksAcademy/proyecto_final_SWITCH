import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/createNewUserProfile.css";
import "../../styles/index.css";


export const CreateNewUserProfile = () => {
  const { store, actions } = useContext(Context);

  // Form Variables
  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewLastName] = useState("");
  const [newUserUserName, setNewUserUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserCity, setNewUserCity] = useState("");
  const [newUserType, setNewUserType] = useState("");
  const [newUserGender, setNewUserGender] = useState("");
  const [newUserLanguages, setNewUserLanguages] = useState([]);
  const [newUserPhoto, setNewUserPhoto] = useState(""); // Duda: ¿Cómo gestionar input de un archivo?

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   actions.createNewUser(newUserCity...)
  // }

  function change(e) {
    console.log(e.target.value)
  }

  return (
    <>
      {/* TODO: form submit + backend interaction 

        0. Comprobar inputs de los últimos campos -> cómo salen? Idiomas con muchos inputs ...
          - Tipo de usuario --> se puede seleccionar 2 opciones! MAL.

        1. onChange + onClick events para recoger datos entrados 
            --> const [variable, setVariable] = useState("") para meter datos
        
        2. función que mando los inputs al fetch in store (handleSubmit)

        2. función de fetch POST en store para enviar datos en un request al endpoint POST que creé
            --> contiene url así: "process.env.BACKEND_URL + '/api/...'""
            --> handling errors 
            --> feedback: exitoso o no? / retornar algo 

        3. <form onSubmit={handleSubmission} ...> 
    
    * Usa la consola para probar y ver lo que pasa

    */}

      {/* PAGE CONTAINER */}
      <div style={{ background: "#ffc100" }} className="py-3">
        <div className="container col-10 col-lg-8 col-xl-8 col-xxl-6 border border-2 border-dark rounded-2 bg-white">
          <h1 className="text-center mt-2">Crea tu Perfil</h1>
          {/* FORM */}
          <form id="createNewUserForm" /*onSubmit={handleSubmit}*/>
            {/* FIRST NAME */}
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">Nombre<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="first_name" name="first_name" required
                onChange={setNewUserFirstName}
              // PON CONSOLE.loG AQUI

              />
            </div>
            {/* LAST NAME */}
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">Apellido(s)<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="last_name" name="last_name" required
                onChange={change}
              />
            </div>
            {/* USER NAME */}
            <div className="mb-3">
              <label htmlFor="user_name" className="form-label">Nombre de Usuario<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="user_name" name="user_name" required
                onChange={change}
              />
            </div>
            {/* EMAIL */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico<span className="requiredAsterisk">*</span></label>
              <input type="email" className="form-control" id="email" name="email" required
                onChange={change}
              />
            </div>
            {/* PASSWORD */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña<span className="requiredAsterisk">*</span></label>
              <input type="password" className="form-control" id="password" name="password" required
                onChange={change}
              />
            </div>
            {/* CITY */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label">Ciudad<span className="requiredAsterisk">*</span></label>
              <input type="text" className="form-control" id="city" name="city" required
                onChange={change}
              />
            </div>
            {/* ROLE */}
            <fieldset className="mb-3">
              <legend className="col-form-label col-sm-2 pt-0">Tipo de Usuario<span className="requiredAsterisk">*</span></legend>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="radioMember" id="radioMember" value="true" checked />
                <label className="form-check-label" htmlFor="radioMember">
                  Miembro - quiero unirme a grupos y acudir a eventos
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="radioOrganizer" id="radioOrganizer" value="false" />
                <label className="form-check-label" htmlFor="radioOrganizer">
                  Organizador - quiero crear grupos y organizar eventos, así como, unirme a grupos y acudir a eventos
                </label>
              </div>
            </fieldset>
            {/* GENDER */}
            <div className="mb-3">
              <label className="form-label">Género</label>
              <select className="form-select" name="gender" defaultValue={"Seleccionar tu género"}>
                <option disabled>Seleccionar tu género</option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option value="other">Otro</option>
              </select>
            </div>
            {/* LANGUAGES */}
            <div className="mb-3">
              <label className="form-label">Idiomas</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="english" id="english" name="languages[]" />
                <label className="form-check-label" htmlFor="english">Inglés</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="spanish" id="spanish" name="languages[]" />
                <label className="form-check-label" htmlFor="spanish">Español</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="french" id="french" name="languages[]" />
                <label className="form-check-label" htmlFor="french">Francés</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="italian" id="italian" name="languages[]" />
                <label className="form-check-label" htmlFor="italian">Italiano</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="german" id="german" name="languages[]" />
                <label className="form-check-label" htmlFor="german">Alemán</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="portuguese" id="portuguese" name="languages[]" />
                <label className="form-check-label" htmlFor="portuguese">Portugués</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="russian" id="russian" name="languages[]" />
                <label className="form-check-label" htmlFor="russian">Ruso</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="arabic" id="arabic" name="languages[]" />
                <label className="form-check-label" htmlFor="arabic">Árabe</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="japanese" id="japanese" name="languages[]" />
                <label className="form-check-label" htmlFor="japanese">Japonés</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="chinese" id="chinese" name="languages[]" />
                <label className="form-check-label" htmlFor="chinese">Chino</label>
              </div>
            </div>
            {/* PHOTO FILE */}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Imagen de perfil</label>
              <input className="form-control" type="file" id="formFile" name="photo" />
            </div>
            {/* SUBMIT BUTTON */}
            <div className="mb-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-warning mx-auto fw-bold rounded-3">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

/* 


*/ 