import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const AppointmentBooking = () => {
  const [weekDates, setWeekDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  const timeSlots = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);

  useEffect(() => {
    const today = new Date();
    const nextAvailableDay = calculateNextAvailableDay(today);
    setCurrentWeekStart(nextAvailableDay); // Establecer el inicio desde el próximo día hábil
    generateWeekDates(nextAvailableDay);
  }, []);

  const calculateNextAvailableDay = (date) => {
    const day = date.getDay();
    const nextAvailableDate = new Date(date);

    // Si es sábado (6) o domingo (0), mover al lunes siguiente
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
          availability[date] = timeSlots.filter((slot) => !bookedSlots.includes(slot));
        } else {
          availability[date] = timeSlots;
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

      const appointmentRef = doc(db, 'appointments', date);
      const appointmentDoc = await getDoc(appointmentRef);

      if (appointmentDoc.exists()) {
        await updateDoc(appointmentRef, {
          bookedSlots: [...(appointmentDoc.data().bookedSlots || []), time],
        });
      } else {
        await setDoc(appointmentRef, {
          bookedSlots: [time],
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
        });
      }

      setSuccess(`¡Turno reservado exitosamente para el ${date} a las ${time}!`);
      loadWeekAvailability(weekDates);
    } catch (err) {
      setError('Error al reservar el turno');
      console.error(err);
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
    //   year: 'numeric',
    }).format(date);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeek);
    generateWeekDates(nextWeek);
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);

    const today = new Date();
    const nextAvailableDay = calculateNextAvailableDay(today);

    if (prevWeek >= nextAvailableDay) {
      setCurrentWeekStart(prevWeek);
      generateWeekDates(prevWeek);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Calendario de Turnos Disponibles</h5>
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
              <div className="d-flex justify-content-between mb-3">
                <button
                  className="btn btn-secondary"
                  onClick={handlePrevWeek}
                  disabled={currentWeekStart <= calculateNextAvailableDay(new Date())}
                >
                  Semana Anterior
                </button>
                <button className="btn btn-secondary" onClick={handleNextWeek}>
                  Semana Siguiente
                </button>
              </div>
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
                      {weekDates.map((date) => (
                        <td key={`${date}-${time}`} className="text-center">
                          {availableSlots[date]?.includes(time) ? (
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => bookAppointment(date, time)}
                              disabled={loading}
                            >
                              Reservar
                            </button>
                          ) : (
                            <span className="badge bg-secondary">No disponible</span>
                          )}
                        </td>
                      ))}
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
