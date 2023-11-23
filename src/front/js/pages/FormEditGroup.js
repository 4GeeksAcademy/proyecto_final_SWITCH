import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/createNewUserProfile.css";
import ventana2bocadillos from "../../img/ventana-2bocadillos.png";

export const FormEditGroup = () => {
    const { groupId } = useParams();

    const [groupData, setGroupData] = useState({
        name: "",
        description: "",
        organizer: {
            firstName: "",
            lastName: ""
        },
        photo: null // Para manejar la carga de archivos si es necesario
    });

    useEffect(() => {
        async function fetchGroupData(id) {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/searchGroup/${id}`);
                if (!response.ok) {
                    throw new Error('Error fetching group');
                }
                const data = await response.json();
                setGroupData({
                    name: data.name,
                    description: data.description,
                    organizer: {
                        firstName: data.organizer.firstName,
                        lastName: data.organizer.lastName
                    },
                    // Actualiza otros campos del formulario según los datos del grupo
                });
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        }
        fetchGroupData(groupId);
    }, [groupId]);

    const handleInputChange = (e) => {
        setGroupData({
            ...groupData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFile = (e) => {
        // Lógica para manejar la carga de archivos, actualiza groupData.photo si es necesario
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/groups/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupData),
            });

            if (!response.ok) {
                throw new Error('Error updating group');
            }
            // Lógica adicional después de la actualización exitosa
        } catch (error) {
            console.error('Error updating group:', error);
        }
    };


    return (
        <>
            {/* PAGE CONTAINER */}
            <div style={{ background: "#ffc100" }} className="py-3">
                <div className="container col-10 col-md-8 col-lg-6 col-xxl-4">
                    <div className="formImageFlexbox">
                        <img src={ventana2bocadillos} className="formImage" />
                    </div>
                    <h1 className="formProfileHeader extradark-blue text-center mt-2">Edita tu Grupo</h1>
                    {/* FORM */}
                    <form id="createNewUserForm" onSubmit={handleSubmit}>

                        {/* GROUP NAME */}
                        <div className="mb-3">
                            <label htmlFor="group_name" className="form-label extradark-blue fw-bold">Nombre del grupo:<span className="requiredAsterisk">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="id_group"
                                name="name"
                                required
                                value={groupData.name}
                                onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                            />
                        </div>

                        {/* DESCRIPCION */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label extradark-blue fw-bold">Descripción:<span className="requiredAsterisk">*</span></label>
                            <input type="email" className="form-control" id="email" name="description" required
                                value={groupData.description}
                                onChange={(e) => setGroupData({ ...groupData, "description": e.target.value })}
                            />
                            {/* {console.log(GroupData.description)} */}
                        </div>

                        {/* ORGANIZADOR FULL NAME*/}

                        <div className="mb-3">
                            <label htmlFor="organizer_name" className="form-label extradark-blue fw-bold">Nombre del Organizador<span className="requiredAsterisk">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="organizer_name"
                                name="organizer_name"
                                required
                                value={`${groupData.organizer.firstName} ${groupData.organizer.lastName}`}
                                onChange={(e) => {
                                    const [firstName, ...lastName] = e.target.value.split(' ');
                                    setGroupData({
                                        ...groupData,
                                        organizer: {
                                            firstName: firstName || '',
                                            lastName: lastName.join(' ') || ''
                                        }
                                    });
                                }}
                            />
                        </div>



                        {/* PHOTO FILE */}
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label extradark-blue fw-bold">Imagen del grupo</label>
                            <input className="form-control" type="file" id="formFile" name="photo"
                                onChange={(e) => handleFile(e)}
                            // onChange={(e) => setGroupData({ ...groupData, "photo": e.target.files[0] })}
                            />
                            {/* {console.log(groupData.photo)} */}
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


export default FormEditGroup;
