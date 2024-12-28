import React, { useState } from 'react';
import { useAuth } from '../../Context/Context';
import "./Forgot.css"
import { Button } from 'react-bootstrap';


const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      setError('');
      setMessage('');
      await resetPassword(email);
      setMessage('Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.');
    } catch (error) {
      setError('Error al enviar el correo electrónico de restablecimiento de contraseña. Verifica la dirección de correo electrónico.');
    }
  };

  return (
    <div className='container'>
      <h2>¿Olvidaste tu contraseña?</h2>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
      <input
        className='inputRestablecimiento'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingrese su Correo electrónico aquí..."
      />
      <Button className="reestablecimiento" onClick={handleResetPassword}>Enviar correo de restablecimiento</Button>
    </div>
  );
};

export default ForgotPassword;
