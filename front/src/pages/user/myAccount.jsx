import React, { useState, useEffect } from 'react';
import { updateUser } from './../../api/accounts.api';
import ProfileLogo from './../../assets/icons/ProfileLogo.png';

    


export function MyAccount() {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Obtiene el nombre de usuario o correo electrónico del usuario desde localStorage
        const usernameOrEmail = localStorage.getItem('username_or_email');

        if (usernameOrEmail) {
            // Llama a la API para obtener la información del usuario
            fetchUserData(usernameOrEmail);
        }
    }, []);

    const fetchUserData = async (usernameOrEmail) => {
        try {
            const response = await updateUser(userData, usernameOrEmail);
            setUserData(response.data);
        } catch (error) {
            console.error('Error al obtener la información del usuario', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // Llama a la API para actualizar la información del usuario
            const usernameOrEmail = localStorage.getItem('username_or_email');
            await updateUser(userData, usernameOrEmail);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar la información del usuario', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className='container MyAccountContainer'>
            <div className="row separator ">
                <div className="col-md-5 text-left">
                    <div className="row">
                        {/* Left Column */}
                        <div className="col-sm-12" style={{ display: 'flex', alignItems: 'center' }}>
                            <img className="Profile-logo" src={ProfileLogo} alt="ProfileLogo" />
                            <div style={{ marginLeft: '10px' }}>
                                <h3 className="Title_MyAccount">Hola !</h3>
                                <h3 className="Subtitle_MyAccount">Bienvenido a tu cuenta</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5 information">
                    <div className="px-4 sm:px-0">
                        <h3 className="Title">Tu Cuenta</h3>
                    </div>

                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">

                            
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <label>Correo electrónico: </label>
                                {isEditing ? (
                                    <input
                                        className="borderInput"
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <span>{userData.email}</span>
                                )}
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <label>Nombre de usuario: </label>
                                {isEditing ? (
                                    <input
                                        className="borderInput"
                                        type="text"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <span>{userData.username}</span>
                                )}
                            </div>
                            

                            {isEditing ? (
                                <button className="Boton-Guardar mb-5" onClick={handleSave}>Guardar</button>
                            ) : (
                                <button className="Boton-Guardar mb-5" onClick={handleEdit}>Editar</button>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
