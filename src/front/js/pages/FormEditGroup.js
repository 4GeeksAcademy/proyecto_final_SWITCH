import React, { useState, useEffect } from "react";

function FormEditGroup({ match }) {
    const [groupData, setGroupData] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        organizer: "",
        description: "",
        // insertar mas campos si son necesarios para la edición del grupo
    });

    useEffect(() => {
        async function fetchGroupData(id) {
            // Lógica para obtener los datos actuales del grupo...
        }

        const groupId = match.params.groupId;
        fetchGroupData(groupId);
    }, [match.params.groupId]);

    useEffect(() => {
        // Actualizar el formulario con los datos del grupo
        if (groupData) {
            setFormData({
                name: groupData.name,
                organizer: groupData.organizer,
                description: groupData.description,
                // Actualiza otros campos del formulario según los datos del grupo
            });
        }
    }, [groupData]);

    const handleInputChange = (e) => {
        // Actualizar el estado del formulario cuando se cambian los campos
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar los datos editados al backend...
    };

    return (
        <div>
            <h1>Editando Grupo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Organizador:</label>
                    <input
                        type="text"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                {/* Otros campos del formulario */}
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
}

export default FormEditGroup;
