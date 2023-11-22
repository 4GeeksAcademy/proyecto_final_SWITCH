import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/createNewEvent.css";
import parejaSujetaBocadillo from "../../img/pareja-sujeta- bocadillo.png";



export const FormCreateNewEvent = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [newEventName, setNewEventName] = useState("");
    const [newEventDescription, setNewEventDescription] = useState("");
    const [newEventStartTime, setNewEventStartTime] = useState("");
    const [newEventEndTime, setNewEventEndTime] = useState(""); //MIRAR PORQUE CREO QUE NO ES NECESARIA UNA FECHA FIN
    const [newEventLocation, setNewEventLocation] = useState("");
    const [newEventCapacity, setNewEventCapacity] = useState("");
    const [newEventPhotoUrl, setNewEventPhotoUrl] = useState("");

    // FORM SUBMIT FUNCTION
    const handleSubmit = (e) => {
        e.preventDefault();
        actions.createNewEvent(
            newEventName,
            newEventDescription,
            newEventStartTime,
            newEventEndTime,
            newEventLocation,
            newEventCapacity,
            newEventPhotoUrl
        )
    }

    /***FUNCIONES***/

    // NEW EVENT SUCCESSFULLY CREATED
    useEffect(() => {
        if (store.newEventCreatedSuccess === true) {
            alert("El nuevo evento se ha creado con éxito");
            store.newEventCreatedSuccess = null;
            navigate("/")
            /*Llevar a pagina de eventos para que pueda visualizar 
            como los usuarios verán el evento que ha creadol? */
        }
    }, [store.newEventCreatedSuccess])

    // NEW EVENT NOT SUCCESSFULLY CREATED
    useEffect(() => {
        if (store.newEventCreatedFailure === true) {
            alert("Ha habido un error en crear el evento. Prueba otra vez.");
            store.newEventCreatedFailure = null;
        }
    }, [store.newEventCreatedFailure])

    return (
        <>
            {/*PAGE CONTAINER */}
            <div style={{ background: "#ffc100" }} className="py-3">
                <div className="container col-10 col-md-8 col-lg-6 col-xxl-4">
                    <div className="formImageFlexBox">
                        <img src={parejaSujetaBocadillo} className="formImage--event" />
                    </div>
                    <h1 className="formProfileHeader extradark-blue text-center my-3">Crea un nuevo evento</h1>
                    {/*FORM STARTS*/}
                    <form id="createNewEventForm" onSubmit={handleSubmit}>
                        {/*EVENT NAME */}
                        <div className="mb-3">
                            <label htmlFor="event_name" className="form-label extradark-blue fw-bold">
                                Nombre del evento
                                <span className="requiredAsterisk">
                                    *
                                </span>
                            </label>
                            <input type="text" className="form-control" id="event_name" name="event_name" required
                                onChange={(e) => setNewEventName(e.target.value)}
                            />

                        </div>
                        {/*EVENT DESCRIPTION */}
                        <div className="mb-3">
                            <label htmlFor="event_description" className="form-label extradark-blue fw-bold">
                                Describe tu evento
                                <span className="requiredAsterisk">
                                    *
                                </span>
                            </label>
                            <input type="text" className="form-control" id="event_descripton" name="event_description" required
                                onChange={(e) => setNewEventDescription(e.target.value)}
                            />

                        </div>
                        {/*EVENT START TIME */}
                        <div className="mb-3">
                            <label htmlFor="event_start_time" className="form-label extradark-blue fw-bold">
                                Indica el día y la hora de tu evento
                                <span className="requiredAsterisk">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="event_start_time"
                                name="event_start_time"
                                required
                                onChange={(e) => setNewEventStartTime(e.target.value)}
                            />
                        </div>
                        {/*EVENT END TIME */}
                        <div className="mb-3">
                            <label htmlFor="event_end_time" className="form-label extradark-blue fw-bold">
                                Indica el fin de tu evento
                                <span className="requiredAsterisk">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="event_end_time"
                                name="event_end_time"
                                required
                                onChange={(e) => setNewEventEndTime(e.target.value)}
                            />
                        </div>
                        {/* LOCATION */}
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label extradark-blue fw-bold">
                                Dirección del evento
                                <span className="requiredAsterisk">
                                    *
                                </span>
                            </label>
                            <input type="text" className="form-control" id="location" name="location" required
                                onChange={(e) => setNewEventLocation(e.target.value)}
                            />
                        </div>
                        {/* CAPACITY REVISARLO */}
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label extradark-blue fw-bold">
                                ¿Cuántas personas pueden participar?
                                <span className="requiredAsterisk">
                                    *
                                </span>
                            </label>
                            <input type="number" min="1" className="form-control" id="capacity" name="capacity" required
                                onChange={(e) => {
                                    const inputValue = parseInt(e.target.value, 10);

                                    if (!isNaN(inputValue) && inputValue > 0) {
                                        // Si el valor es un número válido y mayor que cero, actualizar el estado de la capacidad
                                        setNewEventCapacity(inputValue);
                                    } else {
                                        // Si no es un número válido o es menor o igual a cero, mostrar una alerta
                                        alert('Por favor, ingresa un número válido mayor que cero.');
                                        // Limpiar el campo
                                        setNewEventCapacity('');
                                    }
                                }}
                            />
                            {/* PHOTO FILE */}
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label extradark-blue fw-bold">
                                    Imagen de perfil
                                </label>
                                <input className="form-control" type="file" id="formFile" name="photo"
                                    onChange={(e) => setNewEventPhotoUrl(e.target.files[0])}
                                />
                            </div>
                            {/* SUBMIT BUTTON */}
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn bg-dark-blue text-white mx-auto fw-bold rounded-3 px-3 py-1 mt-3 formProfileButton">
                                    Crear Evento
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
