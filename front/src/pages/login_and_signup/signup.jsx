import React, { useState } from 'react';
import { registerUser } from './../../api/accounts.api';
import { useNavigate } from 'react-router-dom';

export function Signup() {
    const [registerData, setRegisterData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
    });


    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Limpiar los errores previos
        setUsernameError('');
        setEmailError('');

        // Muestra el JSON que se enviará en la solicitud POST
        console.log('Datos a enviar:', registerData);

        try {
            const response = await registerUser(registerData);
            navigate('/Iniciar-Sesion');
        } catch (error) {
            // Accede al mensaje de error en la respuesta
            if (error.response && error.response.data && error.response.data.error) {
                // Verifica el tipo de error y muestra el mensaje en el campo correspondiente
                if (error.response.data.error.includes('nombre de usuario')) {
                    setUsernameError('El nombre de usuario ya está en uso.');
                } else if (error.response.data.error.includes('correo electrónico')) {
                    setEmailError('El correo electrónico ya está registrado.');
                } else {
                    console.error('Error:', error.response.data.error);
                }
            } else {
                console.error('Error inesperado:', error);
            }
        }
    };



    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear Cuenta</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="container-accounts bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleRegister}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Dirección de correo
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    className="custom-input input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Ingrese su Correo Electrónico"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{emailError}</p>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nombre de Usuario
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={registerData.username}
                                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                    className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Ingrese su Nombre de Usuario"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{usernameError}</p>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Ingrese su Contraseña"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="Boton-InicioSesion Boton-Guardar w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Crear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}