import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AppointmentBooking = () => {
  const [weekDates, setWeekDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [userRole, setUserRole] = useState('user'); // Por defecto, el rol es "user"
  const [userAppointments, setUserAppointments] = useState([]); // Turnos del usuario actual
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [firstAvailableDate, setFirstAvailableDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    const nextAvailableDay = calculateNextAvailableDay(today);
    setFirstAvailableDate(nextAvailableDay);
    setCurrentWeekStart(nextAvailableDay);
    generateWeekDates(nextAvailableDay);
    fetchUserDetails();
  }, []);

  const navigateWeek = (direction) => {
    if (!currentWeekStart) return;

    const newWeekStart = new Date(currentWeekStart);
    if (direction === 'next') {
      newWeekStart.setDate(newWeekStart.getDate() + 7);
      setCurrentWeekStart(newWeekStart);
      generateWeekDates(newWeekStart);
      
      // Actualizar el año si cambia
      setCurrentYear(newWeekStart.getFullYear());
    } else if (direction === 'prev') {
      newWeekStart.setDate(newWeekStart.getDate() - 7);
      
      // Verificar que no sea anterior a la primera fecha disponible
      if (newWeekStart >= firstAvailableDate) {
        setCurrentWeekStart(newWeekStart);
        generateWeekDates(newWeekStart);
        
        // Actualizar el año si cambia
        setCurrentYear(newWeekStart.getFullYear());
      }
    }
  };
  const auth = getAuth();
  const db = getFirestore();

  const timeSlots = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);

  useEffect(() => {
    const today = new Date();
    const nextAvailableDay = calculateNextAvailableDay(today);
    setCurrentWeekStart(nextAvailableDay);
    generateWeekDates(nextAvailableDay);
    fetchUserDetails(); // Obtener detalles del usuario al cargar el componente
  }, []);

  const fetchUserDetails = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, 'pacientes', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserRole(userData.role || 'user'); // Obtener el rol
        setUserAppointments(userData.appointments || []); // Obtener los turnos reservados por el usuario
      }
    } catch (err) {
      console.error('Error al obtener detalles del usuario:', err);
    }
  };

  const calculateNextAvailableDay = (date) => {
    const day = date.getDay();
    const nextAvailableDate = new Date(date);

    if (day === 6) {
      nextAvailableDate.setDate(date.getDate() + 2);
    } else if (day === 0) {
      nextAvailableDate.setDate(date.getDate() + 1);
    }
    return nextAvailableDate;
  };

  const generateWeekDates = (startDate) => {
    const dates = [];
    const monday = new Date(startDate);

    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }

    setWeekDates(dates);
    loadWeekAvailability(dates);
  };

  const loadWeekAvailability = async (dates) => {
    setLoading(true);
    const availability = {};

    try {
      for (const date of dates) {
        const appointmentsRef = doc(db, 'appointments', date);
        const appointmentsDoc = await getDoc(appointmentsRef);

        if (appointmentsDoc.exists()) {
          const bookedSlots = appointmentsDoc.data().bookedSlots || [];
          const details = appointmentsDoc.data().details || {};

          availability[date] = timeSlots.map((slot) => ({
            time: slot,
            booked: bookedSlots.includes(slot),
            bookedBy: details[slot] || null,
          }));
        } else {
          availability[date] = timeSlots.map((slot) => ({
            time: slot,
            booked: false,
            bookedBy: null,
          }));
        }
      }

      setAvailableSlots(availability);
    } catch (err) {
      setError('Error al cargar la disponibilidad');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (date, time) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Debes estar autenticado para reservar un turno');
        return;
      }

      setLoading(true);

      // Obtener nombre del usuario
      let userName = auth.currentUser.displayName;

      // Si no existe displayName, buscar en Firestore
      if (!userName) {
        const userRef = doc(db, 'pacientes', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          userName = userDoc.data().nombre;
        } else {
          userName = 'Usuario Anónimo'; // Fallback final
        }
      }

      const appointmentRef = doc(db, 'appointments', date);
      const appointmentDoc = await getDoc(appointmentRef);

      if (appointmentDoc.exists()) {
        await updateDoc(appointmentRef, {
          bookedSlots: [...(appointmentDoc.data().bookedSlots || []), time],
          details: {
            ...(appointmentDoc.data().details || {}),
            [time]: userName, // Guardar el nombre del usuario
          },
        });
      } else {
        await setDoc(appointmentRef, {
          bookedSlots: [time],
          details: { [time]: userName },
        });
      }

      const userRef = doc(db, 'pacientes', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userAppointments = userData.appointments || [];
        userAppointments.push({ date, time });
        await updateDoc(userRef, { appointments: userAppointments });
      } else {
        await setDoc(userRef, {
          appointments: [{ date, time }],
          name: userName, // Asegurar que se guarde el nombre en Firestore
        });
      }

      setSuccess(`¡Turno reservado exitosamente para el ${date} a las ${time}!`);
      fetchUserDetails();
      loadWeekAvailability(weekDates);
    } catch (err) {
      setError('Error al reservar el turno');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (date, time, bookedBy) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Debes estar autenticado para eliminar un turno');
        return;
      }
  
      setLoading(true);
  
      // Validar permisos
      if (userRole === 'admin' || bookedBy === user.displayName) {
        // 1. Primero encontrar el usuario que reservó el turno
        const pacientesRef = collection(db, 'pacientes');
        const q = query(
          pacientesRef, 
          where('appointments', 'array-contains', { date, time })
        );
        
        const querySnapshot = await getDocs(q);
        
        // 2. Actualizar el documento del paciente
        if (!querySnapshot.empty) {
          const patientDoc = querySnapshot.docs[0];
          const patientData = patientDoc.data();
          
          // Filtrar el turno específico
          const updatedAppointments = patientData.appointments.filter(
            app => !(app.date === date && app.time === time)
          );
          
          // Actualizar los turnos del paciente
          await updateDoc(doc(db, 'pacientes', patientDoc.id), {
            appointments: updatedAppointments
          });
        }
  
        // 3. Actualizar la colección de appointments
        const appointmentRef = doc(db, 'appointments', date);
        const appointmentDoc = await getDoc(appointmentRef);
  
        if (appointmentDoc.exists()) {
          const data = appointmentDoc.data();
          
          // Actualizar bookedSlots
          const updatedSlots = (data.bookedSlots || []).filter(slot => slot !== time);
          
          // Actualizar details
          const updatedDetails = { ...data.details };
          delete updatedDetails[time];
  
          // Si no quedan slots reservados, eliminar el documento
          if (updatedSlots.length === 0) {
            await deleteDoc(appointmentRef);
          } else {
            // Actualizar el documento con los nuevos datos
            await updateDoc(appointmentRef, {
              bookedSlots: updatedSlots,
              details: updatedDetails
            });
          }
  
          setSuccess(`¡Turno del ${date} a las ${time} eliminado exitosamente!`);
          fetchUserDetails();
          loadWeekAvailability(weekDates);
        }
      } else {
        setError('No tienes permiso para eliminar este turno');
      }
    } catch (err) {
      console.error('Error al eliminar el turno:', err);
      setError('Error al eliminar el turno');
    } finally {
      setLoading(false);
    }
  };
  
  

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Turnos Disponibles</h5>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigateWeek('prev')}
                disabled={!currentWeekStart || 
                  new Date(currentWeekStart) <= firstAvailableDate}
              >
                <i className="bi bi-chevron-left"></i> Anterior
              </button>
              
              <span className="fw-bold">{currentYear}</span>
              
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigateWeek('next')}
              >
                Siguiente <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: '100px' }}>Hora</th>
                    {weekDates.map((date) => (
                      <th key={date} className="text-center">
                        {formatDate(date)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="text-center fw-bold">{time}</td>
                      {weekDates.map((date) => {
                        const slot = availableSlots[date]?.find((s) => s.time === time);
                        const isUserBooking = userAppointments.some(
                          (app) => app.date === date && app.time === time
                        );

                        return (
                          <td key={`${date}-${time}`} className="text-center">
                            {slot?.booked ? (
                              isUserBooking ? (
                                <span className="badge bg-success">Reservado por ti</span>
                              ) : userRole === 'admin' ? (
                                <>
                                  <span className="badge bg-info">
                                    Reservado por {slot?.bookedBy}
                                  </span>
                                  <button
                                    className="btn btn-danger btn-sm mt-2"
                                    onClick={() => deleteAppointment(date, time, slot?.bookedBy)}
                                  >
                                    Eliminar
                                  </button>
                                </>
                              ) : (
                                <span className="badge bg-secondary">No disponible</span>
                              )
                            ) : (
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => bookAppointment(date, time)}
                                disabled={loading}
                              >
                                Reservar
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
