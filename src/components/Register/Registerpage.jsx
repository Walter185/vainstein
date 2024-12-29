import React, { useState, useRef } from 'react';
import validator from "validator";
import { useAuth } from '../../Context/Context';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Register.css";
import { Button } from 'react-bootstrap';

export default function Registerpage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const location = useLocation();
  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const domicilioRef = useRef(null);
  const telefonoRef = useRef(null);
  const dniRef = useRef(null);
  const fechaNacimientoRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error] = useState(false);
  const [errorMessage] = useState('');

  const handleRedirectToOrBack = () => {
    navigate(location.state?.from ?? '/show');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const {nombre,apellido,fechaNacimiento,domicilio,telefono,dni,email,password} = getInputs();
      if (isSignupValid({nombre,apellido,fechaNacimiento,domicilio,telefono,dni,email,password })) {
        await register(nombre,apellido,fechaNacimiento,domicilio,telefono,dni,email,password);
        handleRedirectToOrBack();
      } else {
        alert(`Cannot create your account, ${email} might be existed, please try again!`);
      }
    } catch (error) {
    }
  };

  const getInputs = () => {
    const nombre = nombreRef.current.value;
    const apellido = apellidoRef.current.value;
    const fechaNacimiento = fechaNacimientoRef.current.value; 
    const domicilio = domicilioRef.current.value;
    const telefono = telefonoRef.current.value;
    const dni = dniRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return {nombre,apellido,fechaNacimiento,domicilio,telefono,dni,email,password};
  };

  const isSignupValid = ({nombre,apellido,fechaNacimiento,domicilio,telefono,dni,email,password}) => {
    
    if (validator.isEmpty(nombre) || !validator.isLength(nombre, { min: 3 })) {
      alert("Por favor ingrese su nombre");
      return false;
    }
    if (validator.isEmpty(apellido) || !validator.isLength(apellido, { min: 2 })) {
      alert("Por favor ingrese su apellido");
      return false;
    }
    if (validator.isEmpty(domicilio) || !validator.isLength(domicilio, { min: 6 })) {
      alert("Por favor ingrese su domicilio");
      return false;
    }
    if (validator.isEmpty(telefono) || !validator.isLength(telefono, { min: 6 })) {
      alert("Por favor ingrese su telefono");
      return false;
    }
    if (validator.isEmpty(dni) || !validator.isLength(dni, { min: 6})) {
      alert("Por favor ingrese su DNI o CI");
      return false;
    }
    if (!validator.isEmail(email)) {
      alert("Por favro ingrese un email");
      return false;
    }
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 3 })) {
      alert("Por favro ingrese una contraseña. La contraseña debe contener al menos 3 caracteres.");
      return false;
    }

    // Validate age
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      alert("Debe ser mayor de edad para registrarse.");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="App2">
      <h1 className="text-center my-12">Registro</h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna izquierda */}
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="nombre" className="block mb-1 text-sm font-medium">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre..."
                    required
                    ref={nombreRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido" className="block mb-1 text-sm font-medium">
                    Apellido
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese apellido..."
                    required
                    ref={apellidoRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nacimiento" className="block mb-1 text-sm font-medium">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    required
                    ref={fechaNacimientoRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="domicilio" className="block mb-1 text-sm font-medium">
                    Domicilio
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese domicilio..."
                    required
                    ref={domicilioRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="telefono" className="block mb-1 text-sm font-medium">
                    Teléfono
                  </label>
                  <input
                    type="number"
                    placeholder="Ingrese teléfono..."
                    required
                    ref={telefonoRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dni" className="block mb-1 text-sm font-medium">
                    DNI o CI
                  </label>
                  <input
                    type="number"
                    placeholder="Ingrese DNI o CI..."
                    required
                    ref={dniRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="block mb-1 text-sm font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Ingrese email..."
                    required
                    ref={emailRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="block mb-1 text-sm font-medium">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Ingrese contraseña..."
                    required
                    ref={passwordRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Botón y mensajes centrados debajo de las columnas */}
            <div className="mt-6 flex flex-col items-center space-y-4">
              <Button type="submit" id="botonLogin" className="w-full md:w-auto">
                Registrarse
              </Button>

              {error && (
                <div className="text-red-500 text-center error-message">
                  {errorMessage}
                </div>
              )}

              <div className="flex flex-col items-center space-y-2">
                <Link to="/forgot" className="text-blue-500 hover:underline">
                  ¿Olvidó su contraseña?
                </Link>
                <Link to="/login" className="text-blue-500 hover:underline">
                  ¿Ya tiene usuario? Ingrese aquí
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    </>
  );
}
